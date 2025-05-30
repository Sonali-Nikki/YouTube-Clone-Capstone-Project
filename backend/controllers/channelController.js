import Channel from "../models/channelModel.js";
import Video from "../models/videoModel.js";




export const createChannel = async (req, res) => {
  const { channelName, description, channelBanner, channelLogo, subscribers } = req.body;
  try {
    const newChannel = new Channel({
      channelName: channelName,
      description: description,
      channelBanner: channelBanner,
      channelLogo: channelLogo,
      subscribers: subscribers,
      owner: req.user._id,
      videos: []
    });
    await newChannel.save();
    req.user.channels.unshift(newChannel._id);
    await req.user.save();
    res.status(201).json(newChannel);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create channel', error: err.message });
  }
};



export const editChannel = async (req, res) => {
  const { channelName, description, channelBanner, channelLogo, subscribers } = req.body;
  try {
    const channel = await Channel.findByIdAndUpdate(
      req.params.channelId,
      {
        channelName: channelName,
        description: description,
        channelBanner: channelBanner,
        channelLogo: channelLogo,
        subscribers: subscribers
      },
      { new: true }
    );
    if (!channel) return res.status(404).json({ message: 'Channel does not exist' });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update channel', error: err.message });
  }
};



export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.channelId);
  
    if (!channel) return res.status(404).json({ message: 'Channel does not exist' });
        const index = req.user.channels.indexOf(channel._id);
        req.user.channels.splice(index, 1);
        await req.user.save();
    const videos = await Video.deleteMany({channel: req.params.channelId});
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete channel', error: err.message });
  }
};



export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId).populate({ path: 'videos', populate: { path: 'channel', select: 'channelName channelLogo' } });

    if (!channel) return res.status(404).json({ message: 'Channel does not exist' });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get channel', error: err.message });
  }
};



export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find({owner: req.user._id});
    
    res.json(channels);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get channels', error: err.message });
  }
};