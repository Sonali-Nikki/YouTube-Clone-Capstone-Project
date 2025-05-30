// importing necessary models
import Video from "../models/videoModel.js";
import Comment from "../models/commentModel.js";

// controller to add a comment to a video by a signed in user
export const addComment = async (req, res) => {
  const { text, video } = req.body;
  try {
    const newComment = new Comment({
      text: text,
      video: video,
      user: req.user._id
    });

    await newComment.save();
    const video_ = await Video.findById(video);
    video_.comments.unshift(newComment._id);
    await video_.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};

// controller to edit the comment if the owner is signed in
export const editComment = async (req, res) => {
  const { text } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        text: text
      },
      { new: true }
    );

    if (!comment) return res.status(404).json({ message: 'Comment does not exist' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update comment', error: err.message });
  }
};

// controller to delete a comment if the owner is signed in
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    
    if (!comment) return res.status(404).json({ message: 'Comment does not exist' });
    const video = await Video.findById(comment.video);
    const index = video.comments.indexOf(comment._id);
    video.comments.splice(index, 1);
    await video.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
};