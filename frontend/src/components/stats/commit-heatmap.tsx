import { useState } from 'react';
import { Card } from '@/components/ui/card';
import type { HeatmapData } from '@/types/github';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface CommitHeatmapProps {
  data: HeatmapData[];
}

export const CommitHeatmap = ({ data }: CommitHeatmapProps) => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapData | null>(null);
  
  // Group data by month and week for better organization
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["Mon", "Wed", "Fri"];
  
  // Function to get all weeks
  const getWeeks = () => {
    const weeks: HeatmapData[][] = [];
    let currentWeek: HeatmapData[] = [];
    
    // Assuming data is already sorted by date
    for (let i = 0; i < data.length; i++) {
      currentWeek.push(data[i]);
      
      // Start a new week every 7 days
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    // Add any remaining days
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  };
  
  // Get all weeks
  const weeks = getWeeks();
  
  // Function to get color based on commit count
  const getColor = (count: number) => {
    if (count === 0) return 'bg-neutral-800 hover:bg-neutral-700';
    if (count < 3) return 'bg-yellow-900 hover:bg-yellow-800';
    if (count < 6) return 'bg-yellow-700 hover:bg-yellow-600';
    if (count < 10) return 'bg-yellow-600 hover:bg-yellow-500';
    return 'bg-yellow-500 hover:bg-yellow-400';
  };
  
  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Commit Activity</h3>
        <p className="text-sm text-muted-foreground">
          GitHub contribution calendar for the past year
        </p>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="grid grid-flow-col gap-1 min-w-[800px]">
          {/* Day labels */}
          <div className="grid grid-rows-7 gap-1 text-xs text-right pr-2">
            {dayNames.map((day, index) => (
              <div key={day} className="row-start-[${index * 2 + 1}] h-[10px] flex items-center justify-end">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          {weeks.map((week, weekIndex) => {
            // Get the month for the first day of the week
            const monthIndex = new Date(week[0]?.date).getMonth();
            const showMonthLabel = weekIndex === 0 || 
              new Date(weeks[weekIndex-1][0]?.date).getMonth() !== monthIndex;
            
            return (
              <div key={weekIndex} className="flex flex-col">
                {/* Month label */}
                {showMonthLabel && (
                  <div className="h-5 text-xs flex items-center justify-center">
                    {monthNames[monthIndex]}
                  </div>
                )}
                {!showMonthLabel && <div className="h-5" />}
                
                {/* Days */}
                <div className="grid grid-rows-7 gap-1">
                  {week.map((day, dayIndex) => (
                    <TooltipProvider key={day.date}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-[10px] h-[10px] rounded-sm ${getColor(day.count)} transition-colors cursor-pointer`}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p className="font-medium">{new Date(day.date).toLocaleDateString(undefined, {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</p>
                            <p>{day.count} commits</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex items-center justify-end mt-2 space-x-2">
        <span className="text-xs text-muted-foreground">Less</span>
        {[0, 2, 5, 8, 12].map((count) => (
          <div
            key={count}
            className={`w-[10px] h-[10px] rounded-sm ${getColor(count)}`}
          />
        ))}
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </Card>
  );
};