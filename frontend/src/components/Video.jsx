// importing necessary hooks and components
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import CommentItem from "./CommentItem";
import SuggestionItem from "./SuggestionItem";
import useFetchVideos from "../utils/useFetchVideos";

function Video({ avatar }) {

// getting token from localStorage
  const token = localStorage.getItem("token");

// reference variable store the reference of add comment input
    const textAreaRef = useRef(null);

// function to resize the add comment input as per the number of lines
    const autoResize = () => {
      const el = textAreaRef.current;
      if (el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }
    };

// state variables to store the notification status and clicked comment
    const [notification, setNotification] = useState(false);
    const [thisComment, setThisComment] = useState("");
  
// retriving video id using useParams hook
  const { videoId } = useParams();
  
// scroll to the top of the window when the video is changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

// state variables to store the video and error
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  
// state variable to trigger re-rendering
  const [render, setRender] = useState(true);
  
// fetching the video
  useEffect(() => {
    fetch(`http://localhost:5000/api/video/${videoId}`)
    .then((response) => response.json())
    .then((data) => setVideo(data))
    .catch((err) => setError(err.message));
  }, [videoId, render]);

// fetching the videos for suggestions
  const { videos } = useFetchVideos();

// filtering the videos for suggestion having channel or category same as video
  let filteredVideos;
  if(video){
    filteredVideos = videos.filter(video_ => (video_.channel._id==video.channel._id || video_.category==video.category) && video_._id!=video._id);
  }

// function to submit the add comment if the user is signed in and render the first sign in notification otherwise
  async function handleSubmit(e) {
    e.preventDefault();
    const text = e.target[0].value;
    if(avatar) {
      try {
        const res = await fetch('http://localhost:5000/api/comment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', authorization: `JWT ${token}` },
          body: JSON.stringify({ text: `${text}`, video: `${video._id}` })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Comment addition failed');
        e.target[0].value="";
        setRender(!render);
      } catch (err) {
        console.log(err.message);
      }
    }
    else {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  }

// rendering appropriate message
  if (error) return <p className="status-msg">Error: {error}</p>;
  if (!video) return <p className="status-msg">Loading video...</p>;

// rendering video with video details, channel logo, channel name, add comment box, comments and suggestion videos
  return (
    <div className="video-content">
    <div className="video">
      <iframe className="video-player" src={video.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <p className="video-title">{video.title}</p>
      <div className="video-details">
        <div className="video-details-left">
          <Link to={`/channel/${video.channel._id}`}>
          <img className="video-channel-logo" src={video.channel.channelLogo} alt="channel logo" />
          </Link>
          <div className="video-channel-details">
            <Link to={`/channel/${video.channel._id}`}>
            <p className="video-channel-name">{video.channel.channelName}</p>
            </Link>
            <p className="video-channel-subscribers">{video.channel.subscribers} subscribers</p>
          </div>
          <button className="video-subscribe-btn">Subscribe</button>
        </div>
        <div className="video-details-right">
          <div className="video-feedback">
            <button className="video-like-btn">
              <BiLike size={23} className="video-like" />
              <p className="video-likes">{video.likes}</p>
            </button>
            <button className="video-dislike-btn">
              <BiDislike size={23} className="video-dislike" />
              <p className="video-likes">{video.dislikes}</p>
            </button>
          </div>
          <div className="video-share-btn">
            <PiShareFatLight size={24} className="video-share-arrow" />
            <p className="video-share">Share</p>
          </div>
          <BsThreeDots size={20} className="video-dots" />
        </div>
      </div>
      <div className="video-description-box">
        <p className="video-views">{video.views} views</p>
        <p className="video-description">{video.description}</p>
      </div>
      <div className="video-comment">
        <p className="comment-count">{video.comments.length} Comments</p>
        <div className="your-comment">
          <img src={avatar || 'fallback'} alt="avatar" height={45} style={{borderRadius: '50%'}} onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/user-account-icon-default-avatar-profile-vector-illustration-306029332.jpg'} />
          <form onSubmit={handleSubmit} className="add-comment">
            <textarea ref={textAreaRef} onChange={autoResize} placeholder="Add a comment..." className="comment-text" />
            <button className="comment-btn" type="submit">Comment</button>
          </form>
          {notification && (
            <p className="notification">Sign in first</p>
          )}
        </div>
        <div className="comment-box">
          {video.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} thisComment={thisComment} setThisComment={setThisComment} render={render} setRender={setRender} />
          ))}
        </div>
      </div>
    </div>
    <div className="suggestions">
      {filteredVideos.map(video_ => (
        <SuggestionItem key={video_._id} video={video_} />
      ))
      }
    </div>
    </div>
  );
}

export default Video;