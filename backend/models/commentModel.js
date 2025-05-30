// importing necessary library
import mongoose from 'mongoose';

// cteating schema for comment
const commentSchema = new mongoose.Schema(
  {
    text: { type: String, trim: true, required: true },
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true });

  // creating model for comment schema
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;