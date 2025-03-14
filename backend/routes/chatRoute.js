import express from 'express';
import { authenticateUser } from '../middlewares/userMiddleware.js';
import {
  getChat,
  sendMessage,
  getChatHistory,
  markMessagesAsRead
} from '../controllers/chatController.js';

const router = express.Router();


router.route('/:proposalId')
  .get(authenticateUser(['client', 'developer', 'admin']), getChat)
  .post(authenticateUser(['client', 'developer', 'admin']), sendMessage);


router.route('/history/:proposalId')
  .get(authenticateUser(['client', 'developer', 'admin']), getChatHistory);


router.route('/mark-read/:proposalId')
  .post(authenticateUser(['client', 'developer', 'admin']), markMessagesAsRead);

export default router;