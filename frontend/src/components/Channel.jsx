// importing necessary hooks and components
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";

function Channel() {

// retrieving channelId using useParams hook
  const { channelId } = useParams();

// state variables to store channel and error
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(null);

// fetching the channel
  useEffect(() => {
      fetch(`http://localhost:5000/api/channel/${channelId}`)
      .then((response) => response.json())
      .then((data) => setChannel(data))
      .catch((err) => setError(err.message));
    }, [channelId]);

// rendering approprate message
  if (error) return <p className="status-msg">Error: {error}</p>;
  if (!channel) return <p className="status-msg">Loading channel...</p>;

// rendering channel with channel data and channel videos
  return (
    <div className="channel-content">
    <img src={channel.channelBanner} alt="banner" className="channel-banner" />
    <div className="channel-detail">
      <img src={channel.channelLogo} alt="logo" className="channel-logo" />
      <div className="channel-details">
        <p className="channel-name">{channel.channelName}</p>
        <p className="channel-info">{channel.subscribers} subscribers {channel.videos.length} videos</p>
        <p className="channel-description">{channel.description}</p>
        <button className="channel-subscribe-btn">Subscribe</button>
      </div>
    </div>
    <p className="channel-bar">Videos</p>
    <hr />
    <div className="video-grid">
      {channel.videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
    </div>
  );
}

export default Channel;