import { Card } from '@/components/ui/card';
import type { CodeMetricsData } from '@/types/github';
import { 
  GalleryVerticalEnd, 
  Users,
  Star
} from 'lucide-react';

interface CodeMetricsProps {
  metrics: CodeMetricsData;
}

export const CodeMetrics = ({ metrics }: CodeMetricsProps) => {
  const metricsItems = [
    {
      name: "Repositories",
      value: metrics.totalRepositories,
      icon: <GalleryVerticalEnd className="h-5 w-5 text-yellow-400" />,
      description: "Public repositories created",
    },
    {
      name: "Contributors",
      value: metrics.totalContributors,
      icon: <Users className="h-5 w-5 text-yellow-400" />,
      description: "People who contributed to repos",
    },
    {
      name: "Stars Earned",
      value: metrics.totalStars,
      icon: <Star className="h-5 w-5 text-yellow-400" />,
      description: "Total stars across repositories",
    },
  ];

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Code Metrics</h3>
        <p className="text-sm text-muted-foreground">
          Key statistics about your GitHub coding activity
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metricsItems.map((item) => (
          <Card key={item.name} className="p-4 border-yellow-500/20 hover:border-yellow-500/50 transition-colors">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-2 rounded-full bg-yellow-500/10">
                {item.icon}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};