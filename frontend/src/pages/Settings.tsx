import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [chessUsername, setChessUsername] = useState("");
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("chessUsername", chessUsername);
    toast({
      title: "Settings Saved",
      description: "Your Chess.com username has been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Chess.com Integration</CardTitle>
            <CardDescription>
              Connect your Chess.com account to fetch and analyze your game statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chess-username">Chess.com Username</Label>
                <Input
                  id="chess-username"
                  type="text"
                  placeholder="Enter your Chess.com username"
                  value={chessUsername}
                  onChange={(e) => setChessUsername(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This will be used to fetch your games and statistics from Chess.com
                </p>
              </div>
              <Button type="submit">Save Settings</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
