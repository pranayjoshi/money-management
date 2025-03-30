"use client"

import { useState } from "react"
import { Bot, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function AIInvestmentSuggestions() {
  const [loading, setLoading] = useState(false)

  // Mock data for investment suggestions
  const suggestions = [
    { category: "Stocks", percentage: 40, description: "Focus on blue-chip and growth stocks" },
    { category: "ETFs", percentage: 30, description: "Index funds for diversification" },
    { category: "Bonds", percentage: 15, description: "Government and corporate bonds" },
    { category: "Crypto", percentage: 10, description: "Limited exposure to established cryptocurrencies" },
    // { category: "Cash", percentage: 5, description: "Emergency liquidity" },
  ]

  const handleRefresh = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {suggestions.map((item) => (
          <Card key={item.category} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{item.category}</span>
                <span className="text-primary font-medium">{item.percentage}%</span>
              </div>
              <Progress
                value={item.percentage}
                className="h-2 mb-2"
                style={{
                  background: "linear-gradient(to right, hsl(199, 89%, 64%), hsl(190, 90%, 50%))",
                  backgroundSize: `${item.percentage}% 100%`,
                  backgroundRepeat: "no-repeat",
                }}
              />
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-xs text-muted-foreground mt-4 pt-2 border-t">
        <p>
          These suggestions are based on your age, income, goals, and risk tolerance. Adjust your risk profile in
          settings for different recommendations.
        </p>
      </div>
    </div>
  )
}

