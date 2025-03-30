"use client"

import { useState, useEffect } from "react"
import { CreditCard, Plus, Target } from "lucide-react"
import { db } from "@/lib/firebaseConfig"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseChart } from "@/components/expense-chart"
import { InvestmentTable } from "@/components/investment-table"
import { AddGoalDialog } from "@/components/add-goal-dialog"
import UserForm from "./pushtofb"
import { FundBifurcation } from "./fund-bifurcation"
import { ExpenseBreakdown } from "./expense-breakdown"

interface Goal {
  title: string
  total_val: number
  current_val: number
  expected_time: string
  category: string
  isRecurring: boolean
  priority: number
  interestRate: number
}

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Good afternoon")
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    async function fetchGoals() {
      try {
        const docRef = doc(db, "users", "userId") // Replace "userId" with the actual user ID
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          const fetchedGoals = data.goals || []
          // Transform the data to match our interface
          const transformedGoals = fetchedGoals.map((goal: any) => ({
            title: goal.name || goal.title,
            total_val: goal.target || goal.total_val,
            current_val: goal.current || goal.current_val,
            expected_time: goal.expected_time,
            category: goal.category,
            isRecurring: goal.isRecurring,
            priority: goal.priority,
            interestRate: goal.interestRate
          }))
          setGoals(transformedGoals)
        } else {
          console.log("No such document!")
        }
      } catch (error) {
        console.error("Error fetching goals: ", error)
      }
    }

    fetchGoals()
  }, [])

  // In a real app, this would come from an API or state management
  const accounts = [
    { name: "Checking Account", balance: 2543.87, type: "checking" },
    { name: "Savings Account", balance: 12750.52, type: "savings" },
    { name: "Emergency Fund", balance: 5000.0, type: "savings" },
  ]

  const handleAddGoal = async (goal: Goal) => {
    try {
      const docRef = doc(db, "users", "userId") // Replace "userId" with actual user ID
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const currentGoals = docSnap.data().goals || []
        await updateDoc(docRef, {
          goals: [...currentGoals, goal]
        })
        
        // Upex local state after successful Firestore upex
        setGoals(prevGoals => [...prevGoals, goal])
      } else {
        // If document doesn't exist, create it with the first goal
        await setDoc(docRef, {
          goals: [goal]
        })
        setGoals([goal])
      }
    } catch (error) {
      console.error("Error adding goal: ", error)
    }
  }

  const getPriorityColor = (priority: number) => {
    if (priority >= 75) return "text-red-500"
    if (priority >= 50) return "text-yellow-500"
    return "text-green-500"
  }

  const calculateProgress = (current_val: number, total_val: number) => {
    return Math.min(Math.round((current_val / total_val) * 100), 100)
  }

  return (
    <div className="flex-1 space-y-6 overflow-auto p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{greeting}, Alex</h2>
          <p className="text-muted-foreground">Here's what's happening with your money today.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>
      {/* <UserForm /> */}

      {/* Accounts Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground capitalize">{account.type} Account</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goals Section */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Financial Goals</h3>
          <AddGoalDialog onAddGoal={handleAddGoal} />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{goal.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                      {goal.priority >= 75 ? "High" : goal.priority >= 50 ? "Medium" : "Low"} Priority
                    </span>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <CardDescription>
                  Target: ${goal.total_val.toLocaleString()} by {goal.expected_time}
                  {goal.isRecurring && " • Recurring"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">${goal.current_val.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">${goal.total_val.toLocaleString()}</span>
                </div>
                <Progress value={calculateProgress(goal.current_val, goal.total_val)} className="mt-2" />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {calculateProgress(goal.current_val, goal.total_val)}% complete
                  </p>
                  {goal.interestRate > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {goal.interestRate}% interest
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Investments and Expenses */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Investments Tab */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Investments</CardTitle>
            <CardDescription>Track your investment performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stocks">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="etfs">ETFs</TabsTrigger>
              </TabsList>
              <TabsContent value="stocks" className="space-y-4">
                <InvestmentTable type="stocks" />
              </TabsContent>
              <TabsContent value="crypto" className="space-y-4">
                <InvestmentTable type="crypto" />
              </TabsContent>
              <TabsContent value="etfs" className="space-y-4">
                <InvestmentTable type="etfs" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Monthly Expenses */}
        <ExpenseBreakdown />
      </div>
    </div>
  )
}

