import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import SignIn from "./SignIn";
import Register from "./Register";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { GoBell } from "react-icons/go";

function Header({ sidebar, setSidebar, setSearch, signedIn, setSignedIn, username, setUsername, avatar, setAvatar }) {
  const [searchText, setSearchText] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [signin, setSignin] = useState(false);
  const [register, setRegister] = useState(false);


  const navigate = useNavigate();

  function toggleSidebar() {
    setSidebar(!sidebar);
  }

  function searchVideo() {
    setSearch(searchText);
    navigate('/');
  }

  function toggleUserMenu() {
    setUserMenu(!userMenu);
  }

  function openSignIn() {
    setSignin(true);
    setRegister(false);
  }

  return (
    <header className="header-content">
      <div className="left-header">
        <button className="menu" onClick={toggleSidebar}><RxHamburgerMenu size={22} /></button>
        <Link to={'/'} >
        <img className="youtube-logo" src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg" alt="youtube logo" />
        </Link>
      </div>
      <div className="searchbar">
        <input type="text" className="search-box" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        <button className="search-btn" onClick={searchVideo}><CiSearch size={24} /></button>
        <button className="mic"><IoMdMic size={21} /></button>
      </div>
      <div className="right-header">
        {signedIn?(
        <>
        <button className="bell"><GoBell size={20} /></button>
        <button className="username-btn" onClick={toggleUserMenu}>
          <img src={avatar || 'fallback'} alt="avatar" height={35} style={{borderRadius: '50%'}} onError={(e) => e.target.src='https://thumbs.dreamstime.com/b/user-account-icon-default-avatar-profile-vector-illustration-306029332.jpg'} />
          <p className="username">{username}</p>
        </button>
        {userMenu && (
          <>
          <UserMenu setSignedIn={setSignedIn} setUsername={setUsername} setAvatar={setAvatar} setUserMenu={setUserMenu} />
          </>
        )}
        </>
        ):(
        <>
        <button className="dots"><BsThreeDotsVertical size={18} /></button>
        <button className="signin-btn" onClick={openSignIn}>
        <RxAvatar size={23} />
        <p className="signin">Sign in</p>
        </button>
        {signin && (
          <SignIn setSignin={setSignin} setRegister={setRegister} setSignedIn={setSignedIn} setUsername={setUsername}  setAvatar={setAvatar} />
        )}
        {register && (
          <Register setSignin={setSignin} setRegister={setRegister} />
        )}
        </>
        )}
      </div>
    </header>
  )
}

export default Header;