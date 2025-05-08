import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Star, 
  GitFork, 
  Eye,
  Clock,
  ExternalLink
} from 'lucide-react';
import type { Repository } from '@/types/github';

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  // Function to get tech stack badge color based on name
  const getTechBadgeColor = (tech: string) => {
    const techColors: Record<string, string> = {
      javascript: 'bg-yellow-500/80 text-black',
      typescript: 'bg-blue-500/80',
      python: 'bg-green-500/80',
      java: 'bg-orange-500/80',
      'c#': 'bg-purple-500/80',
      html: 'bg-red-500/80',
      css: 'bg-pink-500/80',
      php: 'bg-indigo-500/80',
      ruby: 'bg-red-700/80',
      go: 'bg-cyan-500/80',
      rust: 'bg-orange-700/80',
      swift: 'bg-orange-500/80',
      kotlin: 'bg-purple-700/80',
      default: 'bg-zinc-500/80'
    };
    
    const key = tech.toLowerCase();
    return techColors[key] || techColors.default;
  };
  
  return (
    <Card className="group border-yellow-500/20 overflow-hidden transition-all hover:border-yellow-500/50 hover:shadow-md hover:shadow-yellow-900/10">
      <CardContent className="p-5">
        <div className="space-y-3">
          <div>
            <a 
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-lg font-semibold hover:text-yellow-400 transition-colors"
            >
              {repository.name}
              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{repository.stars}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                <span>{repository.forks}</span>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(repository.updatedAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Last Updated</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <p className="text-sm text-foreground/80 line-clamp-2">{repository.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {repository.techStack.map((tech) => (
              <Badge 
                key={tech} 
                className={`${getTechBadgeColor(tech)} text-xs`}
              >
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="text-sm border-t border-yellow-500/10 pt-3 mt-3">
            <p className="text-xs text-muted-foreground">{repository.aiSummary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};