// importing necessary library
import mongoose from "mongoose";

// creating schema for video
const videoSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  videoUrl: { type: String, trim: true, required: true },
  description: { type: String, trim: true, default: 'A video for educational/entertainment purpose' },
  thumbnailUrl: { type: String, trim: true, default: 'https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg' },
  category: { type: String, trim: true, default: 'edutainment' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

// creating model for video schema
const Video = mongoose.model('Video', videoSchema);
export default Video;