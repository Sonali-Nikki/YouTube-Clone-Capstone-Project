import { useState } from "react";
import useFetchVideos from "../utils/useFetchVideos";
import VideoCard from "./VideoCard";

function Home({ search }) {
  const { videos, loading, error } = useFetchVideos();
  const [category, setCategory] = useState("All");


  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  const set = new Set(filteredVideos.map(video => video.category.toLowerCase()))
  const categories = ["All",...set];


  function selectCategory(category) {
    setCategory(category);
  }


  const categoryVideos = filteredVideos.filter(video => {
    if(category == "All")
      return true;
    return (video.category.toLowerCase() == category);
  });


  if (loading) return <p className="status-msg">Loading videos...</p>;
  if (error) return <p className="status-msg">Error: {error}</p>;
  if (filteredVideos.length==0) return <p className="status-msg">No videos match the search input</p>;


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