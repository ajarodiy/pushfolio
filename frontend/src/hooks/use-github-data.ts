import { useState, useEffect } from 'react';
import { mockGitHubData } from '@/lib/mock-data';
import type { GitHubDataResponse } from '@/types/github';

export const useGitHubData = (username: string | null) => {
  const [data, setData] = useState<GitHubDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!username) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would make an API call to a backend service
        // For this demo, we'll use mock data and simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // Set mock data based on username
        setData(mockGitHubData(username));
      } catch (err) {
        setError('Failed to fetch GitHub data. Please try again.');
        console.error('Error fetching GitHub data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [username]);
  
  return { data, isLoading, error };
};