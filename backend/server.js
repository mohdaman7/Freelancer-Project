import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import adminRoute from './routes/adminRoute.js';
import clientRoute from './routes/clientRoute.js';
import developerRoute from './routes/developerRoute.js';
import jobRoute from './routes/JobRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/admin", adminRoute);
app.use("/api/client", clientRoute);
app.use("/api/developers", developerRoute); 
app.use("/api/jobs", jobRoute);



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {

  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Endpoint not found',
      requestedPath: req.path
    });
  });
}


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FreelancerProject')
  .then(() => console.log('DB connected successfully'))
  .catch(error => console.log(error));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});