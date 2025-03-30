'use client'

import { Check, Clock, Award, CreditCard, Coins, TrendingUp, HeartHandshake, Ban } from "lucide-react"
import { useState } from "react"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FinancialStrategy() {
    const [currentStage, setCurrentStage] = useState(1)
    const [selectedStage, setSelectedStage] = useState(1)

    // Financial strategy stages
    const stages = [
        {
            id: 1,
            title: "Building Foundation",
            subtitle: "Start strong, start smart",
            description: "Create financial safety net & establish good credit",
            completed: false,
            current: true,
            icon: <Coins className="h-5 w-5" />,
            fundData: [
                { name: "Emergency Fund", target: 5000, current: 1000 },
                { name: "Checking", target: 1500, current: 1500 },
                { name: "Savings", target: 3000, current: 500 },
            ],
            creditCards: [
                {
                    name: "Chase Freedom Student",
                    perks: ["No annual fee", "1% cash back", "For students"],
                    image: "/api/placeholder/300/180"
                },
                {
                    name: "Discover it® Student",
                    perks: ["No annual fee", "5% rotating categories", "Cashback match first year"],
                    image: "/api/placeholder/300/180"
                }
            ],
            tips: [
                "Start with 1 month of expenses in emergency fund",
                "Pay off credit cards in full monthly",
                "Set up automatic savings transfers on payday"
            ]
        },
        {
            id: 2,
            title: "Removing Debt",
            subtitle: "Break free from burdens",
            description: "Create a strategy to eliminate debt",
            completed: false,
            icon: <Ban className="h-5 w-5" />,
            debts: [
                { name: "Credit Card", balance: 3500, interestRate: 18.99, payment: 100, priority: 1 },
                { name: "Student Loan", balance: 15000, interestRate: 5.8, payment: 200, priority: 2 },
                { name: "Car Loan", balance: 9000, interestRate: 4.5, payment: 350, priority: 3 },
            ],
            debtDistribution: [
                { name: "Credit Card", value: 3500, fill: "#ff8c00" },
                { name: "Student Loan", value: 15000, fill: "#8884d8" },
                { name: "Car Loan", value: 9000, fill: "#82ca9d" },
            ],
            payoffData: [
                { name: "$0 Extra", months: 42, interest: 3900 },
                { name: "$50 Extra", months: 27, interest: 2400 },
                { name: "$100 Extra", months: 20, interest: 1800 },
                { name: "$200 Extra", months: 13, interest: 1200 },
            ],
            tips: [
                "Pay minimums on all debts",
                "Focus extra on highest-interest debt",
                "Avoid taking on new debt"
            ]
        },
        {
            id: 3,
            title: "Investing Future",
            subtitle: "Grow your wealth",
            description: "Build wealth through strategic investments",
            completed: false,
            icon: <TrendingUp className="h-5 w-5" />,
            allocationData: [
                { name: "Stocks (70%)", value: 70, fill: "#8884d8" },
                { name: "Bonds (20%)", value: 20, fill: "#82ca9d" },
                { name: "Cash (10%)", value: 10, fill: "#ffc658" }
            ],
            growthData: [
                { year: 0, value: 0 },
                { year: 5, value: 38600 },
                { year: 10, value: 91400 },
                { year: 15, value: 163400 },
                { year: 20, value: 262900 },
                { year: 25, value: 401300 },
                { year: 30, value: 599800 },
            ],
            compareData: [
                { amount: "$100/mo", years10: 17300, years20: 49400, years30: 113600 },
                { amount: "$300/mo", years10: 51900, years20: 148200, years30: 340800 },
                { amount: "$500/mo", years10: 86500, years20: 247000, years30: 568000 },
            ],
            tips: [
                "Start early to benefit from compound growth",
                "Diversify across different asset classes",
                "Focus on low-fee investments"
            ]
        },
        {
            id: 4,
            title: "Comfortable Life",
            subtitle: "Enjoy the rewards",
            description: "Optimize finances to enjoy life now and later",
            completed: false,
            icon: <HeartHandshake className="h-5 w-5" />,
            progressData: [
                { name: "Roth IRA", target: 6500, current: 2000 },
                { name: "Taxes Paid", target: 12500, current: 7500 },
                { name: "Vacation Fund", target: 3000, current: 1500 },
                { name: "Giving", target: 5000, current: 750 },
            ],
            milestoneData: [
                { category: "Home", timeline: "5-7 yrs", complete: 30, milestones: 3 },
                { category: "Retirement", timeline: "25 yrs", complete: 15, milestones: 3 },
                { category: "Travel", timeline: "Ongoing", complete: 40, milestones: 3 },
            ],
            spendingData: [
                { name: "Housing", value: 40 },
                { name: "Food", value: 15 },
                { name: "Transport", value: 10 },
                { name: "Savings", value: 20 },
                { name: "Other", value: 15 },
            ],
            tips: [
                "Balance living well today with saving for tomorrow",
                "Review financial plan annually and adjust",
                "Keep learning about personal finance"
            ]
        }
    ]

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

    return (
        <Card className="col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Your Financial Journey</CardTitle>
                        <CardDescription>A 4-step path to financial freedom</CardDescription>
                    </div>
                    <Award className="h-8 w-8 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                {/* Roadmap visualization */}
                <div className="mb-6">
                    <div className="relative mb-2">
                        <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2 bg-muted rounded-full" />
                        <div className="relative flex justify-between">
                            {stages.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => setSelectedStage(stage.id)}
                                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors
                    ${selectedStage === stage.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
                    ${stage.completed ? "border-primary bg-primary text-primary-foreground" :
                                            stage.id === currentStage ? "border-primary bg-primary/20 text-primary" :
                                                "border-muted bg-card text-muted-foreground"}`}
                                >
                                    {stage.completed ? <Check className="h-5 w-5" /> : stage.icon || stage.id}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between px-1 text-xs text-muted-foreground">
                        {stages.map((stage) => (
                            <div key={stage.id} className={`w-24 truncate text-center ${selectedStage === stage.id ? "text-primary font-medium" : ""}`}>
                                {stage.title}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected stage details */}
                <div className="bg-card/50 border rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                {stages[selectedStage - 1].icon}
                                {stages[selectedStage - 1].title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{stages[selectedStage - 1].description}</p>
                        </div>
                        <Badge
                            className={`${selectedStage === currentStage ? "bg-blue-500/10 text-blue-500" : "bg-amber-500/10 text-amber-500"
                                }`}
                        >
                            {selectedStage === currentStage ? "In Progress" : "Future Stage"}
                        </Badge>
                    </div>

                    {/* Stage 1: Financial Foundation */}
                    {selectedStage === 1 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium mb-3">Financial Goals Progress</h4>
                                    {stages[0].fundData.map((item, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm">{item.name}</span>
                                                <span className="text-xs text-muted-foreground">${item.current.toLocaleString()} / ${item.target.toLocaleString()}</span>
                                            </div>
                                            <Progress value={(item.current / item.target) * 100} className="h-2" />
                                        </div>
                                    ))}

                                    <h4 className="text-sm font-medium mt-6 mb-2">Pro Tips</h4>
                                    <ul className="text-xs space-y-1 ml-5 list-disc">
                                        {stages[0].tips.map((tip, i) => (
                                            <li key={i}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3">Recommended Credit Cards (20-30yr)</h4>
                                    <div className="space-y-3">
                                        {stages[0].creditCards.map((card, index) => (
                                            <div key={index} className="border rounded-lg p-3 bg-card flex items-start gap-3">
                                                <div className="w-16 h-10 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                                                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-sm">{card.name}</h5>
                                                    <ul className="text-xs mt-1">
                                                        {card.perks.map((perk, i) => (
                                                            <li key={i} className="flex items-center">
                                                                <div className="h-1 w-1 bg-primary rounded-full mr-1.5"></div>
                                                                {perk}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border p-3 bg-primary/5 mt-3">
                                <h4 className="text-sm font-medium mb-2">Building a Strong Foundation</h4>
                                <p className="text-xs">Focus on creating an emergency fund covering 3-6 months of expenses, opening no-fee checking and savings accounts, and establishing good credit with your first credit card. When applying for credit, consider student cards that offer cash back with no annual fees.</p>
                            </div>
                        </div>
                    )}

                    {/* Stage 2: Removing Debt */}
                    {selectedStage === 2 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium mb-3">Your Debt Breakdown</h4>
                                    <div className="h-[200px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={stages[1].debtDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {stages[1].debtDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <h4 className="text-sm font-medium mt-2 mb-2">Debt Payoff Priority</h4>
                                    {stages[1].debts.map((debt, index) => (
                                        <div key={index} className="flex items-center justify-between text-xs mb-2">
                                            <div className="flex items-center">
                                                <Badge variant={index === 0 ? "default" : "outline"} className="mr-2">
                                                    {index + 1}
                                                </Badge>
                                                <span>{debt.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <div>${debt.balance.toLocaleString()}</div>
                                                <div className="text-muted-foreground">{debt.interestRate}% APR</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3">Extra Payment Impact (Credit Card)</h4>
                                    <div className="h-[180px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={stages[1].payoffData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis yAxisId="left" orientation="left" label={{ value: 'Months', angle: -90, position: 'insideLeft' }} />
                                                <YAxis yAxisId="right" orientation="right" label={{ value: 'Interest ($)', angle: 90, position: 'insideRight' }} />
                                                <Tooltip />
                                                <Bar yAxisId="left" dataKey="months" fill="#8884d8" name="Months to payoff" />
                                                <Bar yAxisId="right" dataKey="interest" fill="#82ca9d" name="Interest paid ($)" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <h4 className="text-sm font-medium mt-6 mb-2">Pro Tips</h4>
                                    <ul className="text-xs space-y-1 ml-5 list-disc">
                                        {stages[1].tips.map((tip, i) => (
                                            <li key={i}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="rounded-lg border p-3 bg-primary/5 mt-3">
                                <h4 className="text-sm font-medium mb-2">Debt Freedom Strategy</h4>
                                <p className="text-xs">Focus on high-interest debt first (Avalanche Method) to minimize interest or smallest balance first (Snowball Method) for psychological wins. Adding just $100 extra monthly to your credit card payment can cut payoff time in half and save hundreds in interest.</p>
                            </div>
                        </div>
                    )}

                    {/* Stage 3: Investing for the Future */}
                    {selectedStage === 3 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium mb-3">Recommended Asset Allocation</h4>
                                    <div className="h-[200px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={stages[2].allocationData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}`}
                                                >
                                                    {stages[2].allocationData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `${value}%`} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <h4 className="text-sm font-medium mt-2 mb-2">Investment Growth Comparison</h4>
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                        {stages[2].compareData.map((item, index) => (
                                            <div key={index} className="border rounded-md p-2">
                                                <div className="font-medium">{item.amount}</div>
                                                <div><span className="text-muted-foreground">10yr:</span> ${(item.years10 / 1000).toFixed(1)}k</div>
                                                <div><span className="text-muted-foreground">20yr:</span> ${(item.years20 / 1000).toFixed(1)}k</div>
                                                <div><span className="text-muted-foreground">30yr:</span> ${(item.years30 / 1000).toFixed(1)}k</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3">Investment Growth Projection</h4>
                                    <div className="h-[180px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={stages[2].growthData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                                                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Portfolio Value" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <h4 className="text-sm font-medium mt-6 mb-2">Pro Tips</h4>
                                    <ul className="text-xs space-y-1 ml-5 list-disc">
                                        {stages[2].tips.map((tip, i) => (
                                            <li key={i}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="rounded-lg border p-3 bg-primary/5 mt-3">
                                <h4 className="text-sm font-medium mb-2">Investment Strategy</h4>
                                <p className="text-xs">Start with tax-advantaged accounts like 401(k)s and IRAs. For most young investors, a portfolio weighted toward stock index funds provides the best long-term growth potential. The power of compounding means that starting early, even with small amounts, can lead to significant wealth over time.</p>
                            </div>
                        </div>
                    )}

                    {/* Stage 4: Living a Comfortable Life */}
                    {selectedStage === 4 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium mb-3">Financial Goals Progress</h4>
                                    {stages[3].progressData.map((item, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm">{item.name}</span>
                                                <span className="text-xs text-muted-foreground">${item.current.toLocaleString()} / ${item.target.toLocaleString()}</span>
                                            </div>
                                            <Progress value={(item.current / item.target) * 100} className="h-2" />
                                        </div>
                                    ))}

                                    <h4 className="text-sm font-medium mt-4 mb-2">Life Milestones</h4>
                                    {stages[3].milestoneData.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between text-xs mb-2 border-b pb-2">
                                            <div>
                                                <div className="font-medium">{item.category}</div>
                                                <div className="text-muted-foreground">{item.timeline}</div>
                                            </div>
                                            <div className="w-24">
                                                <Progress value={item.complete} className="h-1.5 mb-1" />
                                                <div className="text-right text-muted-foreground">{item.complete}% complete</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3">Recommended Spending</h4>
                                    <div className="h-[200px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={stages[3].spendingData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {stages[3].spendingData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `${value}%`} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <h4 className="text-sm font-medium mt-4 mb-2">Pro Tips</h4>
                                    <ul className="text-xs space-y-1 ml-5 list-disc">
                                        {stages[3].tips.map((tip, i) => (
                                            <li key={i}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="rounded-lg border p-3 bg-primary/5 mt-3">
                                <h4 className="text-sm font-medium mb-2">Balanced Living Strategy</h4>
                                <p className="text-xs">The ultimate goal is to live well while securing your future. Max out tax-advantaged accounts like Roth IRAs and HSAs, keep major expenses (housing, transportation) reasonable, and build separate funds for short-term goals like travel. Remember that financial planning is a tool for a better life, not an end in itself.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStage(Math.max(1, selectedStage - 1))}
                        disabled={selectedStage === 1}
                    >
                        Previous Step
                    </Button>
                    <Button
                        variant={selectedStage < currentStage ? "outline" : "default"}
                        size="sm"
                        onClick={() => setSelectedStage(Math.min(4, selectedStage + 1))}
                        disabled={selectedStage === 4}
                    >
                        Next Step
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}