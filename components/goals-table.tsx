"use client"

import { CalendarIcon, Edit, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function GoalsTable() {
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
          {goals.map((goal, index) => (
            <TableRow key={index}>
              <TableCell>
                <div>
                  <div className="font-medium">{goal.title}</div>
                  <div className="text-sm text-muted-foreground">
                    ${goal.current_val.toLocaleString()} of ${goal.total_val.toLocaleString()}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Progress
                    value={goal.current_val/goal.total_val*100}
                    className="h-2"
                    style={{
                      background: "linear-gradient(to right, hsl(199, 89%, 64%), hsl(190, 90%, 50%))",
                      backgroundSize: `${goal.current_val/goal.total_val*100}% 100%`,
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{goal.current_val/goal.total_val*100}% complete</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{goal.expected_time}</span>
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

