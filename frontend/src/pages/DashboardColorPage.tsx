import { TrendingUp, TrendingDown, Trophy, Target, Clock, Zap } from 'lucide-react';

const ColorChessAnalyticsDashboard = () => {
  // ============================================
  // 🎨 COLOR PALETTE - CHANGE ONLY THESE TWO VALUES
  // ============================================
  const BASE_BACKGROUND = '#2f2029';  // Background base color
  const BASE_BRAND = '#e5fffc';       // Brand color

  // Auto-calculate all other colors
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const lighten = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    const r = Math.min(255, rgb.r + (255 - rgb.r) * percent);
    const g = Math.min(255, rgb.g + (255 - rgb.g) * percent);
    const b = Math.min(255, rgb.b + (255 - rgb.b) * percent);
    return rgbToHex(r, g, b);
  };

  const darken = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    const r = Math.max(0, rgb.r * (1 - percent));
    const g = Math.max(0, rgb.g * (1 - percent));
    const b = Math.max(0, rgb.b * (1 - percent));
    return rgbToHex(r, g, b);
  };

  const addOpacity = (hex: string, opacity: number) => {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  };

  const colors = {
    background: BASE_BACKGROUND,
    brand: BASE_BRAND,
    
    // Auto-calculated background variations
    bgLight: lighten(BASE_BACKGROUND, 0.15),
    bgLighter: lighten(BASE_BACKGROUND, 0.25),
    border: lighten(BASE_BACKGROUND, 0.35),
    
    // Auto-calculated text colors (derived from brand)
    textPrimary: BASE_BRAND,                    // Brand color for headlines
    textSecondary: lighten(BASE_BRAND, 0.15),   // Slightly lighter for secondary text
    textMuted: darken(BASE_BRAND, 0.15),        // Slightly darker for muted text
    
    // Auto-calculated brand variations
    brandLight: lighten(BASE_BRAND, 0.20),
    brandDark: darken(BASE_BRAND, 0.20),
    brandMuted: addOpacity(BASE_BRAND, 0.1),
    
    // Status colors (fixed, but you can make these dynamic too)
    success: '#10b981',
    successLight: 'rgba(16, 185, 129, 0.1)',
    danger: '#ef4444',
    dangerLight: 'rgba(239, 68, 68, 0.1)',
    warning: '#f59e0b',
    warningLight: 'rgba(245, 158, 11, 0.1)',
  };

  const stats = [
    { label: 'Total Games', value: '1,247', change: '+12%', trend: 'up', icon: Trophy },
    { label: 'Win Rate', value: '58.3%', change: '+2.4%', trend: 'up', icon: Target },
    { label: 'Avg. Game Time', value: '18m', change: '-3m', trend: 'down', icon: Clock },
    { label: 'Peak Rating', value: '1842', change: '+47', trend: 'up', icon: Zap },
  ];

  const openings = [
    { name: 'Sicilian Defense', games: 342, winRate: 62, color: colors.brand },
    { name: 'French Defense', games: 218, winRate: 55, color: colors.brandLight },
    { name: 'Italian Game', games: 186, winRate: 59, color: colors.brandDark },
    { name: 'Caro-Kann', games: 154, winRate: 51, color: colors.warning },
    { name: 'Queen\'s Gambit', games: 127, winRate: 48, color: colors.danger },
  ];

  const recentGames = [
    { opponent: 'GrandMaster_91', result: 'Win', rating: 1856, opening: 'Sicilian Defense', time: '2h ago' },
    { opponent: 'ChessPro_42', result: 'Loss', rating: 1823, opening: 'French Defense', time: '5h ago' },
    { opponent: 'Pawn_King', result: 'Win', rating: 1791, opening: 'Italian Game', time: '1d ago' },
    { opponent: 'Knight_Rider', result: 'Win', rating: 1845, opening: 'Sicilian Defense', time: '1d ago' },
  ];

  return (
    <div 
      className="min-h-screen p-6 md:p-8"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: colors.textPrimary }}
        >
          Chess Analytics
        </h1>
        <p style={{ color: colors.textSecondary }}>
          Track your performance and improve your game
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === 'up';
            
            return (
              <div
                key={idx}
                className="rounded-lg p-6 transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: colors.bgLight,
                  borderWidth: '1px',
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: colors.brandMuted }}
                  >
                    <Icon size={20} style={{ color: colors.brand }} />
                  </div>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp size={16} style={{ color: colors.success }} />
                    ) : (
                      <TrendingDown size={16} style={{ color: colors.danger }} />
                    )}
                    <span
                      className="text-sm font-medium"
                      style={{ color: isPositive ? colors.success : colors.danger }}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div>
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: colors.textPrimary }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: colors.textMuted }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Opening Repertoire */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: colors.bgLight,
              borderWidth: '1px',
              borderColor: colors.border,
            }}
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: colors.textPrimary }}
            >
              Opening Repertoire
            </h2>
            <div className="space-y-4">
              {openings.map((opening, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-medium"
                      style={{ color: colors.textPrimary }}
                    >
                      {opening.name}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {opening.games} games
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: colors.bgLighter }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${opening.winRate}%`,
                          backgroundColor: opening.color,
                        }}
                      />
                    </div>
                    <span
                      className="text-sm font-semibold w-12 text-right"
                      style={{ color: colors.textPrimary }}
                    >
                      {opening.winRate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Games */}
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: colors.bgLight,
              borderWidth: '1px',
              borderColor: colors.border,
            }}
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: colors.textPrimary }}
            >
              Recent Games
            </h2>
            <div className="space-y-3">
              {recentGames.map((game, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-4 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundColor: colors.bgLighter,
                    borderWidth: '1px',
                    borderColor: colors.border,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-semibold"
                      style={{ color: colors.textPrimary }}
                    >
                      vs {game.opponent}
                    </span>
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: game.result === 'Win' ? colors.successLight : colors.dangerLight,
                        color: game.result === 'Win' ? colors.success : colors.danger,
                      }}
                    >
                      {game.result}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: colors.textSecondary }}>
                      {game.opening}
                    </span>
                    <span style={{ color: colors.textMuted }}>
                      {game.time}
                    </span>
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: colors.brand }}
                  >
                    Rating: {game.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: colors.bgLight,
            borderWidth: '1px',
            borderColor: colors.border,
          }}
        >
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
          >
            Rating Progress
          </h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 72, 68, 78, 75, 82, 88, 85, 90, 87, 92, 95].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  height: `${height}%`,
                  backgroundColor: idx === 11 ? colors.brand : colors.brandMuted,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
              <span
                key={idx}
                className="text-xs"
                style={{ color: colors.textMuted }}
              >
                {month}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <button
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: colors.brand,
              color: colors.textPrimary,
            }}
          >
            Analyze New Game
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: colors.bgLight,
              color: colors.textPrimary,
              borderWidth: '1px',
              borderColor: colors.border,
            }}
          >
            View Full History
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              color: colors.brand,
              borderWidth: '1px',
              borderColor: colors.brand,
            }}
          >
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorChessAnalyticsDashboard;
