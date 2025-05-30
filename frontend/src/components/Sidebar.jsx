import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { BsCollectionPlayFill } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { MdHistory } from "react-icons/md";
import { HiOutlineFire } from "react-icons/hi2";
import { RiShoppingBag4Line } from "react-icons/ri";
import { PiMusicNotesLight } from "react-icons/pi";
import { PiFilmSlateLight } from "react-icons/pi";
import { BsBroadcast } from "react-icons/bs";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdOutlineNewspaper } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { RiGraduationCapLine } from "react-icons/ri";
import { GiHanger } from "react-icons/gi";
import { MdOutlinePodcasts } from "react-icons/md";
import youtube from "../utils/youtube.png";
import youtubeMusic from "../utils/youtube music.jpg";
import youtubeKids from "../utils/youtube kids.png";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineOutlinedFlag } from "react-icons/md";
import { MdOutlineHelpOutline } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";

function Sidebar({ sidebar }) {

  return(
    <>
    {sidebar?(
      <div className="sidebar-open">
        <NavLink to={'/'} className="nav-link">
        <div className="menu-open">
          <IoMdHome size={26} />
          <p className="menu-text-open">Home</p>
        </div>
        </NavLink>
        <div className="menu-open">
          <SiYoutubeshorts size={20} />
          <p className="menu-text-open">Shorts</p>
        </div>
        <div className="menu-open">
          <BsCollectionPlayFill size={20} />
          <p className="menu-text-open">Subscriptions</p>
        </div>
        <br />
        <hr />
        <br />
        <div className="menu-open">
          <RxAvatar size={23} />
          <p className="menu-text-open">You</p>
        </div>
        <div className="menu-open">
          <MdHistory size={25} />
          <p className="menu-text-open">History</p>
        </div>
        <br />
        <hr />
        <br />
        <p className="menu-heading-open">Explore</p>
        <div className="menu-open">
          <HiOutlineFire size={25} />
          <p className="menu-text-open">Trending</p>
        </div>
        <div className="menu-open">
          <RiShoppingBag4Line size={25} />
          <p className="menu-text-open">Shopping</p>
        </div>
        <div className="menu-open">
          <PiMusicNotesLight size={25} />
          <p className="menu-text-open">Music</p>
        </div>
        <div className="menu-open">
          <PiFilmSlateLight size={25} />
          <p className="menu-text-open">Movies</p>
        </div>
        <div className="menu-open">
          <BsBroadcast size={25} />
          <p className="menu-text-open">Live</p>
        </div>
        <div className="menu-open">
          <IoGameControllerOutline size={25} />
          <p className="menu-text-open">Gaming</p>
        </div>
        <div className="menu-open">
          <MdOutlineNewspaper size={25} />
          <p className="menu-text-open">News</p>
        </div>
        <div className="menu-open">
          <GoTrophy size={25} />
          <p className="menu-text-open">Sports</p>
        </div>
        <div className="menu-open">
          <RiGraduationCapLine size={25} />
          <p className="menu-text-open">Courses</p>
        </div>
        <div className="menu-open">
          <GiHanger size={25} />
          <p className="menu-text-open">Fashion and Beauty</p>
        </div>
        <div className="menu-open">
          <MdOutlinePodcasts size={25} />
          <p className="menu-text-open">Podcast</p>
        </div>
        <br />
        <hr />
        <br />
        <p className="menu-heading-open">More from YouTube</p>
        <div className="menu-open">
          <img src={youtube} alt="youtube logo" height={20} />
          <p className="menu-text-open">YouTube Premium</p>
        </div>
        <div className="menu-open">
          <img src={youtubeMusic} alt="youtubeMusic logo" height={22} />
          <p className="menu-text-open">YouTube Music</p>
        </div>
        <div className="menu-open">
          <img src={youtubeKids} alt="youtubeKids logo" height={27} />
          <p className="menu-text-open">YouTube Kids</p>
        </div>
        <br />
        <hr />
        <br />
        <div className="menu-open">
          <AiOutlineSetting size={25} />
          <p className="menu-text-open">Settings</p>
        </div>
        <div className="menu-open">
          <MdOutlineOutlinedFlag size={25} />
          <p className="menu-text-open">Report history</p>
        </div>
        <div className="menu-open">
          <MdOutlineHelpOutline size={25} />
          <p className="menu-text-open">Help</p>
        </div>
        <div className="menu-open">
          <RiFeedbackLine size={25} />
          <p className="menu-text-open">Send feedback</p>
        </div>
        <br />
        <hr />
        <br />
        <div className="menu-details-open">
        <p>About &nbsp;Press &nbsp;Copyright</p>
        <p>Contact us &nbsp;Creators &nbsp;Advertise</p>
        <p>Development</p>
        <br />
        <p>Terms Privacy Policy & Safety</p>
        <p>How Youtube works</p>
        <p>Test new features</p>
        </div>
      </div>
    ):(
      <div className="sidebar-closed">
        <NavLink to={'/'} className="nav-link">
        <div className="menu-closed">
          <IoMdHome size={26} />
          <p className="menu-text-closed">Home</p>
        </div>
        </NavLink>
        <div className="menu-closed">
          <SiYoutubeshorts size={20} />
          <p className="menu-text-closed">Shorts</p>
        </div>
        <div className="menu-closed">
          <BsCollectionPlayFill size={20} />
          <p className="menu-text-closed">Subscriptions</p>
        </div>
        <div className="menu-closed">
          <RxAvatar size={23} />
          <p className="menu-text-closed">You</p>
        </div>
        <div className="menu-closed">
          <MdHistory size={25} />
          <p className="menu-text-closed">History</p>
        </div>
      </div>
    )
    }
    </>
  )
}

export default Sidebar;