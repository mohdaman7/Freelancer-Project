import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath} from 'url';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import adminRoute from './routes/adminRoute.js'
import clientRoute from './routes/clientRoute.js'
import developerRoute from './routes/developerRoute.js'

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // To parse JSON payload
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use(cors())
app.use(cookieParser())
app.use(express.json())



app.use(express.static(__dirname));

app.use("/api/admin",adminRoute)
app.use("/api/client",clientRoute)
app.use("/api/developer",developerRoute)


app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

mongoose.connect('mongodb://localhost:27017/FreelancerProject')
    .then(() => console.log('DB connected successfully'))
    .catch(error => console.log(error));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});