import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, MapPin, Calendar, Users } from 'lucide-react';
import type { User } from '@/types/github';

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <section className="scroll-m-20">
      <Card className="overflow-hidden border-yellow-500/30">
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 h-32 relative" />
        
        <CardContent className="p-6 pt-0 -mt-16">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32 border-4 border-card bg-card rounded-full">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-3 flex-1">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {user.name}
                  {user.hireable && (
                    <Badge className="ml-2 bg-yellow-500 text-black">
                      Available for hire
                    </Badge>
                  )}
                </h2>
                <p className="text-muted-foreground font-mono">@{user.login}</p>
              </div>
              
              <p className="text-foreground/90 max-w-3xl">{user.bio}</p>
              
              <div className="flex flex-wrap gap-3">
                {user.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                {user.createdAt && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{user.followers} followers · {user.following} following</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6 bg-yellow-500/20" />
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-foreground/90 leading-relaxed">{user.aiSummary}</p>
            </div>
            
            <a 
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <span>View GitHub Profile</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};