"use client"

import { useState } from "react"
import { Save, Plus, User, DollarSign, TrendingUp, HeartPulse, Users, Goal, BanknoteIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

export default function PersonalDetails() {
  const [goals, setGoals] = useState([
    { name: "Emergency Fund", target: 10000, timeframe: "1 year" }
  ]);
  const [newGoal, setNewGoal] = useState({ name: "", target: "", timeframe: "" });
  
  // Calculate income stability score based on job type
  const calculateStabilityScore = (jobType) => {
    const scores = {
      "full-time-permanent": 5,
      "full-time-contract": 4,
      "part-time-permanent": 3,
      "part-time-contract": 2,
      "self-employed": 3,
      "freelance": 2,
      "unemployed": 1
    };
    return scores[jobType] || 3;
  };

  // Calculate savings rate
  const calculateSavings = (income, expenditure) => {
    const monthlyIncome = income;
    const savings = monthlyIncome - expenditure;
    const savingsRate = (savings / monthlyIncome) * 100;
    return {
      monthly: savings,
      rate: savingsRate.toFixed(1)
    };
  };

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    age: z.coerce.number().min(18, { message: "Must be at least 18 years old." }),
    incomeType: z.enum(["monthly", "annual"]),
    income: z.coerce.number().min(1, { message: "Income must be greater than 0." }),
    jobType: z.string(),
    monthlyExpenditure: z.coerce.number().min(0, { message: "Expenditure cannot be negative." }),
    dependants: z.object({
      spouse: z.boolean().default(false),
      children: z.coerce.number().min(0),
      parents: z.coerce.number().min(0),
      grandparents: z.coerce.number().min(0),
      other: z.coerce.number().min(0),
    }),
    debts: z.array(z.object({
      type: z.string(),
      amount: z.coerce.number(),
      interestRate: z.coerce.number(),
    })).default([]),
    medicalConditions: z.string().optional(),
    allergies: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 30,
      incomeType: "monthly",
      income: 0,
      jobType: "full-time-permanent",
      monthlyExpenditure: 0,
      dependants: {
        spouse: false,
        children: 0,
        parents: 0,
        grandparents: 0,
        other: 0,
      },
      debts: [{ type: "Student Loan", amount: 0, interestRate: 0 }],
      medicalConditions: "",
      allergies: "",
    },
  });

  const [annualizedIncome, setAnnualizedIncome] = useState(0);
  const [savingsInfo, setSavingsInfo] = useState({ monthly: 0, rate: "0.0" });
  const [stabilityScore, setStabilityScore] = useState(5);

  function onSubmit(data) {
    // Calculate annualized income
    const annual = data.incomeType === "monthly" ? data.income * 12 : data.income;
    setAnnualizedIncome(annual);
    
    // Calculate monthly income for savings calculation
    const monthlyIncome = data.incomeType === "monthly" ? data.income : data.income / 12;
    const savings = calculateSavings(monthlyIncome, data.monthlyExpenditure);
    setSavingsInfo(savings);
    
    // Calculate stability score
    const stability = calculateStabilityScore(data.jobType);
    setStabilityScore(stability);
    
    // In a real app, you would send this data to your backend
    toast({
      title: "Profile updated",
      description: "Your personal details have been saved successfully.",
    });
    
    console.log({
      ...data,
      annualizedIncome: annual,
      savingsRate: savings.rate,
      stabilityScore: stability,
      financialGoals: goals
    });
  }

  const addGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.timeframe) {
      setGoals([...goals, { 
        name: newGoal.name, 
        target: parseFloat(newGoal.target), 
        timeframe: newGoal.timeframe 
      }]);
      setNewGoal({ name: "", target: "", timeframe: "" });
    }
  };

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value
    });
  };

  return (
    <div className="flex-1 space-y-6 overflow-auto p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Personal Financial Profile</h2>
          <p className="text-muted-foreground">Complete your profile to get personalized financial insights.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">
                <User className="mr-2 h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="income">
                <DollarSign className="mr-2 h-4 w-4" />
                Income
              </TabsTrigger>
              <TabsTrigger value="dependants">
                <Users className="mr-2 h-4 w-4" />
                Dependants
              </TabsTrigger>
              <TabsTrigger value="debts">
                <BanknoteIcon className="mr-2 h-4 w-4" />
                Debts
              </TabsTrigger>
              <TabsTrigger value="medical">
                <HeartPulse className="mr-2 h-4 w-4" />
                Medical
              </TabsTrigger>
            </TabsList>
            
            {/* Personal Tab */}
            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                  <CardDescription>Enter your basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Income Tab */}
            <TabsContent value="income" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Income & Expenses</CardTitle>
                  <CardDescription>Your financial information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <FormField
                      control={form.control}
                      name="incomeType"
                      render={({ field }) => (
                        <FormItem className="w-full md:w-1/3">
                          <FormLabel>Income Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="monthly" />
                                <Label htmlFor="monthly">Monthly</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="annual" id="annual" />
                                <Label htmlFor="annual">Annual</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="income"
                      render={({ field }) => (
                        <FormItem className="w-full md:w-2/3">
                          <FormLabel>Income Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input type="number" className="pl-8" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            {form.watch("incomeType") === "monthly" 
                              ? "Your monthly income before taxes" 
                              : "Your annual income before taxes"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full-time-permanent">Full-time (Permanent)</SelectItem>
                            <SelectItem value="full-time-contract">Full-time (Contract)</SelectItem>
                            <SelectItem value="part-time-permanent">Part-time (Permanent)</SelectItem>
                            <SelectItem value="part-time-contract">Part-time (Contract)</SelectItem>
                            <SelectItem value="self-employed">Self-employed</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Your employment type affects income stability calculations
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="monthlyExpenditure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Expenditure</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="number" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your average monthly expenses
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  {annualizedIncome > 0 && (
                    <div className="w-full space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Annual Income</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              ${annualizedIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              ${savingsInfo.monthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {savingsInfo.rate}% of income
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Income Stability</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {stabilityScore}/5
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {stabilityScore >= 4 ? "Very Stable" : 
                               stabilityScore >= 3 ? "Stable" : 
                               stabilityScore >= 2 ? "Moderate" : "Unstable"}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Dependants Tab */}
            <TabsContent value="dependants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dependants</CardTitle>
                  <CardDescription>People who depend on your financial support</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="spouse"
                      checked={form.watch("dependants.spouse")}
                      onChange={(e) => form.setValue("dependants.spouse", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="spouse">Spouse</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="dependants.children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Children</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dependants.parents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parents</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dependants.grandparents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grandparents</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dependants.other"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Dependants</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Debts Tab */}
            <TabsContent value="debts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Debts & Loans</CardTitle>
                  <CardDescription>Your current financial obligations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {form.watch("debts").map((debt, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3">
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          value={debt.type}
                          onValueChange={(value) => {
                            const newDebts = [...form.watch("debts")];
                            newDebts[index].type = value;
                            form.setValue("debts", newDebts);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Student Loan">Student Loan</SelectItem>
                            <SelectItem value="Mortgage">Mortgage</SelectItem>
                            <SelectItem value="Car Loan">Car Loan</SelectItem>
                            <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                            <SelectItem value="Credit Card">Credit Card</SelectItem>
                            <SelectItem value="Medical Debt">Medical Debt</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            className="pl-8"
                            value={debt.amount}
                            onChange={(e) => {
                              const newDebts = [...form.watch("debts")];
                              newDebts[index].amount = parseFloat(e.target.value);
                              form.setValue("debts", newDebts);
                            }}
                          />
                        </div>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Interest Rate (%)</FormLabel>
                        <Input
                          type="number"
                          value={debt.interestRate}
                          step="0.1"
                          onChange={(e) => {
                            const newDebts = [...form.watch("debts")];
                            newDebts[index].interestRate = parseFloat(e.target.value);
                            form.setValue("debts", newDebts);
                          }}
                        />
                      </FormItem>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newDebts = [...form.watch("debts"), { type: "Personal Loan", amount: 0, interestRate: 0 }];
                      form.setValue("debts", newDebts);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Debt
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Medical Tab */}
            <TabsContent value="medical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                  <CardDescription>Your health considerations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="medicalConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ongoing Medical Conditions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any ongoing medical conditions that may impact your finances"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This information helps in planning for medical expenses
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies or Disease Susceptibility</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any allergies or diseases you might be susceptible to"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Financial Goals Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Financial Goals</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                >
                  <Goal className="mr-2 h-4 w-4" />
                  Manage Goals
                </Button>
              </div>
              <CardDescription>Set your financial targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <h4 className="font-medium">{goal.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Target: ${goal.target.toLocaleString()} • Timeframe: {goal.timeframe}
                    </p>
                  </div>
                ))}
                
                <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="goalName">Goal Name</Label>
                    <Input
                      id="goalName"
                      name="name"
                      value={newGoal.name}
                      onChange={handleGoalChange}
                      placeholder="Retirement"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goalTarget">Target Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="goalTarget"
                        name="target"
                        value={newGoal.target}
                        onChange={handleGoalChange}
                        className="pl-8"
                        placeholder="500000"
                        type="number"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="goalTimeframe">Timeframe</Label>
                    <Input
                      id="goalTimeframe"
                      name="timeframe"
                      value={newGoal.timeframe}
                      onChange={handleGoalChange}
                      placeholder="20 years"
                    />
                  </div>
                </div>
                
                <Button
                  type="button" 
                  variant="outline"
                  onClick={addGoal}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Goal
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}