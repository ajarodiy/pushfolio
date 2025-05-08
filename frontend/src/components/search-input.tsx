import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Github,
  Search,
  ArrowRight
} from 'lucide-react';

interface SearchInputProps {
  onSubmit: (username: string) => void;
}

export const SearchInput = ({ onSubmit }: SearchInputProps) => {
  const [input, setInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Extract username from URL if needed
    let username = input.trim();
    if (username.includes('github.com/')) {
      username = username.split('github.com/')[1].split('/')[0];
    }
    
    onSubmit(username);
  };
  
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-yellow-500/30">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">Enter GitHub Profile</h2>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Enter a GitHub username or profile URL to generate an AI-enhanced portfolio visualization
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., octocat or github.com/octocat"
                className="pl-9 bg-background border-yellow-500/20 focus:border-yellow-500/50"
              />
            </div>
            
            <Button 
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition-all duration-300 px-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={!input.trim()}
            >
              <span>Generate Portfolio</span>
              <ArrowRight 
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
              />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};