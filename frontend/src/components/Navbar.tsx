import { Link, useLocation } from "react-router-dom";
import { BarChart3, RefreshCw, Settings, Info, Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
    localStorage.setItem('theme', newTheme);
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/data-fetch", label: "Data Fetch", icon: RefreshCw },
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Chess Analytics</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center">
            {user && ( // Show if user is logged in
              <button 
                onClick={handleLogout}
                className="p-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;