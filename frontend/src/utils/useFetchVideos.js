// importing necessary hooks
import { useEffect, useState } from 'react';

function useFetchVideos() {

// state variables to store videos, loading status and error
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
// fetching videos
  useEffect(() => {
    fetch('http://localhost:5000/api/video')
    .then((response) => response.json())
    .then((data) => setVideos(data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, []);

// returning the videos, loading status and error
  return { videos, loading, error };
};

export default useFetchVideos;
