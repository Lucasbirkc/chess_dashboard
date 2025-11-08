import { StatCard } from "./StatCard";
import { TrendingUp } from "lucide-react";
import { WinRateCircle } from "./WinRateCircle";

export const WinRateCard = () => {
  return (
    <StatCard title="Win Rate" icon={<TrendingUp className="h-5 w-5" />}>
        <WinRateCircle winRate={64} totalGames={634} />
    </StatCard>
  );
};
