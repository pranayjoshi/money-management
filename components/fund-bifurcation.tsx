"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { getEmergencyFund } from "@/lib/emergency";
import { db } from "@/lib/firebaseConfig";
import { getRiskFactor } from "@/lib/risk";
import { doc, getDoc } from "firebase/firestore";
import { use, useEffect, useState } from "react";
import { set } from "date-fns";

export function FundBifurcation() {
  const [greeting, setGreeting] = useState("Good afternoon")
    const [emergencyFundValue, setEmergencyFundValue] = useState<number | null>(null);
    const [riskFactorValue, setRiskFactorValue] = useState<number | null>(null);
    const [savingAccountValue, setSavingAccountValue] = useState<number | null>(null);
    const [checkingAccountValue, setCheckingAccountValue] = useState<number | null>(null);
    const [investmentValue, setInvestmentValue] = useState<number | null>(null);
    const [goalsCommitmentValue, setGoalsCommitmentValue] = useState<number | null>(null);
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    const [investmentsPercentage, setInvestmentsPercentage] = useState<number | null>(null);
    const [goalsCommitmentPercentage, setGoalsCommitmentPercentage] = useState<number | null>(null);
    const [emergencyFundPercentage, setEmergencyFundPercentage] = useState<number | null>(null);
    const [checkingPercentage, setCheckingPercentage] = useState<number | null>(null);
    const [savingsPercentage, setSavingsPercentage] = useState<number | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", "userId");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const riskFactor = userData.riskFactor;
            const savingsRiskFactor = userData.savingsRiskFactor;
            const totalAmount = userData.annualizedIncome - userData.checkingAmount
            setInvestmentsPercentage(userData.investmentsPercentage)
            setInvestmentValue(userData.investmentsPercentage * (totalAmount - 4700) / 100)
            const savingsAmount = totalAmount - (userData.investmentsPercentage * totalAmount / 100) - 4700
            setEmergencyFundValue(userData.emergencyFund)
            setRiskFactorValue(riskFactor)
            setCheckingAccountValue(userData.checkingAmount)
            setSavingAccountValue(savingsAmount)
            setGoalsCommitmentValue(4700)
            setGoalsCommitmentPercentage(4700 / totalAmount * 100)
            setEmergencyFundPercentage(userData.emergencyFund / totalAmount * 100)
            setCheckingPercentage(userData.checkingAmount / totalAmount * 100)
            setSavingsPercentage(savingsAmount / totalAmount * 100)
            setTotalAmount(totalAmount)

            

        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error checking and running command:", error);
    }
    }
    fetchData();

  }, []);
  // Replace the hardcoded data array with this:
  const data = [
    {
      name: "Emergency Fund",
      value: Math.round(emergencyFundValue || 0),
      percentage: Math.round(emergencyFundPercentage || 0),
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Savings Account",
      value: Math.round(savingAccountValue || 0),
      percentage: Math.round(savingsPercentage || 0),
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Checking Account",
      value: Math.round(checkingAccountValue || 0),
      percentage: Math.round(checkingPercentage || 0),
      color: "hsl(var(--chart-3))",
    },
    {
      name: "Goals Commitment",
      value: Math.round(goalsCommitmentValue || 0),
      percentage: Math.round(goalsCommitmentPercentage || 0),
      color: "hsl(var(--chart-4))",
    },
    {
      name: "Investments",
      value: Math.round(investmentValue || 0),
      percentage: Math.round(investmentsPercentage || 0),
      color: "hsl(var(--chart-5))",
    },
  ];

  const totalFunds = data.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border rounded-md shadow-md">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-primary text-sm">
            ${data.value.toLocaleString()}{" "}
            <span className="text-muted-foreground">({data.percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label for bars
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const item = data[index];

    return (
      <g>
        <text
          x={x + width - 5}
          y={y + 10}
          fill="#fff"
          textAnchor="end"
          dominantBaseline="middle"
          className="text-xs font-medium"
        >
          ${value.toLocaleString()}
        </text>
        <text
          x={x + width - 5}
          y={y + 25}
          fill="#fff"
          textAnchor="end"
          dominantBaseline="middle"
          className="text-xs opacity-80"
        >
          {item.percentage}%
        </text>
      </g>
    );
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Fund Bifurcation</CardTitle>
        <CardDescription>Distribution of your total assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ChartContainer
            config={{
              emergency: {
                label: "Emergency Fund",
                color: "hsl(var(--chart-1))",
              },
              savings: {
                label: "Savings Account",
                color: "hsl(var(--chart-2))",
              },
              checking: {
                label: "Checking Account",
                color: "hsl(var(--chart-3))",
              },
              goals: {
                label: "Goals Commitment",
                color: "hsl(var(--chart-4))",
              },
              investments: {
                label: "Investments",
                color: "hsl(var(--chart-5))",
              },
            }}
          >
            <ResponsiveContainer width="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={4} barSize={30}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="value" content={renderCustomizedLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
