import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import VideoItem from "./VideoItem";

function ManageVideos() {
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [render, setRender] = useState(true);

  const { channelId } = useParams();


  const token = localStorage.getItem("token");


  useEffect(() => {
      fetch(`http://localhost:5000/api/channel/${channelId}`, {
        method: "GET",
        headers: { authorization: `JWT ${token}` },
      })
      .then((response) => response.json())
      .then((data) => setChannel(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    }, [render]);



    if (loading) return <p className="status-msg">Loading videos...</p>;
  if (error) return <p className="status-msg">Error: {error}</p>;
  if (channel.videos.length==0) return <p className="status-msg">No videos uploaded yet</p>;



  return (
    <div className="manage-videos-content">
      <img src={channel.channelBanner || 'fallback'} alt="banner" onError={(e) => e.target.src='https://dynamic.brandcrowd.com/template/preview/design/72a2045d-5feb-4f92-b1ec-70cef5ad56b0?v=4&designTemplateVersion=2&size=design-preview-wide-1x'} className="channel-item-banner" />
            <div className="channel-item-details">
                <Link to={`/channel/${channel._id}`}>
                <img src={channel.channelLogo || 'fallback'} alt="logo" onError={(e) => e.target.src='https://assets.zenn.com/strapi_assets/medium_youtube_channel_logo_39446f1338.png'} className="channel-item-logo" />
                </Link>
                <div className="channel-item-detail">
                  <p className="channel-item-name">{channel.channelName}</p>
                  <p className="channel-item-subscribers">{channel.subscribers || '0'} subscribers</p>
                  <p className="channel-item-videos">{channel.videos.length} videos</p>
                </div>
            </div>
            <p className="channel-item-description">{channel.description || 'A channel for educational/entertainment purpose'}</p>
            <br />
            <p className="channel-videos">Channel Videos</p>
            <hr />
      {channel.videos.map((video) => (
        <VideoItem key={video._id} video={video} render={render} setRender={setRender} />
      ))
      }
    </div>
  );
}

export default ManageVideos;