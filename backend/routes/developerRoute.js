import express from 'express';
import { registerDeveloper, loginDeveloper, getDeveloperProfile, getDeveloperProfileById, addService } from '../controllers/developerController.js';
import validateDeveloper from '../validation/DeveloperValidation.js';

const router = express.Router();

router.post('/register', validateDeveloper, registerDeveloper);
router.post('/login', loginDeveloper);


router.get('/profile', getDeveloperProfile);
router.put('/profile/:id',getDeveloperProfileById);


router.post('/services/:id', addService);

export default router;
