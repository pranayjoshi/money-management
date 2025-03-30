interface EmergencyFundFactors {
    age: number;
    monthlyIncome: number;
    incomeStability: "stable" | "unstable";
    monthlyExpenditure: number;
    dependents: number;
    medicalCondition: 1 | 2 | 3 | 4 | 5; // 1 = No medical requirements, 5 = Severe medical requirements
  }
  
  function calculateEmergencyFund(factors: EmergencyFundFactors): number {
    let baseFund = 3; // 3 months of expenses
  
    // Income Stability Adjustment
    if (factors.incomeStability === "unstable") {
      baseFund += 3; // Add 3 more months
    }
  
    // Dependents Adjustment
    if (factors.dependents > 0) {
      baseFund += Math.min(6, factors.dependents * 2); // Add up to 6 months max
    }
  
    // Medical Adjustment (scaled from 1 to 5)
    baseFund += (factors.medicalCondition - 1) * 1.5; // Adds up to 6 months max
  
    return Math.ceil(baseFund * factors.monthlyExpenditure);
  }
  
  // Example Usage
  const userFactors: EmergencyFundFactors = {
    age: 30,
    monthlyIncome: 5000,
    incomeStability: "unstable",
    monthlyExpenditure: 2000,
    dependents: 2,
    medicalCondition: 3
  };
  
  console.log("Emergency Fund Required: $", calculateEmergencyFund(userFactors));
  