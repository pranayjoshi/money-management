"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function ExpenseBreakdown() {
  const data = [
    { name: "Housing", value: 1200, color: "hsl(var(--chart-1))" },
    { name: "Food", value: 450, color: "hsl(var(--chart-2))" },
    { name: "Transportation", value: 200, color: "hsl(var(--chart-3))" },
    { name: "Utilities", value: 150, color: "hsl(var(--chart-4))" },
    { name: "Entertainment", value: 180, color: "hsl(var(--chart-5))" },
    { name: "Other", value: 220, color: "hsl(var(--chart-6))" },
  ];

  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages
  const dataWithPercentage = data.map((item) => ({
    ...item,
    percentage: ((item.value / totalExpenses) * 100).toFixed(1),
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border rounded-md shadow-md">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-primary text-sm">
            ${data.value}{" "}
            <span className="text-muted-foreground">({data.percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm mt-2">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-1">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>
              {entry.value}: ${dataWithPercentage[index].value} (
              {dataWithPercentage[index].percentage}%)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>Your spending breakdown for May 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ChartContainer
            config={{
              housing: {
                label: "Housing",
                color: "hsl(var(--chart-1))",
              },
              food: {
                label: "Food",
                color: "hsl(var(--chart-2))",
              },
              transportation: {
                label: "Transportation",
                color: "hsl(var(--chart-3))",
              },
              utilities: {
                label: "Utilities",
                color: "hsl(var(--chart-4))",
              },
              entertainment: {
                label: "Entertainment",
                color: "hsl(var(--chart-5))",
              },
              other: {
                label: "Other",
                color: "hsl(var(--chart-6))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataWithPercentage}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  labelLine={true}
                >
                  {dataWithPercentage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend content={renderLegend} verticalAlign="bottom" height={60} /> */}
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
