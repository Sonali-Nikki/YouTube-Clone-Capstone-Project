import { useEffect, useState } from 'react';

function useFetchVideos() {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/video')
    .then((response) => response.json())
    .then((data) => setVideos(data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, []);

  return { videos, loading, error };
};

export default useFetchVideos;
