"use client";

import { CreditCard, Landmark, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { se } from "date-fns/locale";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export function BankAccountDetails() {
  const [savingAccountValue, setSavingAccountValue] = useState<number | null>(null);
  const [checkingAccountValue, setCheckingAccountValue] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", "userId");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dct = docSnap.data()
          setSavingAccountValue(dct.checkingAmount);
          setCheckingAccountValue(dct.annualizedIncome - dct.checkingAmount);
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    }
    fetchData();
  }, []);
  // Mock data for bank accounts
  const accounts = [
    {
      name: "Checking Account",
      type: "Checking Account",
      number: "**** 4321",
      balance: checkingAccountValue ?? 0,
      icon: <Wallet className="h-5 w-5 text-primary" />,
    },
    {
      name: "Savings Account",
      type: "Savings Account",
      number: "**** 8765",
      balance: savingAccountValue ?? 0,
      icon: <Landmark className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <Card key={account.name} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {/* Left Section: Account Details */}
              <div className="flex items-center gap-4">
                {account.icon}
                <div className="space-y-1">
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {account.number}
                  </p>
                  <p className="text-sm text-muted-foreground">{account.type}</p>
                </div>
              </div>

              {/* Right Section: Account Balance */}
              <div className="text-right">
                <div
                  className={`text-lg font-bold ${
                    account.balance < 0 ? "text-red-500" : "text-primary"
                  }`}
                >
                  $
                  {Math.abs(account.balance).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}