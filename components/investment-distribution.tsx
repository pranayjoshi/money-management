"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

export function InvestmentDistribution() {
  // Mock data for investment distribution
  const data = [
    { name: "Stocks", value: 7500, percentage: 45, color: "hsl(var(--chart-1))" },
    { name: "ETFs", value: 5000, percentage: 30, color: "hsl(var(--chart-2))" },
    { name: "Bonds", value: 2500, percentage: 15, color: "hsl(var(--chart-3))" },
    { name: "Crypto", value: 1700, percentage: 10, color: "hsl(var(--chart-4))" },
  ]

  const totalInvestments = data.reduce((sum, item) => sum + item.value, 0)

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card p-3 border rounded-md shadow-md">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-primary text-sm">
            ${data.value.toLocaleString()} <span className="text-muted-foreground">({data.percentage}%)</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          stocks: {
            label: "Stocks",
            color: "hsl(var(--chart-1))",
          },
          etfs: {
            label: "ETFs",
            color: "hsl(var(--chart-2))",
          },
          bonds: {
            label: "Bonds",
            color: "hsl(var(--chart-3))",
          },
          crypto: {
            label: "Crypto",
            color: "hsl(var(--chart-4))",
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
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              labelLine={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="text-center text-sm mt-2 font-medium">
        Total Investments: ${totalInvestments.toLocaleString()}
      </div>
    </div>
  )
}

