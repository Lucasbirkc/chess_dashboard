import { useQuery } from "@tanstack/react-query";
import { fetchPlayerOpenings } from "@/services/api/gamesInfo";
import { type Opening } from "@/types/types";

export const OpeningsListCard = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<Opening[]>({
    queryKey: ["playerOpenings"],
    queryFn: fetchPlayerOpenings
  });

  if (isLoading) {
    return (
      <div className="p-4 bg-secondary rounded-lg text-center">
        Loading openings...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 bg-secondary rounded-lg text-center">
        Error loading openings.
      </div>
    );
  }

  const normalized = data.map(o => ({
    name: o.opening_name,
    gamesPlayed: o.count,
  }));

  const topFive = normalized
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
    .slice(0, 5);

  return (
    <div className="space-y-3">
      {topFive.map((opening: any, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-secondary rounded-lg transition-colors hover:bg-secondary/80"
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {index + 1}
            </div>
            <span className="font-medium text-foreground">{opening.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {opening.gamesPlayed} games
          </span>
        </div>
      ))}
    </div>
  );
};