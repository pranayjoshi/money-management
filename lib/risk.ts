// risk.ts

import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface FinancialGoals {
    [goal: string]: number; // goal name -> timeframe in years
  }
  
  interface RiskAssessmentResult {
    name: string;
    rawRiskScore: number;
    riskRating: number;
    riskCategory: string;
  }
  
  interface RiskFactors {
    name: string;
    age: number;
    income: number;
    incomeStability: number;
    monthlyExpenditure: number;
    dependents: number;
    debt: number;
    medicalConditions: number;
    financialGoals: { [goal: string]: number };
  }
  
  /**
   * Calculate investment risk factor on a scale of 1-5.
   * 1: Low risk tolerance - safe investments only
   * 5: High risk tolerance - can handle significant investment risks
   */
  export function calculateRiskFactor(
    name: string,
    age: number,
    income: number,
    incomeStability: number, // 1-5 scale (1: very unstable, 5: very stable)
    monthlyExpenditure: number,
    dependants: number, // number of dependants
    debt: number, // total debt amount
    medicalConditions: number, // 1-5 scale (1: severe conditions, 5: no conditions)
    financialGoals: FinancialGoals // Dict with goals and timeframes, e.g. {'retirement': 20, 'house': 5}
  ): RiskAssessmentResult {
    // Initialize base risk score
    let riskScore = 3; // Start at medium risk
    
    // Age factor (younger = higher risk tolerance)
    if (age < 30) {
      riskScore += 0.8;
    } else if (age < 40) {
      riskScore += 0.5;
    } else if (age < 50) {
      riskScore += 0.2;
    } else if (age < 60) {
      riskScore -= 0.3;
    } else {
      riskScore -= 0.8;
    }
    
    // Income and stability factors
    // Calculate income to expenditure ratio
    const monthlyIncome = income > 12000 ? income / 12 : income; // Convert to monthly if annual
    const incomeExpenditureRatio = monthlyExpenditure > 0 ? monthlyIncome / monthlyExpenditure : 5;
    
    if (incomeExpenditureRatio > 3) {
      riskScore += 0.6;
    } else if (incomeExpenditureRatio > 2) {
      riskScore += 0.3;
    } else if (incomeExpenditureRatio > 1.5) {
      riskScore += 0.1;
    } else if (incomeExpenditureRatio < 1.2) {
      riskScore -= 0.5;
    }
    
    // Income stability impact
    riskScore += (incomeStability - 3) * 0.3;
    
    // Dependants factor
    const dependantsFactor = -0.2 * dependants;
    riskScore += Math.max(dependantsFactor, -1); // Cap negative impact at -1
    
    // Debt factor - calculate debt to annual income ratio
    const annualIncome = income < 1000 ? income * 12 : income; // Convert to annual if monthly
    const debtToIncome = annualIncome > 0 ? debt / annualIncome : 5;
    
    if (debtToIncome > 0.5) {
      riskScore -= 0.8;
    } else if (debtToIncome > 0.3) {
      riskScore -= 0.5;
    } else if (debtToIncome > 0.1) {
      riskScore -= 0.2;
    }
    
    // Medical conditions impact
    riskScore += (medicalConditions - 3) * 0.3;
    
    // Financial goals impact
    const goalTimeframes = Object.values(financialGoals);
    const shortestGoal = goalTimeframes.length > 0 ? Math.min(...goalTimeframes) : 10;
    
    if (shortestGoal < 2) {
      riskScore -= 0.8; // Very short-term goals reduce risk tolerance
    } else if (shortestGoal < 5) {
      riskScore -= 0.4; // Short-term goals reduce risk tolerance
    } else if (shortestGoal > 15) {
      riskScore += 0.4; // Long-term goals increase risk tolerance
    }
    
    // Ensure the final risk score is between 1 and 5
    const finalRiskScore = Math.max(1, Math.min(5, riskScore));
    
    // Round to nearest 0.5
    const roundedRiskScore = Math.round(finalRiskScore * 2) / 2;
    
    // Convert to integer rating from 1-5
    const riskRating = Math.round(roundedRiskScore);
    
    // Risk categories mapping
    const riskCategories: { [key: number]: string } = {
      1: "Very Conservative - Prioritize capital preservation",
      2: "Conservative - Focus on stable, low-risk investments",
      3: "Moderate - Balanced approach with some growth-oriented investments",
      4: "Growth-Oriented - Primarily focused on long-term growth with acceptable volatility",
      5: "Aggressive Growth - High risk tolerance, seeking maximum returns"
    };
    
    return {
      name,
      rawRiskScore: roundedRiskScore,
      riskRating,
      riskCategory: riskCategories[riskRating]
    };
  }
  
  async function fetchRiskData(userId: string): Promise<RiskFactors | null> {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Risk Data:", data);

        const riskFactors: RiskFactors = {
          name: data.name,
          age: data.age,
          income: data.income,
          incomeStability: data.incomeStability,
          monthlyExpenditure: data.monthlyExpenditure,
          dependents: data.dependants.children + data.dependants.grandparents + data.dependants.other + (data.dependants.spouse ? 1 : 0),
          debt: data.debts.reduce((total: number, debt: any) => total + debt.amount, 0),
          medicalConditions: data.medicalConditions ? 3 : 1, // Example logic for medical condition
          financialGoals: data.financialGoals || {}
        };

        return riskFactors;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      return null;
    }
  }

  export async function getRiskFactor(userId: string): Promise<number> {
    const data = await fetchRiskData(userId);
    if (data) {
      const riskFactor = calculateRiskFactor(data.name, data.age, data.income, data.incomeStability, data.monthlyExpenditure, data.dependents, data.debt, data.medicalConditions, data.financialGoals);
      console.log("Calculated Risk Factor: ", riskFactor.rawRiskScore);
      
      // Update the riskFactor field in the user's document
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, { riskFactor: riskFactor.rawRiskScore });
      
      return riskFactor.rawRiskScore;
    }
    return 0; // Return a default value if data is not available
  }
  
  // Example usage
  /*
  const sampleProfile = {
    name: 'John Doe',
    age: 35,
    income: 80000, // Annual
    incomeStability: 4, // Stable job
    monthlyExpenditure: 3500,
    dependants: 2, // Spouse and one child
    debt: 120000, // Includes mortgage and car loan
    medicalConditions: 4, // Generally healthy
    financialGoals: { retirement: 30, college_fund: 15, vacation: 2 }
  };
  
  const result = calculateRiskFactor(
    sampleProfile.name,
    sampleProfile.age,
    sampleProfile.income,
    sampleProfile.incomeStability,
    sampleProfile.monthlyExpenditure,
    sampleProfile.dependants,
    sampleProfile.debt,
    sampleProfile.medicalConditions,
    sampleProfile.financialGoals
  );
  
  console.log(⁠ Risk Assessment for ${result.name}: ⁠);
  console.log(⁠ Raw Score: ${result.rawRiskScore} ⁠);
  console.log(⁠ Risk Rating: ${result.riskRating}/5 ⁠);
  console.log(⁠ Category: ${result.riskCategory} ⁠);
  */