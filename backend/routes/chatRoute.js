import express from 'express';
import { authenticateUser } from '../middlewares/userMiddleware.js';
import {
  getChat,
  sendMessage,
  markMessagesAsRead
} from '../controllers/chatController.js';

const router = express.Router();


router.route('/:proposalId')
  .get(authenticateUser(['client', 'developer']), getChat)  
  .post(authenticateUser(['client', 'developer']), sendMessage); 


router.post('/:proposalId/mark-read', authenticateUser(['client', 'developer']), markMessagesAsRead);

export default router;