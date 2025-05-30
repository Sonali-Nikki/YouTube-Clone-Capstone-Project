import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

function VideoItem({ video, render, setRender }) {
    const [editForm, setEditForm] = useState(false);
    const [editData, setEditData] = useState({
    title: `${video.title}`,
    videoUrl: `${video.videoUrl}`,
    description: `${video.description}`,
    thumbnailUrl: `${video.thumbnailUrl}`,
    category: `${video.category}`,
    views: `${video.views}`,
    likes: `${video.likes}`,
    dislikes: `${video.dislikes}`,
    channel: `${video.channel._id}`
  });
  const [editError, setEditError] = useState('');


    const token = localStorage.getItem("token");

    async function deleteVideo() {
    await fetch(`http://localhost:5000/api/video/${video._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    setRender(!render);
    }


    function editVideo() {
        setEditForm(true);
    }



  function editChange(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  async function editSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/video/${video._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: `JWT ${token}` },
        body: JSON.stringify(editData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Video editing failed');

      setEditForm(false);
      setRender(!render);
    } catch (err) {
      setEditError(err.message);
    }
  };

    function close() {
        setEditForm(false);
     }

    return (
        <div className="video-item-content">
            <div className="video-item-details">
                <Link to={`/video/${video._id}`}>
                <img src={video.thumbnailUrl || 'fallback'} alt="thumbnail" onError={(e) => e.target.src='https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg'} className="video-item-thumbnail" />
                </Link>
                <div className="video-item-detail">
                    <p className="video-item-title">{video.title}</p>
                    <p className="video-item-category">Category: {video.category || 'edutainment'}</p>
                    <p className="video-item-views">Views: {video.views || '0'}</p>
                    <p className="video-item-likes">Likes: {video.likes || '0'}</p>
                    <p className="video-item-dislikes">Dislikes: {video.dislikes || '0'}</p>
                </div>
            </div>
            <p className="video-item-description">{video.description || 'A video for educational/entertainment purpose'}</p>
            <div className="video-item-options">
                <button className="video-item-option" onClick={deleteVideo}>Delete Video</button>
                <button className="video-item-option" onClick={editVideo}>Edit Video</button>
            </div>
            <hr />
            {editForm && (
                <div className="edit-video-content">
                    <IoMdClose size={20} onClick={close} className="cross" />
                    <form onSubmit={editSubmit}>
                        <h2>Edit Video</h2>
                        <input name="title" value={editData.title} placeholder="Title" onChange={editChange} required />
                        <input name="videoUrl" value={editData.videoUrl} placeholder="Video URL" onChange={editChange} required />
                        <input name="description" value={editData.description} placeholder="Description" onChange={editChange} />
                        <input name="thumbnailUrl" value={editData.thumbnailUrl} placeholder="Thumbnail URL" onChange={editChange} />
                        <input name="category" value={editData.category} placeholder="Category" onChange={editChange} />
                        <input name="views" value={editData.views} placeholder="Views" onChange={editChange} />
                        <input name="likes" value={editData.likes} placeholder="Likes" onChange={editChange} />
                        <input name="dislikes" value={editData.dislikes} placeholder="Dislikes" onChange={editChange} />
                        <button type="submit">Edit</button>
                        {editError && <p className="error">{editError}</p>}
                    </form>
                </div>
            )}
        </div>
    )
}

export default VideoItem;