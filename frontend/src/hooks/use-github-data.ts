import { useEffect, useState } from 'react';
import axios from 'axios';

export const useGitHubData = (username: string | null) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:8000/api/profile/${username}`);
        setData(res.data.data); // backend returns { source, data }
      } catch (err: any) {
        setError('Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { data, isLoading, error };
};
