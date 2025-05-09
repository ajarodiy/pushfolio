import { useState } from 'react';
import { SearchInput } from '@/components/search-input';
import { UserProfile } from '@/components/user-profile';
import { TopRepositories } from '@/components/top-repositories';
import { GitHubStats } from '@/components/github-stats';
import { LoadingState } from '@/components/ui-elements/loading-state';
import { useGitHubData } from '@/hooks/use-github-data';

const GitHubProfiler = () => {
  const [username, setUsername] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const { data, isLoading, error } = useGitHubData(isSubmitted ? username : null);
  
  const handleSubmit = (inputUsername: string) => {
    setUsername(inputUsername);
    setIsSubmitted(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
        Pushfolio | AI-Powered GitHub Portfolio
      </h1>
      
      <SearchInput onSubmit={handleSubmit} />
      
      {isLoading && <LoadingState />}
      
      {error && (
        <div className="mt-8 text-center text-destructive">
          <p className="text-lg">{error}</p>
        </div>
      )}
      
      {data && !isLoading && (
        <div className="mt-8 space-y-12 animate-in fade-in-50 duration-500">
          <UserProfile user={data.user} />
          <TopRepositories repositories={data.topRepositories} />
          <GitHubStats stats={data.stats} />
        </div>
      )}
    </div>
  );
};

export default GitHubProfiler;