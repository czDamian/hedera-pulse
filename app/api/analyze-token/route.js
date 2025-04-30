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
      You are Hedera Pulse, a blockchain token analyzer. Provide a brief, narrative analysis of this Hedera token based on the Mirror Node API data. Write in clear paragraphs, avoiding bullet points.

      Token Information JSON:
      ${JSON.stringify(tokenInfo, null, 2)}

      Token Holders JSON:
      ${JSON.stringify(holdersData, null, 2)}

      Structure your analysis as a short essay covering:
      1. Token Overview: Discuss the token's basic properties, creation date, and key configuration.
      2. Distribution Analysis: Examine holder distribution patterns and concentration.
      3. Risk Assessment: Evaluate centralization risks and security concerns.
      4. Overall Health: Provide a health score (0-100) with brief justification.

      Important context:
      - Treasury accounts hold token supply for minting
      - Admin keys are system-controlled
      - Tokens under 24 hours old are considered high-risk
      - Keep the response short, concise and focused on key insights
      
      Format the response in markdown with appropriate headings and paragraphs.
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
