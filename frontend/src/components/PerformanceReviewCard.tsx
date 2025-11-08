import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface OpeningPerformance {
  name: string;
  wins: number;
  losses: number;
  draws: number;
  trend: "up" | "down" | "neutral";
}

interface PerformanceReviewProps {
  data: OpeningPerformance[];
}

export const PerformanceReviewCard = ({ data }: PerformanceReviewProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-success" />;
      case "down":
        return <TrendingDown className="h-5 w-5 text-danger" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      {data.map((opening, index) => (
        <div key={index} className="p-4 bg-secondary rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">{opening.name}</h4>
            {getTrendIcon(opening.trend)}
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Wins: {opening.wins}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-danger" />
              <span className="text-muted-foreground">Losses: {opening.losses}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Draws: {opening.draws}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};