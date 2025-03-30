"use client"

import { ArrowDown, ArrowRight, Coffee, CreditCard, Home, ShoppingBag } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TransactionsTableProps {
  type: "all" | "income" | "expenses" | "transfers"
}

export function TransactionsTable({ type }: TransactionsTableProps) {
  // Mock data for transactions
  const allTransactions = [
    {
      id: 1,
      date: "May 28, 2025",
      description: "Salary Deposit",
      category: "Income",
      amount: 3500.0,
      type: "income",
      icon: <ArrowDown className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      date: "May 27, 2025",
      description: "Starbucks Coffee",
      category: "Food & Drink",
      amount: -4.95,
      type: "expense",
      icon: <Coffee className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 3,
      date: "May 26, 2025",
      description: "Amazon Purchase",
      category: "Shopping",
      amount: -67.89,
      type: "expense",
      icon: <ShoppingBag className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 4,
      date: "May 25, 2025",
      description: "Rent Payment",
      category: "Housing",
      amount: -1200.0,
      type: "expense",
      icon: <Home className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 5,
      date: "May 24, 2025",
      description: "Transfer to Savings",
      category: "Transfer",
      amount: -500.0,
      type: "transfer",
      icon: <ArrowRight className="h-4 w-4 text-primary" />,
    },
    {
      id: 6,
      date: "May 23, 2025",
      description: "Freelance Payment",
      category: "Income",
      amount: 350.0,
      type: "income",
      icon: <ArrowDown className="h-4 w-4 text-green-500" />,
    },
    {
      id: 7,
      date: "May 22, 2025",
      description: "Credit Card Payment",
      category: "Bills",
      amount: -250.0,
      type: "expense",
      icon: <CreditCard className="h-4 w-4 text-red-500" />,
    },
  ]

  // Filter transactions based on type
  const transactions =
    type === "all" ? allTransactions : allTransactions.filter((transaction) => transaction.type === type.slice(0, -1)) // Remove 's' from the end

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {transaction.icon}
                    <span>{transaction.description}</span>
                  </div>
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell
                  className={`text-right ${transaction.amount < 0 ? "text-red-500" : "text-[hsl(199,89%,64%)]"}`}
                >
                  ${Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

