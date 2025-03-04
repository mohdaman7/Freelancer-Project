import express from 'express'
import { getNotifications, markNotificationAsRead } from '../controllers/notificationController.js'
import { authenticateUser } from '../middlewares/userMiddleware.js'

const router = express.Router();

router.get('/', authenticateUser(['client', 'developer', 'admin']), getNotifications);
router.patch('/:id/read', authenticateUser(['client', 'developer', 'admin']), markNotificationAsRead);


export default router;