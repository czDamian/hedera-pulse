import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET(req) {
  try {
    // Get tokenId from search params
    const { searchParams } = new URL(req.url);
    const tokenId = searchParams.get("tokenId");

    if (!tokenId) {
      return NextResponse.json(
        { error: "Token ID is required" },
        { status: 400 }
      );
    }

    // Fetch token holders and balances
    const holdersResponse = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/balances`
    );

    if (!holdersResponse.ok) {
      throw new Error("Failed to fetch token holders");
    }

    const holdersData = await holdersResponse.json();

    // Fetch token supply information
    const tokenInfoResponse = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}`
    );

    if (!tokenInfoResponse.ok) {
      throw new Error("Failed to fetch token information");
    }

    const tokenInfo = await tokenInfoResponse.json();

    // Prepare data for AI analysis with raw JSON
    const analysisPrompt = `
      You are Hedera Pulse, a hedera blockchain token analyzer. Analyze this Hedera token data from the Mirror Node API. Keep your response brief
      
      Token Information JSON:
      ${JSON.stringify(tokenInfo, null, 2)}

      Token Holders JSON:
      ${JSON.stringify(holdersData, null, 2)}

      Please analyze the raw JSON data and provide:

      1. Token Overview
         - Extract and analyze key parameters (name, symbol, supplies, creation date, etc.)
         - Identify token type and properties
         - Find and analyze admin/treasury accounts

      2. Distribution Analysis
         - Find the largest holder and calculate their percentage
         - Analyze the distribution pattern from the balances
         - Calculate the concentration of top holders

      3. Risk Assessment
         - Identify potential centralization risks from the data
         - Check for any suspicious patterns in holder distribution
         - Analyze token configuration risks

      4. Health Score (0-100)
         - Calculate based on found parameters
         - Explain the key factors affecting the score

      Present your findings in a clear, markdown-formatted response.
      Things to note:
      1. The treasury account is not owned by any user. It holds the token supply and is used for minting new tokens.
      2. The admin key is not owned by any user.
      3. Tokens less than 24 hrs are relatively new and should be bought with caution and low risk
    `;

    let aiAnalysis = null;

    try {
      // Generate AI analysis
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Dont change this
      const result = await model.generateContent(analysisPrompt);
      aiAnalysis = result.response.text();
    } catch (aiError) {
      console.warn("AI analysis unavailable:", aiError);
    }

    return NextResponse.json(
      {
        success: true,
        holders: holdersData.balances,
        totalSupply: tokenInfo.total_supply,
        initialSupply: tokenInfo.initial_supply,
        tokenInfo: {
          name: tokenInfo.name,
          symbol: tokenInfo.symbol,
          decimals: tokenInfo.decimals,
        },
        aiAnalysis: aiAnalysis || "AI analysis temporarily unavailable",
        aiStatus: aiAnalysis ? "available" : "unavailable",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error analyzing token:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
