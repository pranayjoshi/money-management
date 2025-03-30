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
                { name: "Emergency Fund", target: 2000, current: 350 },
                { name: "Checking", target: 750, current: 400 },
                { name: "Savings", target: 1000, current: 200 },
            ],
            creditCards: [
                {
                    name: "Discover it® Student",
                    perks: ["No annual fee", "5% rotating categories", "Cashback match first year"],
                    image: "/api/placeholder/300/180"
                },
                {
                    name: "Chase Freedom Student",
                    perks: ["No annual fee", "1% cash back", "No credit history needed"],
                    image: "/api/placeholder/300/180"
                }
            ],
            tips: [
                "Start with just $500 in emergency fund",
                "Set up direct deposit for your paychecks",
                "Always pay cards in full to avoid interest"
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
                { name: "Credit Card", balance: 850, interestRate: 19.99, payment: 50, priority: 1 },
                { name: "Student Loan", balance: 12500, interestRate: 4.5, payment: 150, priority: 2 },
                { name: "Phone Payment", balance: 600, interestRate: 0, payment: 25, priority: 3 },
            ],
            debtDistribution: [
                { name: "Credit Card", value: 850, fill: "#ff8c00" },
                { name: "Student Loan", value: 12500, fill: "#8884d8" },
                { name: "Phone Payment", value: 600, fill: "#82ca9d" },
            ],
            payoffData: [
                { name: "$50 Min", months: 21, interest: 270 },
                { name: "$75 Extra", months: 12, interest: 150 },
                { name: "$100 Extra", months: 9, interest: 110 },
                { name: "$150 Extra", months: 6, interest: 75 },
            ],
            tips: [
                "Pay off high-interest credit card first",
                "Make at least minimum payments on all debts",
                "Consider income-based repayment for student loans"
            ]
        },
        {
            id: 3,
            title: "Investing Future",
            subtitle: "Start early, grow steadily",
            description: "Begin building wealth through smart investments",
            completed: false,
            icon: <TrendingUp className="h-5 w-5" />,
            allocationData: [
                { name: "Stocks (80%)", value: 80, fill: "#8884d8" },
                { name: "Bonds (10%)", value: 10, fill: "#82ca9d" },
                { name: "Cash (10%)", value: 10, fill: "#ffc658" }
            ],
            growthData: [
                { year: 0, value: 0 },
                { year: 5, value: 3600 },
                { year: 10, value: 9800 },
                { year: 15, value: 19500 },
                { year: 20, value: 34200 },
                { year: 25, value: 56300 },
                { year: 30, value: 89700 },
                { year: 40, value: 228600 },
            ],
            compareData: [
                { amount: "$50/mo", years10: 8600, years20: 24700, years30: 56800 },
                { amount: "$100/mo", years10: 17300, years20: 49400, years30: 113600 },
                { amount: "$200/mo", years10: 34600, years20: 98800, years30: 227200 },
            ],
            tips: [
                "Start with just $25-50/month in investments",
                "Use your employer's 401(k) match if available",
                "Consider a Roth IRA for tax-free growth"
            ]
        },
        {
            id: 4,
            title: "Comfortable Life",
            subtitle: "Balance today and tomorrow",
            description: "Live well while building for the future",
            completed: false,
            icon: <HeartHandshake className="h-5 w-5" />,
            progressData: [
                { name: "Roth IRA", target: 3000, current: 500 },
                { name: "Taxes Saved", target: 1200, current: 300 },
                { name: "Travel Fund", target: 1500, current: 200 },
                { name: "Education", target: 1000, current: 150 },
            ],
            milestoneData: [
                { category: "First Car", timeline: "1-2 yrs", complete: 25, milestones: 3 },
                { category: "Education", timeline: "2-4 yrs", complete: 15, milestones: 3 },
                { category: "Travel", timeline: "Ongoing", complete: 10, milestones: 3 },
            ],
            spendingData: [
                { name: "Housing", value: 30 },
                { name: "Food", value: 15 },
                { name: "Transport", value: 10 },
                { name: "Savings", value: 15 },
                { name: "Education", value: 15 },
                { name: "Fun", value: 15 },
            ],
            tips: [
                "Build the 50/30/20 budget (needs/wants/savings)",
                "Allow yourself small rewards for financial wins",
                "Use apps to automate savings and track spending"
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
                                    <h4 className="text-sm font-medium mb-3">Recommended First Credit Cards</h4>
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
                                <h4 className="text-sm font-medium mb-2">Building Your First Financial Foundation</h4>
                                <p className="text-xs">At 21, focus on starting small but consistent. Aim for a $500-1000 emergency fund first, open a free checking account for direct deposits, and apply for a student credit card to build credit. Use the card for small purchases and pay it off in full each month to avoid interest and build a positive credit history.</p>
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
                                <h4 className="text-sm font-medium mb-2">Smart Debt Management for Young Adults</h4>
                                <p className="text-xs">Focus on keeping credit card balances low or zero to avoid high interest. For student loans, understand your grace period and repayment options. Even paying just $25 extra per month on your credit card can cut months off your payoff time and save on interest. Avoid taking on new debt while paying off existing balances.</p>
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
                                <h4 className="text-sm font-medium mb-2">Early Investing Strategy</h4>
                                <p className="text-xs">Starting to invest at 21 gives you a tremendous advantage, even with small amounts. Begin with just $25-50 monthly in a simple index fund through a Roth IRA. If your employer offers 401(k) matching, contribute enough to get the full match—it's free money. Your greatest asset is time, so a higher allocation to stocks is appropriate at your age.</p>
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
                                <h4 className="text-sm font-medium mb-2">Balanced Living for Young Adults</h4>
                                <p className="text-xs">Financial success isn't just about saving—it's about living well while preparing for the future. Try the 50/30/20 budget: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Set up separate funds for goals like travel or education. Use budgeting apps to track spending, and automate savings to make good habits effortless.</p>
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