import { Trophy } from "lucide-react";

interface Opening {
  name: string;
  gamesPlayed: number;
}

interface OpeningsListProps {
  openings: Opening[];
}

export const OpeningsListCard = ({ openings }: OpeningsListProps) => {
  return (
    <div className="space-y-3">
      {openings.map((opening, index) => (
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
          <span className="text-sm text-muted-foreground">{opening.gamesPlayed} games</span>
        </div>
      ))}
    </div>
  );
};
