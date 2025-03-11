import express from 'express'
import { 
  getNotifications,
  markNotificationAsRead,
  getUnreadCount,
  approveNotification,
  rejectNotification,
  getNotificationById
} from '../controllers/notificationController.js'
import { authenticateUser } from '../middlewares/userMiddleware.js'

const router = express.Router();

router.get('/', authenticateUser(['client', 'developer', 'admin']), getNotifications);
router.get('/unread-count', authenticateUser(['client', 'developer', 'admin']), getUnreadCount);
router.patch('/:id/read', authenticateUser(['client', 'developer', 'admin']), markNotificationAsRead);
router.patch('/:id/approve', authenticateUser(['client']), approveNotification);
router.patch('/:id/reject', authenticateUser(['client']), rejectNotification);
router.get('/:id', authenticateUser(['client', 'developer', 'admin']), getNotificationById);

export default router;