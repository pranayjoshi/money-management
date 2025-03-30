"use client"

import { CreditCard, Landmark, Wallet } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function BankAccountDetails() {
  // Mock data for bank accounts
  const accounts = [
    {
      name: "Chase Freedom Unlimited",
      type: "Credit Card",
      number: "**** **** **** 5678",
      balance: -1250.75,
      limit: 5000,
      icon: <CreditCard className="h-5 w-5 text-primary" />,
      utilization: 25,
    },
    {
      name: "Bank of America Checking",
      type: "Checking Account",
      number: "**** 4321",
      balance: 3542.87,
      icon: <Wallet className="h-5 w-5 text-primary" />,
    },
    {
      name: "Wells Fargo Savings",
      type: "Savings Account",
      number: "**** 8765",
      balance: 15750.52,
      icon: <Landmark className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="space-y-4 flex">
      {accounts.map((account) => (
        <Card key={account.name} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {account.icon}
                  <h3 className="font-medium">{account.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{account.number}</p>
                <p className="text-sm text-muted-foreground">{account.type}</p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${account.balance < 0 ? "text-red-500" : "text-primary"}`}>
                  ${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                {account.balance < 0 && <p className="text-xs text-muted-foreground">Outstanding Balance</p>}
                {account.type === "Credit Card" && (
                  <p className="text-xs text-muted-foreground">
                    Available Credit: $
                    {(account.limit! - Math.abs(account.balance)).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                )}
              </div>
            </div>
            {account.type === "Credit Card" && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Credit Utilization</span>
                  <span>{account.utilization}%</span>
                </div>
                <Progress
                  value={account.utilization!}
                  className="h-2"
                  style={{
                    background: "linear-gradient(to right, hsl(199, 89%, 64%), hsl(190, 90%, 50%))",
                    backgroundSize: `${account.utilization}% 100%`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

