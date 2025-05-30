import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function ChannelItem({ channel, render, setRender }) {   
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({
    channelName: `${channel.channelName}`,
    description: `${channel.description}`,
    channelBanner: `${channel.channelBanner}`,
    channelLogo: `${channel.channelLogo}`,
    subscribers: `${channel.subscribers}`
  });
  const [editError, setEditError] = useState('');
  const [uploadForm, setUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    videoUrl: '',
    description: '',
    thumbnailUrl: '',
    category: '',
    views: '',
    likes: '',
    dislikes: '',
    channel: `${channel._id}`
  });
  const [uploadError, setUploadError] = useState('');

 

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
    

  async function deleteChannel() {
        await fetch(`http://localhost:5000/api/channel/${channel._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `JWT ${token}`,
      },
    });
    setRender(!render);
}


function editChannel() {
    setEditForm(true);
}

  function editChange(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  async function editSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/channel/${channel._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: `JWT ${token}` },
        body: JSON.stringify(editData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Channel editing failed');

      setEditForm(false);
      setRender(!render);
    } catch (err) {
      setEditError(err.message);
    }
  };


function uploadVideo() {
    setUploadForm(true);
}

  function uploadChange(e) {
    setUploadData({ ...uploadData, [e.target.name]: e.target.value });
  };



  async function uploadSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `JWT ${token}` },
        body: JSON.stringify(uploadData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Video uploading failed');
      setUploadForm(false);
      setRender(!render);
    } catch (err) {
      setUploadError(err.message);
    }
  };



  function close() {
    setEditForm(false);
    setUploadForm(false);
}


function manageVideos() {
    navigate(`/manageVideos/${channel._id}`);
}


return (
        <div className="channel-item-content">
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
            <div className="channel-item-options">
                <button className="channel-item-option" onClick={deleteChannel}>Delete Channel</button>
                <button className="channel-item-option" onClick={editChannel}>Edit Channel</button>
                <button className="channel-item-option" onClick={uploadVideo}>Upload Video</button>
                <button className="channel-item-option" onClick={manageVideos}>Manage Videos</button>
            </div>
            <hr />
            {editForm && (
                <div className="edit-channel-content">
                    <IoMdClose size={20} onClick={close} className="cross" />
                    <form onSubmit={editSubmit}>
                        <h2>Edit Channel</h2>
                        <input name="channelName" value={editData.channelName} placeholder="Channel Name" onChange={editChange} required />
                        <input name="description" value={editData.description} placeholder="Description" onChange={editChange} />
                        <input name="channelBanner" value={editData.channelBanner} placeholder="Channel Banner URL" onChange={editChange} />
                        <input name="channelLogo" value={editData.channelLogo} placeholder="Channel Logo URL" onChange={editChange} />
                        <input name="subscribers" value={editData.subscribers} placeholder="No of Subscribers" onChange={editChange} />                
                        <button type="submit">Edit</button>
                        {editError && <p className="error">{editError}</p>}
                    </form>
                </div>
            )}
            {uploadForm && (
                <div className="upload-video-content">
                    <IoMdClose size={20} onClick={close} className="cross" />
                    <form onSubmit={uploadSubmit}>
                        <h2>Upload Video</h2>
                        <input name="title" placeholder="Title" onChange={uploadChange} required />
                        <input name="videoUrl" placeholder="Video URL" onChange={uploadChange} required />
                        <input name="description" placeholder="Description" onChange={uploadChange} />
                        <input name="thumbnailUrl" placeholder="Thumbnail URL" onChange={uploadChange} />
                        <input name="category" placeholder="Category" onChange={uploadChange} />
                        <input name="views" placeholder="Views" onChange={uploadChange} />
                        <input name="likes" placeholder="Likes" onChange={uploadChange} />
                        <input name="dislikes" placeholder="Dislikes" onChange={uploadChange} />
                        <button type="submit">Upload</button>
                        {uploadError && <p className="error">{uploadError}</p>}
                    </form>
                </div>
            )}
        </div>
    )
}

export default ChannelItem;