import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{
                role: "user",
                content: `You are an investment calculation bot. I will provide you with two inputs:
1. A risk factor on a scale of 1 to 5 (where 1 indicates the least willingness to take risks and 5 indicates a high risk tolerance).
2. A principal amount.
For now, the risk factor is 5 and the principal amount is 100.
Based on these inputs, do the following:
- Determine what portion of the principal should be allocated to savings and what portion to investments.
- For the investment portion, further allocate the funds among four long-term investment categories: stocks, crypto, bonds, and ETFs.

Output your answer as a single, comma-separated line in this exact order:
[savings_percentage, investments_percentage, stocks_percentage, crypto_percentage, bonds_percentage, ETFs_percentage]
No unneccesary text or comments. Double check the maths. Just answer on the provided format.`
            }],
            model: "gpt-4o",
        });

        // Only log to terminal, don't send response to client
        console.log('OpenAI Response:', completion.choices[0].message.content);

        // Return minimal response
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(null, { status: 500 });
    }
} 