import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


interface EmergencyFundFactors {
  age: number;
  income: number;
  incomeStability: number;
  monthlyExpenditure: number;
  dependents: number;
  medicalCondition: 1 | 2 | 3 | 4 | 5; // 1 = No medical requirements, 5 = Severe medical requirements
}

async function fetchEmergencyFundData(userId: string) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Emergency Fund Data:", data);
      // Extract necessary fields for emergency fund calculation
      const emergencyFundFactors: EmergencyFundFactors = {
        age: data.age,
        income: data.income,
        incomeStability: data.incomeStability,
        monthlyExpenditure: data.monthlyExpenditure,
        dependents: data.dependants.children + data.dependants.grandparents + data.dependants.other + (data.dependants.spouse ? 1 : 0),
        medicalCondition: data.medicalConditions ? 3 : 1 // Example logic for medical condition
      };

      return emergencyFundFactors;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    return null;
  }
}

  
  function calculateEmergencyFund(factors: EmergencyFundFactors): number {
    let baseFund = 3; // 3 months of expenses
  
    // Income Stability Adjustment
    if (factors.incomeStability < 3) {
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
  // const userFactors: EmergencyFundFactors = {
  //   age: 30,
  //   income: 5000,
  //   incomeStability: 2,
  //   monthlyExpenditure: 2000,
  //   dependents: 2,
  //   medicalCondition: 3
  // };

  export async function getEmergencyFund(userId: string): Promise<number> {
    const data = await fetchEmergencyFundData(userId);
    if (data) {
      const emergencyFund = calculateEmergencyFund(data);
      console.log("Calculated Emergency Fund: $", emergencyFund);
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, { emergencyFund: emergencyFund });
      return emergencyFund;
    }
    return 0; // Return a default value if data is not available
  }
  
  // console.log("Emergency Fund Required: $", getEmergencyFund);

  