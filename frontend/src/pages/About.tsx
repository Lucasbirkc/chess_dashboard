import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart3, Target, TrendingUp, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Comprehensive Analytics",
      description: "Track your win rates, ratings, and performance metrics across all your chess games.",
    },
    {
      icon: Target,
      title: "Opening Analysis",
      description: "Discover your most played openings and analyze their success rates to improve your game.",
    },
    {
      icon: TrendingUp,
      title: "Performance Trends",
      description: "Visualize your progress over time with detailed charts and trend analysis.",
    },
    {
      icon: Users,
      title: "Chess.com Integration",
      description: "Seamlessly sync your games from Chess.com to get instant insights and statistics.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">About Chess Analytics</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern platform designed to help chess players track, analyze, and improve their game
            through comprehensive statistics and performance insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Connect Your Account</h4>
                <p className="text-muted-foreground">
                  Sign in and add your Chess.com username in the settings to get started.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Fetch Your Games</h4>
                <p className="text-muted-foreground">
                  Use the Data Fetch page to sync your latest games and statistics from Chess.com.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Analyze & Improve</h4>
                <p className="text-muted-foreground">
                  View your dashboard to discover insights about your play style and track your improvement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;
