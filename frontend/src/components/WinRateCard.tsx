import { StatCard } from "./StatCard";
import { TrendingUp } from "lucide-react";
import { WinRateCircle } from "./WinRateCircle";
import { useQuery } from "@tanstack/react-query";
import { fetchWinRate } from "@/services/api/gamesInfo";

export const WinRateCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["winRate"],
    queryFn: fetchWinRate,
  });

  if (isLoading) {
    return (
      <StatCard title="Win Rate" icon={<TrendingUp className="h-5 w-5" />}>
        <p>Loading...</p>
      </StatCard>
    );
  }

  if (isError || !data) {
    return (
      <StatCard title="Win Rate" icon={<TrendingUp className="h-5 w-5" />}>
        <p>Error loading win rate</p>
      </StatCard>
    );
  }
  const { win_rate, total_games } = data;

  return (
    <StatCard title="Win Rate" icon={<TrendingUp className="h-5 w-5" />}>
        <WinRateCircle winRate={win_rate} totalGames={total_games} />
    </StatCard>
  );
};
