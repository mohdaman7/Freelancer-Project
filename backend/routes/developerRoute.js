import express from 'express';
import multer from 'multer';
import {
  registerDeveloper,
  loginDeveloper,
  getDeveloperProfile,
  getDeveloperProfileById,
  addService,
  getDeveloperEarnings,
  updateDeveloperProfile,
  updateDeveloperSkills,
  updateSocialLinks,
  updateResume
} from '../controllers/developerController.js';
import validateDeveloper from '../validation/DeveloperValidation.js';
import { authenticateUser } from '../middlewares/userMiddleware.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, DOC, and DOCX files are allowed!'));
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const router = express.Router();

// Authentication Routes
router.post('/register', validateDeveloper, registerDeveloper);
router.post('/login', loginDeveloper);

// Public Profile Routes
router.get('/profile', authenticateUser(['client', 'developer']), getDeveloperProfile);
router.get('/profile/:id', authenticateUser(['client', 'developer']), getDeveloperProfileById);

// Developer-Specific Routes
router.post('/services/:id', authenticateUser(['developer']), addService);
router.get('/earnings', authenticateUser(['developer']), getDeveloperEarnings);

// Profile Settings Routes
router.patch('/profile', authenticateUser(['developer']), updateDeveloperProfile);
router.patch('/skills', authenticateUser(['developer']), updateDeveloperSkills);
router.patch('/social', authenticateUser(['developer']), updateSocialLinks);
router.patch('/resume', 
  authenticateUser(['developer']), 
  upload.single('resume'),
  updateResume
);

// Error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: 'error',
      message: 'File upload error',
      error: err.message
    });
  } else if (err) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      error: err.message
    });
  }
  next();
});

export default router;