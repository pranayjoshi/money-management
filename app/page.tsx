import type { Metadata } from "next";
import Dashboard from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Money Management Dashboard",
  description: "A personal finance dashboard for managing your money",
};

async function makeApiCall() {
  try {
    const response = await fetch('http://localhost:3000/api/hello');
  } catch (error) {
    console.error('Error making API call:', error);
  }
}

export default async function Page() {
  // Make the API call when the page loads
  await makeApiCall();

  // Return the original dashboard
  return <Dashboard />;
}
