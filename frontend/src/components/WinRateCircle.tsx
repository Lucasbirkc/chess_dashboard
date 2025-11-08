interface WinRateCircleProps {
  winRate: number;
  totalGames: number;
}

export const WinRateCircle = ({ winRate, totalGames }: WinRateCircleProps) => {
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (winRate / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative w-40 h-40">
        <svg className="transform -rotate-90 w-40 h-40">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-success transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-foreground">{winRate}%</span>
          <span className="text-sm text-muted-foreground">Win Rate</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4">{totalGames} total games</p>
    </div>
  );
};