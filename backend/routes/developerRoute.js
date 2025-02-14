import express from 'express';
import { registerDeveloper, loginDeveloper, getDeveloperProfile, getDeveloperProfileById, addService } from '../controllers/developerController.js';
import validateDeveloper from '../validation/DeveloperValidation.js';
import { authenticateUser } from '../middlewares/userMiddleware.js';

const router = express.Router();

router.post('/register', validateDeveloper, registerDeveloper);
router.post('/login', loginDeveloper);


router.get('/profile', authenticateUser(['client', 'developer']), getDeveloperProfile);
router.put('/profile/:id', authenticateUser(['developer']), getDeveloperProfileById);
router.post('/services/:id', authenticateUser(['developer']), addService);

export default router;
