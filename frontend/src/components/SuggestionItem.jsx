import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

function SuggestionItem({ video }) {

  return (
    <div className="suggestion-item">
      <Link to={`/video/${video._id}`}>
      <img src={video.thumbnailUrl} alt="video" className="suggestion-item-thumbnail" />
      <div className="suggestion-item-text">
        <p className="suggestion-item-title">{video.title}</p>
        <Link to={`/channel/${video.channel._id}`}>
        <p className="suggestion-item-name">{video.channel.channelName}</p>
        </Link>
        <p className="suggestion-item-views">{video.views} views</p>
      </div>
      <button className="suggestion-item-dots"><BsThreeDotsVertical size={18} /></button>
      </Link>
    </div>
  )
}

export default SuggestionItem;