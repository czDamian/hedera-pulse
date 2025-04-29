import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Fetch user's tokens from Mirror Node
    const response = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/accounts/${address}/tokens`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user tokens");
    }

    const data = await response.json();

    // Fetch additional details for each token
    const tokensWithDetails = await Promise.all(
      data.tokens.map(async (token) => {
        try {
          const tokenResponse = await fetch(
            `https://testnet.mirrornode.hedera.com/api/v1/tokens/${token.token_id}`
          );

          if (!tokenResponse.ok) {
            throw new Error(
              `Failed to fetch details for token ${token.token_id}`
            );
          }

          const tokenDetails = await tokenResponse.json();

          return {
            balance: token.balance,
            createdAt: token.created_timestamp,
            decimals: token.decimals,
            tokenId: token.token_id,
            name: tokenDetails.name || "Unknown",
            symbol: tokenDetails.symbol || "N/A",
          };
        } catch (err) {
          console.warn(
            `Error fetching details for token ${token.token_id}:`,
            err
          );
          // Return token without additional details if fetch fails
          return {
            balance: token.balance,
            createdAt: token.created_timestamp,
            decimals: token.decimals,
            tokenId: token.token_id,
            name: "Failed to fetch",
            symbol: "N/A",
          };
        }
      })
    );

    return NextResponse.json(
      {
        success: true,
        tokens: tokensWithDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user tokens:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
