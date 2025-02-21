import express from 'express';
import { registerDeveloper, loginDeveloper, getDeveloperProfile, getDeveloperProfileById, addService,getDeveloperEarnings } from '../controllers/developerController.js';
import validateDeveloper from '../validation/DeveloperValidation.js';
import { authenticateUser } from '../middlewares/userMiddleware.js';

const router = express.Router();

router.post('/register', validateDeveloper, registerDeveloper);
router.post('/login', loginDeveloper);


router.get('/profile', authenticateUser(['client', 'developer']), getDeveloperProfile);
router.get('/profile/:id', authenticateUser(['client', 'developer']), getDeveloperProfileById);
router.post('/services/:id', authenticateUser(['developer']), addService);

router.get('/earnings', authenticateUser(['developer']),getDeveloperEarnings)

export default router;
