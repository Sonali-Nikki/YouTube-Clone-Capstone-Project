import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function UserMenu({ setSignedIn, setUsername, setAvatar, setUserMenu }) {
  const [channelForm, setChannelForm] = useState(false);
    const [formData, setFormData] = useState({
    channelName: '',
    description: '',
    channelBanner: '',
    channelLogo: '',
    subscribers: ''
  });
  const [error, setError] = useState('');


  const navigate = useNavigate();

  function signout() {
    localStorage.clear();
    setSignedIn(false);
    setUsername('');
    setAvatar('');
    setUserMenu(false);
    navigate('/');
  };


  function createChannel() {
    setChannelForm(true);
  }



  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `JWT ${token}` },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Channel creation failed');

      setChannelForm(false);
    } catch (err) {
      setError(err.message);
    }
  };


  function close() {
    setChannelForm(false);
  }

  function manageChannels() {
    navigate('/manageChannels');
    setUserMenu(false);
  }
  

  return (
    <div className="usermenu-content">
      <button className="usermenu-btn" onClick={signout}>Sign out</button>
      <button className="usermenu-btn" onClick={createChannel}>Create new channel</button>
      <button className="usermenu-btn" onClick={manageChannels}>Manage your channels</button>
      {channelForm && (
        <div className="create-channel-content">
          <IoMdClose size={20} onClick={close} className="cross" />
          <form onSubmit={handleSubmit}>
                <h2>Create Channel</h2>
                <input name="channelName" placeholder="Channel Name" onChange={handleChange} required />
                <input name="description" placeholder="Description" onChange={handleChange} />
                <input name="channelBanner" placeholder="Channel Banner URL" onChange={handleChange} />
                <input name="channelLogo" placeholder="Channel Logo URL" onChange={handleChange} />
                <input name="subscribers" placeholder="No of Subscribers" onChange={handleChange} />                
                <button type="submit">Create</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
      )}
    </div>
  )
}

export default UserMenu;