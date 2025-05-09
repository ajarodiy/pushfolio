import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, PieChart, Code } from 'lucide-react';
import { LanguageStats } from '@/components/stats/language-stats';
import { CodeMetrics } from '@/components/stats/code-metrics';
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
          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="languages" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <Code className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Languages</span>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <BarChart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Metrics</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="languages" className="mt-0">
              <LanguageStats languages={stats.languages} />
            </TabsContent>
            
            <TabsContent value="metrics" className="mt-0">
              <CodeMetrics metrics={stats.metrics} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};
