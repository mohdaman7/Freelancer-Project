import Chat from '../models/chatModel.js';
import Proposal from '../models/proposalModel.js';

export const getChat = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.proposalId)
      .populate('developerId')
      .populate('jobId');

    if (!proposal || proposal.status !== 'accepted') {
      return res.status(400).json({ error: 'Proposal not accepted' });
    }

    let chat = await Chat.findOne({ proposalId: req.params.proposalId });

    if (!chat) {
      chat = new Chat({
        proposalId: req.params.proposalId,
        participants: {
          client: proposal.jobId.clientId,
          developer: proposal.developerId
        },
        messages: []
      });
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { proposalId: req.params.proposalId },
      {
        $push: {
          messages: {
            senderId: req.user.id,
            senderRole: req.user.role === 'client' ? 'Client' : 'Developer',
            content
          }
        }
      },
      { new: true }
    );

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ proposalId: req.params.proposalId })
      .populate('participants.client')
      .populate('participants.developer');

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markMessagesAsRead = async (req, res) => {
    try {
      const chat = await Chat.findOneAndUpdate(
        { 
          proposalId: req.params.proposalId,
          "messages.senderId": { $ne: req.user.id }
        },
        {
          $set: {
            "messages.$[elem].read": true
          }
        },
        {
          arrayFilters: [{ "elem.read": false }],
          new: true
        }
      );
  
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Messages marked as read',
        updatedCount: chat.messages.filter(m => m.read).length
      });
    } catch (error) {
      res.status(500).json({ 
        error: error.message || 'Failed to mark messages as read' 
      });
    }
  };