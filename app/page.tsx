import type { Metadata } from "next"
import Link from "next/link"
import { Bell, CreditCard, DollarSign, Home, PieChart, Settings, User } from "lucide-react"

import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "Money Management Dashboard",
  description: "A personal finance dashboard for managing your money",
}

export default function Page() {
  return (
    
    <Dashboard />

  )
}

