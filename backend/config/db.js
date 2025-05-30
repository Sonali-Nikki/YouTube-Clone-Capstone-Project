// importing necessary library
import mongoose from 'mongoose';

// function to connect to MongoDB
async function connectDB() {
  try {

// connecting to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
