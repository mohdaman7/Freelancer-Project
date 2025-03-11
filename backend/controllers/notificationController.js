import Notification from '../models/notificationModel.js';

export const getNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({ userId: req.user.id })
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
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).lean();

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
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, 
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
    const count = await Notification.countDocuments({
      userId: req.user.id,
      status: { $ne: 'read' }
    });

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
    const notification = await Notification.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: req.user.id 
      },
      { status: 'approved' },
      { new: true }
    );

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

export const rejectNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: req.user.id 
      },
      { status: 'rejected' },
      { new: true }
    );

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