"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Rent", value: 1200, color: "hsl(var(--chart-1))" },
  { name: "Food", value: 450, color: "hsl(var(--chart-2))" },
  { name: "Transportation", value: 200, color: "hsl(var(--chart-3))" },
  { name: "Utilities", value: 150, color: "hsl(var(--chart-4))" },
  { name: "Entertainment", value: 180, color: "hsl(var(--chart-5))" },
  { name: "Other", value: 220, color: "hsl(var(--chart-6))" },
]

export function ExpenseChart() {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          rent: {
            label: "Rent",
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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

