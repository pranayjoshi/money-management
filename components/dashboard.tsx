"use client"

import { useState } from "react"
import { CreditCard, Plus, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseChart } from "@/components/expense-chart"
import { InvestmentTable } from "@/components/investment-table"

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Good afternoon")

  // In a real app, this would come from an API or state management
  const accounts = [
    { name: "Checking Account", balance: 2543.87, type: "checking" },
    { name: "Savings Account", balance: 12750.52, type: "savings" },
    { name: "Emergency Fund", balance: 5000.0, type: "savings" },
  ]

  const goals = [
    { name: "New Car", target: 15000, current: 7500, date: "Dec 2025" },
    { name: "Vacation", target: 3000, current: 2100, date: "Aug 2025" },
    { name: "Home Down Payment", target: 50000, current: 12500, date: "Jan 2027" },
  ]

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
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.name}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{goal.name}</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  Target: ${goal.target.toLocaleString()} by {goal.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">${goal.current.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">${goal.target.toLocaleString()}</span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="mt-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </p>
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
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
            <CardDescription>Your spending breakdown for May 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

