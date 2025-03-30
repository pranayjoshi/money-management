import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "@/lib/firebaseConfig";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request:Request) {
    try {
        // Parse request body to get parameters
        const body = await request.json();
        const { riskFactor, principalAmount, userId } = body;
        
        if (!riskFactor || !principalAmount || !userId) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        console.log("Processing investment calculation");
        const completion = await openai.chat.completions.create({
            messages: [{
                role: "user",
                content: `You are an investment calculation bot. I will provide you with two inputs:
1. A risk factor on a scale of 1 to 5 (where 1 indicates the least willingness to take risks and 5 indicates a high risk tolerance).
2. A principal amount.
For now, the risk factor is ${riskFactor} and the principal amount is ${principalAmount}.
Based on these inputs, do the following:
- Determine what portion of the principal should be allocated to savings and what portion to investments.
- For the investment portion, further allocate the funds among four long-term investment categories: stocks, crypto, bonds, and ETFs.

Output your answer as a single, comma-separated line in this exact order:
[savings_percentage, investments_percentage, stocks_percentage, crypto_percentage, bonds_percentage, ETFs_percentage]
No unneccesary text or comments. Double check the maths. Just answer on the provided format.`
            }],
            model: "gpt-4o",
        });

        // Parse the response
        const responseContent = completion.choices[0].message.content!;
        const [savingsPercentage, investmentsPercentage, stocksPercentage, cryptoPercentage, bondsPercentage, ETFsPercentage] = responseContent.split(',').map(Number);

        // Update the user's document with the parsed values
        const docRef = doc(db, "users", userId);
        console.log(savingsPercentage, ETFsPercentage);
        await updateDoc(docRef, {
            savingsPercentage,
            investmentsPercentage,
            stocksPercentage,
            cryptoPercentage,
            bondsPercentage,
            ETFsPercentage
        });

        // Log the response
        console.log('OpenAI Response:', responseContent);

        // Return success response
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}