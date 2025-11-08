import { TrendingUp, Target } from "lucide-react";
import { StatCard } from "./StatCard";


export const PeakRatingCard = () => {
  return (
    <StatCard title="Peak Rating" icon={<Target className="h-5 w-5" />}>
        <div className="py-4 space-y-4">
            <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Current Rating</p>
            <p className="text-4xl font-bold text-foreground">1847</p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-success">
            <TrendingUp className="h-5 w-5" />
            <span className="font-medium">Peak: 1892</span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
            45 points from peak
            </div>
        </div>
    </StatCard>
  );
};
