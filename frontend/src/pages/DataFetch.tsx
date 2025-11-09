import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { RefreshCw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/Progress";

const DataFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFetchData = () => {
    setIsLoading(true);
    setProgress(0);

    // Simulate data fetching with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          toast({
            title: "Data Updated",
            description: "Your chess statistics have been refreshed successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Data Fetch</h1>
          <p className="text-muted-foreground mt-1">Refresh your chess game data from Chess.com</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sync Your Games</CardTitle>
            <CardDescription>
              Fetch the latest games and statistics from your Chess.com account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-4">
              <Button
                onClick={handleFetchData}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Fetching Data...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Fetch Latest Games
                  </>
                )}
              </Button>

              {isLoading && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    {progress}% complete
                  </p>
                </div>
              )}
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold text-foreground">Last Sync Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-foreground">2 hours ago</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Games Fetched</p>
                  <p className="font-medium text-foreground">634 games</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date Range</p>
                  <p className="font-medium text-foreground">Jan 2024 - Jun 2024</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium text-success">Up to date</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DataFetch;
