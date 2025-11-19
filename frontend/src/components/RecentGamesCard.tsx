import { useQuery } from "@tanstack/react-query";
import { fetchRecentGames } from "@/services/api/gamesInfo";
import { type RecentGamesResponse } from "@/types/types";


export const RecentGamesCard = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<RecentGamesResponse>({
    queryKey: ["recentGames"],
    queryFn: fetchRecentGames
  });

  if (isLoading) {
    return (
      <div className="p-4 bg-secondary rounded-lg text-center">
        Loading recent games...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 bg-secondary rounded-lg text-center">
        Error loading recent games.
      </div>
    );
  }

  const recentGames = data.games.slice(0, 5);

  const getResultColor = (result: string) => {
    switch (result) {
      case "win":
        return "bg-green-500/20 text-green-400";
      case "loss":
        return "bg-red-500/20 text-red-400";
      case "draw":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-secondary text-foreground";
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return "< 1h ago";
    }
  };

  return (
    <>
        <div className="space-y-3">
        {recentGames.map((game, index) => (
            <div
            key={index}
            className="p-4 bg-secondary rounded-lg transition-colors hover:bg-secondary/80"
            >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                <span className="font-semibold text-foreground">vs {game.opponent}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getResultColor(game.result)}`}>
                    {game.result.toUpperCase()}
                </span>
                </div>
                <span className="text-sm text-muted-foreground">
                {getTimeAgo(game.timestamp)}
                </span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{game.opening_name}</span>
                <span className="text-muted-foreground">Rating: {game.rating}</span>
            </div>
            </div>
        ))}
        </div>
    </>
  );
};