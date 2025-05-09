import { Card } from '@/components/ui/card';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';
import type { LanguageData } from '@/types/github';

interface LanguageStatsProps {
  languages: LanguageData[] | undefined;
}

export const LanguageStats = ({ languages }: LanguageStatsProps) => {
  const COLORS = [
    '#EAB308', '#F59E0B', '#F97316', '#EF4444', '#A3E635',
    '#10B981', '#06B6D4', '#0EA5E9', '#8B5CF6', '#EC4899',
  ];

  if (!languages || !Array.isArray(languages) || languages.length === 0) {
    return (
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">
          No language data available.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Programming Languages</h3>
        <p className="text-sm text-muted-foreground">
          Distribution of programming languages across repositories
        </p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languages}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="percentage"
              nameKey="name"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={false}
            >
              {languages.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Language
                          </span>
                          <span className="font-bold text-foreground">
                            {data.name}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Percentage
                          </span>
                          <span className="font-bold text-foreground">
                            {(data.percentage * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex flex-col col-span-2">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Lines of Code
                          </span>
                          <span className="font-bold text-foreground">
                            {data.linesOfCode.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4">
        {languages.map((lang, index) => (
          <div key={lang.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs">{lang.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
