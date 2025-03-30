"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { db } from "@/lib/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { ChartContainer } from "@/components/ui/chart"

export function GoalAllocation() {
  const [goals, setGoals] = useState<any[]>([])

  useEffect(() => {
    async function fetchGoals() {
      try {
        const docRef = doc(db, "users", "userId") // Replace "userId" with the actual user ID
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          const fetchedGoals = data.goals || []
          setGoals(fetchedGoals)
        } else {
          console.log("No such document!")
        }
      } catch (error) {
        console.error("Error fetching goals: ", error)
      }
    }

    fetchGoals()
  }, [])

  const totalAllocated = goals.reduce((sum, item) => sum + item.current_val, 0)

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card p-3 border rounded-md shadow-md">
          <p className="font-medium text-sm">{data.title}</p>
          <p className="text-primary text-sm">
            ${data.current_val.toLocaleString()} <span className="text-muted-foreground">({(data.current_val / data.total_val * 100).toFixed(2)}%)</span>
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
          {(item.current_val / item.total_val * 100).toFixed(2)}%
        </text>
      </g>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={goals} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="title"
              type="category"
              axisLine={true}
              tickLine={false}
              width={120}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="current_val" radius={4} barSize={30}>
              {goals.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
              ))}
              <LabelList dataKey="current_val" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}