"use client"
import { Download, Filter, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { GoalsTable } from "@/components/goals-table"
import { GoalAllocation } from "@/components/goal-allocation"
import { AIInvestmentSuggestions } from "@/components/ai-investment-suggestions"
import { InvestmentTable } from "@/components/investment-table"
import { InvestmentDistribution } from "@/components/investment-distribution"
import { AddGoalDialog } from "@/components/add-goal-dialog"

export default function InvestmentsGoalsContent() {
    const handleAddGoal = (goal: {
        title: string;
        total_val: number;
        current_val: number;
        expected_time: string;
        category: string;
        isRecurring: boolean;
        priority: number;
        interestRate: number;
    }) => {
        // setGoals([...goals, goal])
    }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Investments & Goals</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Top Row - Goals */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Goals Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Track your progress towards your financial goals</CardDescription>
            </div>
            <AddGoalDialog onAddGoal={handleAddGoal} />
          </CardHeader>
          <CardContent>
            <GoalsTable />
          </CardContent>
        </Card>

        {/* Goal Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Goal Allocation</CardTitle>
            <CardDescription>Distribution of funds across your goals</CardDescription>
          </CardHeader>
          <CardContent>
            <GoalAllocation />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Investments */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* AI Investment Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>AI Investment Suggestions</CardTitle>
            <CardDescription>Personalized investment recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <AIInvestmentSuggestions />
          </CardContent>
        </Card>

        {/* Investment Table */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Portfolio</CardTitle>
            <CardDescription>Your current investment holdings</CardDescription>
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

        {/* Investment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Distribution</CardTitle>
            <CardDescription>Breakdown of your investment portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <InvestmentDistribution />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

