import type { Metadata } from "next"
import { Bell, CreditCard, DollarSign, Home, LineChart, PieChart, Settings, User } from "lucide-react"
import Link from "next/link"
import "@/styles/globals.css"

// import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Money Management Dashboard",
  description: "A personal finance dashboard for managing your money",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <div className="hidden w-64 flex-col border-r bg-card p-6 md:flex">
          <div className="flex items-center gap-2 pb-6">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MoneyMate</span>
          </div>
          <nav className="flex flex-1 flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-colors hover:text-primary"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <PieChart className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="/strategy"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <LineChart className="h-5 w-5" />
              Strategy
            </Link>
            <Link
              href="/details"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <CreditCard className="h-5 w-5" />
              Personal Details
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b px-6">
            <h1 className="text-xl font-semibold md:hidden">MoneyMate</h1>
            <div className="ml-auto flex items-center gap-4">
              <button className="rounded-full bg-background p-2 text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium">Alex Johnson</span>
              </div>
            </div>
          </header>

          {/* Dynamic Content */}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}