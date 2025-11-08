import { StatCard } from "./StatCard";
import { TrendingUp } from "lucide-react";

export const WinRateCard = () => {
  return (
    <StatCard title="Win Rate" icon={<TrendingUp className="h-5 w-5" />}>
        <p>Test Winrate Card</p>
    </StatCard>
  );
};
