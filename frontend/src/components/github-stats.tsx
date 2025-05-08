import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  LineChart,
  PieChart, 
  Calendar, 
  Code
} from 'lucide-react';
import { CommitActivity } from '@/components/stats/commit-activity';
import { LanguageStats } from '@/components/stats/language-stats';
import { CodeMetrics } from '@/components/stats/code-metrics';
import { CommitHeatmap } from '@/components/stats/commit-heatmap';
import type { GitHubStatistics } from '@/types/github';

interface GitHubStatsProps {
  stats: GitHubStatistics;
}

export const GitHubStats = ({ stats }: GitHubStatsProps) => {
  return (
    <section className="scroll-m-20">
      <Card className="border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-yellow-400" />
            <span>GitHub Statistics</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="activity" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="languages" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <Code className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Languages</span>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <BarChart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Metrics</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <LineChart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Trends</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-0">
              <CommitHeatmap data={stats.commitCalendar} />
            </TabsContent>
            
            <TabsContent value="languages" className="mt-0">
              <LanguageStats languages={stats.languages} />
            </TabsContent>
            
            <TabsContent value="metrics" className="mt-0">
              <CodeMetrics metrics={stats.metrics} />
            </TabsContent>
            
            <TabsContent value="trends" className="mt-0">
              <CommitActivity data={stats.commitActivity} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};