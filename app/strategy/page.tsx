import type { Metadata } from "next"
import Link from "next/link"
import { Bell, CreditCard, DollarSign, Home, PieChart, Settings, User, Target } from "lucide-react"
import { FinancialStrategy } from "@/components/financial-strategy-updated"

export const metadata: Metadata = {
    title: "Financial Strategy - MoneyMate",
    description: "Your 5-step journey to financial freedom",
}

export default function StrategyPage() {
    return <FinancialStrategy />
}