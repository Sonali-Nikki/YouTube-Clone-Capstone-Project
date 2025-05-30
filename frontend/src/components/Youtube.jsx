import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";


function Youtube({ setSearch, signedIn, setSignedIn, username, setUsername, avatar, setAvatar }) {
  const [sidebar, setSidebar] = useState(false);


  return (
    <>
    <div className="youtube-content">
      <Header sidebar={sidebar} setSidebar={setSidebar} setSearch={setSearch} signedIn={signedIn} setSignedIn={setSignedIn} username={username} setUsername={setUsername} avatar={avatar} setAvatar={setAvatar} />
      <div className="main-content">
        <Sidebar sidebar={sidebar} />
          <div className="outlet">
            <Outlet />
          </div>
      </div>
    </div>
    </>
  );
}

export default Youtube;