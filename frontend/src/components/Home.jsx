// importing necessary hooks and components
import { useState } from "react";
import useFetchVideos from "../utils/useFetchVideos";
import VideoCard from "./VideoCard";

function Home({ search }) {

// usign the custom hook to get the videos, loading status and error
  const { videos, loading, error } = useFetchVideos();

// filtering the videos according to the searched text
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(search.toLowerCase().trim())
  );

// retrieving the categories from the filterd videos and storing it
  const set = new Set(filteredVideos.map(video => video.category.toLowerCase()))
  const categories = ["All",...set];

// state variable to store current category
  const [category, setCategory] = useState("All");

// function to select a category
  function selectCategory(category) {
    setCategory(category);
  }

// filtering filtered videos for the selected category
  const categoryVideos = filteredVideos.filter(video => {
    if(category == "All")
      return true;
    return (video.category.toLowerCase() == category);
  });

// giving appropriate message
  if (loading) return <p className="status-msg">Loading videos...</p>;
  if (error) return <p className="status-msg">Error: {error}</p>;
  if (filteredVideos.length==0) return <p className="status-msg">No videos match the search input</p>;

// rendering home page with a category bar and video grid displaying videoCards
  return (
    <>
    <div className="categories">
      {categories.map(categoryName => (
        <button key={categoryName} className={category==categoryName?"category-btn category-btn-active":"category-btn"} onClick={(e) => selectCategory(categoryName)}>{categoryName}</button>
      ))}
    </div>
    <div className="video-grid">
      {categoryVideos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
    </>
  );
}

export default Home;