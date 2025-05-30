// importing necessary models
import Channel from "../models/channelModel.js";
import Video from "../models/videoModel.js";
import Comment from "../models/commentModel.js"

// controller to upload video to a channel if the user is signed in
export const uploadVideo = async (req, res) => {
  const { title, videoUrl, description, thumbnailUrl, category, views, likes, dislikes, channel } = req.body;
  try {
    const newVideo = new Video({
      title: title,
      videoUrl: videoUrl,
      description: description,
      thumbnailUrl: thumbnailUrl,
      category: category,
      views: views,
      likes: likes,
      dislikes: dislikes,
      channel: channel,
      uploader: req.user._id,
      comments: []
    });

    await newVideo.save();
    const channel_ = await Channel.findById(channel);
    channel_.videos.unshift(newVideo._id);
    await channel_.save();

    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload video', error: err.message });
  }
};

// controller to edit a video if the owner is signed in
export const editVideo = async (req, res) => {
  const { title, videoUrl, description, thumbnailUrl, category, views, likes, dislikes } = req.body;
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.videoId,
      {
        title: title,
        videoUrl: videoUrl,
        description: description,
        thumbnailUrl: thumbnailUrl,
        category: category,
        views: views,
        likes: likes,
        dislikes: dislikes
      },
      { new: true }
    );

    if (!video) return res.status(404).json({ message: 'Video does not exist' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update video', error: err.message });
  }
};

// controller to delete a video if the owner is signed in
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.videoId);
    
    if (!video) return res.status(404).json({ message: 'Video does not exist' });
    const channel = await Channel.findById(video.channel);
    const index = channel.videos.indexOf(video._id);
    channel.videos.splice(index, 1);
    await channel.save();
    const comment = await Comment.deleteMany({video: req.params.videoId});
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete video', error: err.message });
  }
};

// controller to get a video by id
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId).populate({ path: 'comments', populate: { path: 'user', select: 'username avatar' } }).populate({ path: 'channel', select: 'channelName channelLogo subscribers' });

    if (!video) return res.status(404).json({ message: 'Video does not exist' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get video', error: err.message });
  }
};

// controller to get all the videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).populate({ path: 'channel', select: 'channelName channelLogo' });
    
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get videos', error: err.message });
  }
};