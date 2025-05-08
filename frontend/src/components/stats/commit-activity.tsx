import { Card } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { CommitActivityData } from '@/types/github';

interface CommitActivityProps {
  data: CommitActivityData[];
}

export const CommitActivity = ({ data }: CommitActivityProps) => {
  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Commit Trends Over Time</h3>
        <p className="text-sm text-muted-foreground">
          Activity patterns over the past year
        </p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EAB308" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => {
                return new Date(date).toLocaleDateString(undefined, {
                  month: 'short'
                });
              }}
              stroke="#888888" 
              fontSize={12}
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold text-foreground">
                            {new Date(label).toLocaleDateString(undefined, {
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Commits
                          </span>
                          <span className="font-bold text-foreground">
                            {payload[0].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="commits"
              stroke="#EAB308"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#commitGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};