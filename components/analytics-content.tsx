"use client";

import { useState } from "react";
import { CalendarClock, Download, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BankAccountDetails } from "@/components/bank-account-details";
import { TransactionsTable } from "@/components/transactions-table";
import { ExpenseBreakdown } from "@/components/expense-breakdown";
import { FundBifurcation } from "@/components/fund-bifurcation";

export default function AnalyticsContent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                size="sm"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                {date
                  ? date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {/* Bank Account Details */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>
                Overview of your financial accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BankAccountDetails />
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your financial activity for May 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  <TabsTrigger value="transfers">Transfers</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <TransactionsTable type="all" />
                </TabsContent>
                <TabsContent value="income" className="space-y-4">
                  <TransactionsTable type="income" />
                </TabsContent>
                <TabsContent value="expenses" className="space-y-4">
                  <TransactionsTable type="expenses" />
                </TabsContent>
                <TabsContent value="transfers" className="space-y-4">
                  <TransactionsTable type="transfers" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* Fund Bifurcation */}
          <FundBifurcation />
          {/* Expense Breakdown Distribution */}
          <ExpenseBreakdown />
        </div>
      </div>
    </main>
  );
}
