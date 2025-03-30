"use client"

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

export function GoalAllocation() {
  // Mock data for goals
  const goals = [
    {
      name: "New Car",
      value: 7500,
      percentage: 21,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Vacation",
      value: 2100,
      percentage: 6,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Home Down Payment",
      value: 12500,
      percentage: 35,
      color: "hsl(var(--chart-3))",
    },
    {
      name: "Emergency Fund",
      value: 9000,
      percentage: 25,
      color: "hsl(var(--chart-4))",
    },
    {
      name: "Wedding",
      value: 5000,
      percentage: 14,
      color: "hsl(var(--chart-5))",
    },
  ]

  const totalAllocated = goals.reduce((sum, item) => sum + item.value, 0)

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

  // Custom label for bars
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props
    const item = goals[index]

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
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          car: {
            label: "New Car",
            color: "hsl(var(--chart-1))",
          },
          vacation: {
            label: "Vacation",
            color: "hsl(var(--chart-2))",
          },
          home: {
            label: "Home Down Payment",
            color: "hsl(var(--chart-3))",
          },
          emergency: {
            label: "Emergency Fund",
            color: "hsl(var(--chart-4))",
          },
          wedding: {
            label: "Wedding",
            color: "hsl(var(--chart-5))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={goals} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
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
              {goals.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList dataKey="value" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="text-center text-sm mt-2 font-medium">Total Allocated: ${totalAllocated.toLocaleString()}</div>
    </div>
  )
}

