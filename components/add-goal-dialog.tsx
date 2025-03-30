"use client"

import { useState } from "react"
import { Target, Landmark, Percent, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AddGoalDialogProps {
    onAddGoal: (goal: {
        name: string
        target: number
        date: string
        current: number
        interestRate: number
        category: string
        isRecurring: boolean
        priority: number
    }) => void
}

export function AddGoalDialog({ onAddGoal }: AddGoalDialogProps) {
    const [open, setOpen] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [goalName, setGoalName] = useState("")
    const [goalAmount, setGoalAmount] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [initialDeposit, setInitialDeposit] = useState("")
    const [interestRate, setInterestRate] = useState("0")
    const [goalCategory, setGoalCategory] = useState("")
    const [isRecurring, setIsRecurring] = useState(false)
    const [priority, setPriority] = useState(50)

    const checkFeasibility = async () => {
        try {
            const response = await fetch('/api/goal-feasibility', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetAmount: parseFloat(goalAmount),
                    initialDeposit: parseFloat(initialDeposit) || 0,
                    interestRate: parseFloat(interestRate),
                    monthYear: `${selectedMonth} ${selectedYear}`
                }),
            })

            const data = await response.json()
            return data.feasibility === 'feasible'
        } catch (error) {
            console.error('Error checking goal feasibility:', error)
            return false
        }
    }

    const handleSubmit = async () => {
        if (!selectedYear || !selectedMonth) return

        const isFeasible = await checkFeasibility()

        if (!isFeasible) {
            setShowWarning(true)
            return
        }

        onAddGoal({
            name: goalName,
            target: parseFloat(goalAmount),
            date: `${selectedMonth} ${selectedYear}`,
            current: parseFloat(initialDeposit) || 0,
            interestRate: parseFloat(interestRate),
            category: goalCategory,
            isRecurring,
            priority
        })

        resetForm()
        setOpen(false)
    }

    const resetForm = () => {
        setGoalName("")
        setGoalAmount("")
        setSelectedYear("")
        setSelectedMonth("")
        setInitialDeposit("")
        setInterestRate("0")
        setGoalCategory("")
        setIsRecurring(false)
        setPriority(50)
        setShowWarning(false)
    }

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString())
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const goalCategories = [
        { value: "home", label: "Home" },
        { value: "car", label: "Vehicle" },
        { value: "vacation", label: "Vacation" },
        { value: "education", label: "Education" },
        { value: "retirement", label: "Retirement" },
        { value: "emergency", label: "Emergency Fund" },
        { value: "other", label: "Other" },
    ]

    const priorityLabels = {
        0: "Low",
        50: "Medium",
        100: "High"
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Target className="mr-2 h-4 w-4" />
                    Add Goal
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-background text-foreground border-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Target className="mr-2 h-5 w-5 text-primary" />
                        Create New Financial Goal
                    </DialogTitle>
                    <DialogDescription>
                        Set up a new financial goal to track your progress toward what matters to you.
                    </DialogDescription>
                </DialogHeader>
                {showWarning && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            This goal may not be feasible with the current parameters. Please review your inputs and try again.
                        </AlertDescription>
                    </Alert>
                )}
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="goal-name">Goal Name</Label>
                        <Input
                            id="goal-name"
                            placeholder="e.g., Dream Vacation, New Car"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="goal-category">Category</Label>
                        <Select value={goalCategory} onValueChange={setGoalCategory}>
                            <SelectTrigger id="goal-category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {goalCategories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="goal-amount">Target Amount ($)</Label>
                            <Input
                                id="goal-amount"
                                placeholder="5,000"
                                type="number"
                                min="0"
                                value={goalAmount}
                                onChange={(e) => setGoalAmount(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label htmlFor="goal-month">Month</Label>
                                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                    <SelectTrigger id="goal-month">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map((month) => (
                                            <SelectItem key={month} value={month}>
                                                {month}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="goal-year">Year</Label>
                                <Select value={selectedYear} onValueChange={setSelectedYear}>
                                    <SelectTrigger id="goal-year">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="initial-deposit">
                                Initial Deposit ($)
                            </Label>
                            <div className="flex items-center">
                                <Landmark className="mr-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="initial-deposit"
                                    placeholder="0"
                                    type="number"
                                    min="0"
                                    value={initialDeposit}
                                    onChange={(e) => setInitialDeposit(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="interest-rate">
                                Interest Rate (%)
                            </Label>
                            <div className="flex items-center">
                                <Percent className="mr-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="interest-rate"
                                    placeholder="0.0"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="priority">Priority Level</Label>
                        <div className="grid grid-cols-[1fr_auto] gap-2">
                            <Slider
                                id="priority"
                                defaultValue={[50]}
                                max={100}
                                step={50}
                                value={[priority]}
                                onValueChange={(value) => setPriority(value[0])}
                                className="mt-2"
                            />
                            <span className="w-16 text-center text-sm font-medium">
                                {priorityLabels[priority as keyof typeof priorityLabels]}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Switch
                            id="recurring"
                            checked={isRecurring}
                            onCheckedChange={setIsRecurring}
                        />
                        <Label htmlFor="recurring">Set up recurring contributions</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={!goalName || !goalAmount || !selectedYear || !selectedMonth}>Create Goal</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 