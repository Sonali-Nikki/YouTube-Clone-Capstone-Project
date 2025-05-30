// importing necessary components
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

function VideoCard({ video }) {

// rendering video card with video thumbnail, video tite, channel log channel name, and views
  return(
    <div className="video-card">
      <Link to={`/video/${video._id}`}>
      <img src={video.thumbnailUrl} alt="video" className="video-card-thumbnail" />
      <div className="video-card-detail">
        <Link to={`/channel/${video.channel._id}`}>
        <img src={video.channel.channelLogo} alt="channel logo" className="video-card-logo" />
        </Link>
        <div className="video-card-details">
          <div className="video-card-text">
            <p className="video-card-title">{video.title}</p>
            <Link to={`/channel/${video.channel._id}`}>
            <p className="video-card-name">{video.channel.channelName}</p>
            </Link>
            <p className="video-card-views">{video.views} views</p>
          </div>
          <button className="video-card-dots"><BsThreeDotsVertical size={18} /></button>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default VideoCard;