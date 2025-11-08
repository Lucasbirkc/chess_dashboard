import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  month: string;
  winRate: number;
}

interface OpeningTrendChartProps {
  data: ChartData[];
}

export const OpeningTrendChartCard = ({ data }: OpeningTrendChartProps) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="month" 
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="winRate"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};