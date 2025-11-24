import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest, initializeCSRF } from "@/services/api/csrf";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiRequest("/api/users/auth/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update auth context with current user
        await checkAuth();
        // Re-fetch the new CSRF token
        await initializeCSRF(); 
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
                value={username}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  className="ml-auto inline-block text-sm underline"
                  href="/forgot-password"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 mt-2">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
        <CardFooter>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <a className="underline" href="/signup">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginCard;