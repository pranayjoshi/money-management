"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

export function FundBifurcation() {
  const data = [
    {
      name: "Emergency Fund",
      value: 5000,
      percentage: 15,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Savings Account",
      value: 15750,
      percentage: 47,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Checking Account",
      value: 3543,
      percentage: 11,
      color: "hsl(var(--chart-3))",
    },
    {
      name: "Goals Commitment",
      value: 4500,
      percentage: 13,
      color: "hsl(var(--chart-4))",
    },
    {
      name: "Investments",
      value: 4700,
      percentage: 14,
      color: "hsl(var(--chart-5))",
    },
  ];

  const totalFunds = data.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border rounded-md shadow-md">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-primary text-sm">
            ${data.value.toLocaleString()}{" "}
            <span className="text-muted-foreground">({data.percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label for bars
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const item = data[index];

    return (
      <g>
        <text
          x={x + width - 5}
          y={y + 10}
          fill="#fff"
          textAnchor="end"
          dominantBaseline="middle"
          className="text-xs font-medium"
        >
          ${value.toLocaleString()}
        </text>
        <text
          x={x + width - 5}
          y={y + 25}
          fill="#fff"
          textAnchor="end"
          dominantBaseline="middle"
          className="text-xs opacity-80"
        >
          {item.percentage}%
        </text>
      </g>
    );
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Fund Bifurcation</CardTitle>
        <CardDescription>Distribution of your total assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ChartContainer
            config={{
              emergency: {
                label: "Emergency Fund",
                color: "hsl(var(--chart-1))",
              },
              savings: {
                label: "Savings Account",
                color: "hsl(var(--chart-2))",
              },
              checking: {
                label: "Checking Account",
                color: "hsl(var(--chart-3))",
              },
              goals: {
                label: "Goals Commitment",
                color: "hsl(var(--chart-4))",
              },
              investments: {
                label: "Investments",
                color: "hsl(var(--chart-5))",
              },
            }}
          >
            <ResponsiveContainer width="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={4} barSize={30}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="value" content={renderCustomizedLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
