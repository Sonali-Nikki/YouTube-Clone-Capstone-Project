import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Youtube from "./components/Youtube";
import Home from "./components/Home";
import ManageChannels from "./components/ManageChannels";
import ManageVideos from "./components/ManageVideos";
import Video from "./components/Video";
import Channel from "./components/Channel";
import NotFound from "./components/NotFound"
import "./utils/style.css";



function App() {
  const [search, setSearch] = useState("");
  const [signedIn, setSignedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");



  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Youtube setSearch={setSearch} signedIn={signedIn} setSignedIn={setSignedIn} username={username} setUsername={setUsername} avatar={avatar} setAvatar={setAvatar} />}>
      <Route path="/" element={<Home search={search} />} />
      <Route path="/manageChannels" element={<ManageChannels />} />
      <Route path="/manageVideos/:channelId" element={<ManageVideos />} />
      <Route path="/video/:videoId" element={<Video avatar={avatar} />} />
      <Route path="/channel/:channelId" element={<Channel />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;