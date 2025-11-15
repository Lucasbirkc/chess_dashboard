import { TrendingUp, Target } from "lucide-react";
import { StatCard } from "./StatCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPeakRating, fetchLatestRating } from "@/services/api/gamesInfo";


export const PeakRatingCard = () => {
  const {
    data: peak_data,
    isLoading: peakIsLoading,
    isError: peakIsError,
  } = useQuery({
    queryKey: ["peakRating"],
    queryFn: fetchPeakRating,
  });

  const {
    data: latest_data,
    isLoading: latestIsLoading,
    isError: latestIsError,
  } = useQuery({
    queryKey: ["latestRating"],
    queryFn: fetchLatestRating,
  });

  if (peakIsLoading || latestIsLoading) {
    return (
      <StatCard title="Peak rating" icon={<TrendingUp className="h-5 w-5" />}>
        <p>Loading...</p>
      </StatCard>
    );
  }

  if (peakIsError || latestIsError || !peak_data || !latest_data) {
    return (
      <StatCard title="Peak Rating" icon={<TrendingUp className="h-5 w-5" />}>
        <p>Error loading peak rating</p>
      </StatCard>
    );
  }

  const peak_rating = peak_data.peak_rating
  const latest_rating = latest_data.latest_rating



  return (
    <StatCard title="Peak Rating" icon={<Target className="h-5 w-5" />}>
        <div className="py-4 space-y-4">
            <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Current Rating</p>
            <p className="text-4xl font-bold text-foreground">{latest_rating}</p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-success">
            <TrendingUp className="h-5 w-5" />
            <span className="font-medium">Peak: {peak_rating}</span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {peak_rating - latest_rating} points from peak
            </div>
        </div>
    </StatCard>
  );
};
