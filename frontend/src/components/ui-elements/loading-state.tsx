import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  return (
    <Card className="mt-8 border-yellow-500/30">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-medium">Warming Up the Backend</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              The server is starting up — it may take 20–30 seconds if this is the first request.
              After that, everything will load instantly.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
