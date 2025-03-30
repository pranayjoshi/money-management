import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    try {
        const { targetAmount, initialDeposit, interestRate, monthYear } = await req.json()

        // Create a prompt for the AI to analyze goal feasibility
        const prompt = `Given the following financial goal parameters:
    - Target Amount: $${targetAmount}
    - Initial Deposit: $${initialDeposit}
    - Interest Rate: ${interestRate}%
    - Target Date: ${monthYear}

    Please analyze if this goal is feasible based on the following criteria:
    1. The initial deposit should be less than or equal to the target amount
    2. The interest rate should be reasonable (typically between 0-20%)
    3. The target date should be in the future

    Respond with ONLY one of these two words:
    - "feasible" if the goal meets all criteria
    - "not feasible" if the goal fails any criteria

    Do not include any other text or explanation in your response.`

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a financial advisor analyzing goal feasibility. Respond with only 'feasible' or 'not feasible'."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.3,
            max_tokens: 10,
        })

        const feasibility = completion.choices[0].message.content?.trim().toLowerCase()

        return NextResponse.json({ feasibility })
    } catch (error) {
        console.error('Error in goal feasibility analysis:', error)
        return NextResponse.json(
            { error: 'Failed to analyze goal feasibility' },
            { status: 500 }
        )
    }
} 