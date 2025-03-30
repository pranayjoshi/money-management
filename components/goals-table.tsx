"use client"

import { CalendarIcon, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function GoalsTable() {
  // Mock data for goals
  const goals = [
    {
      id: 1,
      name: "New Car",
      target: 15000,
      current: 7500,
      date: "Dec 2025",
      progress: 50,
    },
    {
      id: 2,
      name: "Vacation",
      target: 3000,
      current: 2100,
      date: "Aug 2025",
      progress: 70,
    },
    {
      id: 3,
      name: "Home Down Payment",
      target: 50000,
      current: 12500,
      date: "Jan 2027",
      progress: 25,
    },
    {
      id: 4,
      name: "Emergency Fund",
      target: 10000,
      current: 9000,
      date: "Oct 2025",
      progress: 90,
    },
    {
      id: 5,
      name: "Wedding",
      target: 20000,
      current: 5000,
      date: "Jun 2026",
      progress: 25,
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Goal</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Target Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{goal.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Progress
                    value={goal.progress}
                    className="h-2"
                    style={{
                      background: "linear-gradient(to right, hsl(199, 89%, 64%), hsl(190, 90%, 50%))",
                      backgroundSize: `${goal.progress}% 100%`,
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{goal.progress}% complete</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{goal.date}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

