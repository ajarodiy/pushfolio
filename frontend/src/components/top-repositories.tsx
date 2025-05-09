import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Code } from 'lucide-react';
import type { Repository } from '@/types/github';
import { RepositoryCard } from '@/components/repository-card';

interface TopRepositoriesProps {
  repositories: Repository[];
}

export const TopRepositories = ({ repositories }: TopRepositoriesProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedRepos = showAll ? repositories : repositories.slice(0, 4);

  return (
    <section className="scroll-m-20">
      <Card className="border-yellow-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-yellow-400" />
            <span>Top Repositories</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {displayedRepos.map((repo) => (
              <RepositoryCard key={repo.name} repository={repo} />
            ))}
          </div>

          {repositories.length > 4 && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <span className="flex items-center gap-1">Show Less</span>
                ) : (
                  <span className="flex items-center gap-1">
                    View All Repositories
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
