import mongoose from "mongoose";
import Chat from '../models/chatModel.js';
import Proposal from '../models/proposalModel.js';
import Notification from '../models/notificationModel.js';

export const initializeChat = async (proposalId) => {
  try {
    const proposal = await Proposal.findById(proposalId)
      .populate('developerId')
      .populate('jobId');

    if (!proposal || proposal.status !== 'accepted') {
      throw new Error('Proposal not accepted');
    }

    let chat = await Chat.findOne({ proposalId });

    if (!chat) {
      chat = new Chat({
        proposalId,
        participants: {
          client: proposal.jobId.clientId,
          developer: proposal.developerId._id
        },
        messages: []
      });
      await chat.save();

      await Promise.all([
        Notification.create({
          clientId: proposal.jobId.clientId,
          message: `Chat room created for project: ${proposal.jobId.title}`,
          type: 'chat',
          proposalId: proposal._id
        }),
        Notification.create({
          developerId: proposal.developerId._id,
          message: `Chat room created for project: ${proposal.jobId.title}`,
          type: 'chat',
          proposalId: proposal._id
        })
      ]);
    }

    return chat;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getChat = async (req, res) => {
  try {
    const chat = await initializeChat(req.params.proposalId);
    const populatedChat = await Chat.populate(chat, [
      { path: 'participants.client', select: 'name email profilePhoto' },
      { path: 'participants.developer', select: 'name email profilePhoto' },
      { path: 'messages.senderId', select: 'name profilePhoto' }
    ]);

    res.status(200).json(populatedChat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { proposalId } = req.params;
    const { id: senderId, role: senderRole } = req.user;

  
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      return res.status(400).json({ error: 'Invalid senderId' });
    }
    if (!['client', 'developer'].includes(senderRole.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid senderRole' });
    }
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({ error: 'Content is required' });
    }

    const chat = await Chat.findOne({ proposalId });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }


    const formattedRole = senderRole.charAt(0).toUpperCase() + senderRole.slice(1).toLowerCase();

   
    const newMessage = {
      senderId,
      senderRole: formattedRole, 
      content,
      timestamp: new Date(),
      read: false
    };

    chat.messages.push(newMessage);

    
    await chat.save();

   
    res.status(201).json(chat.messages[chat.messages.length - 1]);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};


export const markMessagesAsRead = async (req, res) => {
  try {
    const chat = await Chat.findOne({ proposalId: req.params.proposalId });
    const userId = req.user.id;

    const unreadMessages = chat.messages.filter(
      message => !message.read && message.senderId.toString() !== userId
    );

    if (unreadMessages.length > 0) {
      await Chat.updateOne(
        { proposalId: req.params.proposalId },
        { $set: { 'messages.$[elem].read': true } },
        { arrayFilters: [{ 'elem.read': false }] }
      );
    }

    res.status(200).json({ status: 'success', updatedCount: unreadMessages.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};