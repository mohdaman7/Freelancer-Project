import Notification from '../models/notificationModel.js';
import Proposal from '../models/proposalModel.js';
import Job from '../models/jobModel.js';
import { createRazorpayOrder, verifyPaymentSignature } from '../services/razorpayService.js';

export const getNotifications = async (req, res) => {
  try {
    const role = req.headers['x-user-role'];
    const query = role === 'client' 
      ? { clientId: req.user.id }
      : { developerId: req.user.id };

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      status: 'success',
      data: notifications || []
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message
    });
  }
};

export const getNotificationById = async (req, res) => {
  try {
    const query = req.user.role === 'client'
      ? { _id: req.params.id, clientId: req.user.id }
      : { _id: req.params.id, developerId: req.user.id };

    const notification = await Notification.findOne(query).lean();

    if (!notification) {
      return res.status(404).json({
        status: "error",
        message: "Notification not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message
    });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const query = req.user.role === 'client'
      ? { _id: req.params.id, clientId: req.user.id }
      : { _id: req.params.id, developerId: req.user.id };

    const notification = await Notification.findOneAndUpdate(
      query,
      { status: 'read' },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message
    });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const query = req.user.role === 'client'
      ? { clientId: req.user.id, status: { $ne: 'read' } }
      : { developerId: req.user.id, status: { $ne: 'read' } };

    const count = await Notification.countDocuments(query);

    res.status(200).json({
      status: 'success',
      count
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message
    });
  }
};

export const approveNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status: "approved" }, 
      { new: true }
    )
      .populate("proposalId")
      .populate("jobId");

    // Validate client ownership
    if (!notification || notification.clientId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    const proposal = notification.proposalId;
    if (!proposal || proposal.status !== 'pending') {
      return res.status(400).json({ error: 'Invalid proposal status' });
    }

    // Create Razorpay order
    const order = await createRazorpayOrder(
      proposal.proposedBudget,
      "INR",
      {
        proposalId: proposal._id.toString(),
        jobId: notification.jobId._id.toString()
      }
    );

    // Update proposal
    proposal.paymentOrderId = order.id;
    proposal.status = "approved";
    await proposal.save();

    res.status(200).json({
      status: "success",
      orderId: order.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      amount: proposal.proposedBudget,
      currency: "INR"
    });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Verify signature
    const isValidSignature = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Find proposal
    const proposal = await Proposal.findOne({ paymentOrderId: razorpay_order_id })
      .populate('jobId')
      .populate('developerId');

    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    // Update proposal
    proposal.status = 'accepted';
    proposal.paymentId = razorpay_payment_id;
    await proposal.save();

    // Update job
    const job = await Job.findById(proposal.jobId);
    job.status = 'In Progress';
    job.earnings.total += proposal.proposedBudget;
    job.earnings.pending += proposal.proposedBudget;
    
    job.transactions.push({
      description: `Payment for proposal ${proposal._id}`,
      amount: proposal.proposedBudget,
      status: 'Completed',
      paymentId: razorpay_payment_id
    });
    await job.save();

    // Notify developer
    await Notification.create({
      developerId: proposal.developerId._id,
      message: `Your proposal for "${job.title}" has been accepted! Payment received: ₹${proposal.proposedBudget}`,
      type: 'payment',
      jobId: job._id,
      proposalId: proposal._id
    });

    res.status(200).json({
      status: 'success',
      message: 'Payment processed successfully'
    });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const rejectNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" }, 
      { new: true }
    )
      .populate("proposalId")
      .populate("jobId");

    // Validate client ownership
    if (!notification || notification.clientId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    const proposal = notification.proposalId;
    proposal.status = 'rejected';
    await proposal.save();

    // Notify developer
    await Notification.create({
      developerId: proposal.developerId,
      message: `Your proposal for "${notification.jobId.title}" has been rejected.`,
      type: 'rejection',
      jobId: notification.jobId._id,
      proposalId: proposal._id
    });

    res.status(200).json({
      status: 'success',
      message: 'Proposal rejected successfully'
    });
  } catch (error) {
    console.error("Rejection error:", error);
    res.status(500).json({ error: error.message });
  }
};