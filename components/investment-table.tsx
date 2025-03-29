"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface InvestmentTableProps {
  type: "stocks" | "crypto" | "etfs"
}

export function InvestmentTable({ type }: InvestmentTableProps) {
  // Mock data for different investment types
  const investments = {
    stocks: [
      { name: "Apple Inc.", symbol: "AAPL", value: 3250.75, change: 2.4 },
      { name: "Microsoft", symbol: "MSFT", value: 2100.5, change: 1.2 },
      { name: "Tesla", symbol: "TSLA", value: 1800.25, change: -3.1 },
    ],
    crypto: [
      { name: "Bitcoin", symbol: "BTC", value: 1200.0, change: 5.7 },
      { name: "Ethereum", symbol: "ETH", value: 850.25, change: 3.2 },
      { name: "Solana", symbol: "SOL", value: 450.5, change: -1.8 },
    ],
    etfs: [
      { name: "Vanguard S&P 500", symbol: "VOO", value: 2500.0, change: 0.8 },
      { name: "iShares Russell 2000", symbol: "IWM", value: 1750.5, change: -0.5 },
      { name: "Invesco QQQ Trust", symbol: "QQQ", value: 1950.75, change: 1.5 },
    ],
  }

  const data = investments[type]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="text-right">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.symbol}>
            <TableCell>
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.symbol}</div>
              </div>
            </TableCell>
            <TableCell>${item.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</TableCell>
            <TableCell className="text-right">
              <div className={`flex items-center justify-end ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {item.change >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                {Math.abs(item.change)}%
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

