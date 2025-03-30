import type { Metadata } from "next"
import Link from "next/link"
import { Bell, CreditCard, DollarSign, Home, PieChart, Settings, User } from "lucide-react"

import AnalyticsContent from "@/components/analytics-content"

export const metadata: Metadata = {
  title: "Analytics | Money Management Dashboard",
  description: "Detailed analytics for your personal finances",
}

export default function AnalyticsPage() {
  return (
    <AnalyticsContent />
  )
}

