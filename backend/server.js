import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import seedData from './config/seedData.js';
import authRoutes from './routes/authRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

// loading env vars
dotenv.config();

// creating a new express application
const app = express();

// using cors and express.json middleware
app.use(cors());
app.use(express.json());

// using the routes
app.use('/api', authRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/comment', commentRoutes);


// connecting to DB and start server
connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
seedData();

