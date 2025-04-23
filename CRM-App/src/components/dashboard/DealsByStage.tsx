import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DealsByStageProps {
  deals: { stage: string; value: number }[];
}

const stageColors: { [stage: string]: string } = {
  "Qualified": "#3b82f6",
  "Proposal": "#eab308",
  "Negotiation": "#f97316",
  "Won": "#22c55e",
  "Lost": "#ef4444",
};

export default function DealsByStage({ deals }: DealsByStageProps) {
  // Transform deals data to pie chart data
  const pieData = deals.map(deal => ({
    name: deal.stage,
    value: 1, // Count the number of deals in each stage
    color: stageColors[deal.stage] || "#9ca3af", // Default color if stage not found
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Deals by Stage</CardTitle>
        <CardDescription>Current deal pipeline distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => {
                  return <span className="text-sm">{value}</span>;
                }}
              />
              <Tooltip
                formatter={(value: number) => [`${value}`, "Number of Deals"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow:
                    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
