import { useState, useEffect } from "react";
import ChannelItem from "./ChannelItem";

function ManageChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [render, setRender] = useState(true);



  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "";
  const avatar = localStorage.getItem("avatar") || "";


  useEffect(() => {
      fetch('http://localhost:5000/api/channel', {
        method: "GET",
        headers: { authorization: `JWT ${token}` },
      })
      .then((response) => response.json())
      .then((data) => setChannels(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    }, [render]);


    if (loading) return <p className="status-msg">Loading channels...</p>;
  if (error) return <p className="status-msg">Error: {error}</p>;
  if (channels.length==0) return <p className="status-msg">No channels created yet</p>;


  return (
    <div className="manage-channels-content">
      <div className="user-info">
        <img className="user-avatar" src={avatar || 'fallback'} alt="avatar" onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/user-account-icon-default-avatar-profile-vector-illustration-306029332.jpg'} />
        <p className="user-name">{username}</p>
      </div>
      <br />
      <p className="my-channels">My Channels</p>
      <hr />
      {channels.map((channel) => (
        <ChannelItem key={channel._id} channel={channel} render={render} setRender={setRender} />
      ))
      }
    </div>
  );
}

export default ManageChannels;