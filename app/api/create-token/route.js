import { NextResponse } from "next/server";
import {
  AccountId,
  PrivateKey,
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenId,
  Hbar,
  TransferTransaction,
  AccountBalanceQuery,
  AccountCreateTransaction,
} from "@hashgraph/sdk";
import { HCS10Client } from "@hashgraphonline/standards-sdk";

let lastProcessedTimestamp = 0;

async function processMessage(message, client) {
  if (message.timestamp <= lastProcessedTimestamp) return;

  let data = message.data;

  if (typeof data === "string") {
    if (data.startsWith("hcs://")) {
      const inscribed = await client.getMessageContent(data);
      data = JSON.parse(inscribed);
    } else {
      data = JSON.parse(data);
    }
  }

  if (!data || data.op !== "create_token") return;
  lastProcessedTimestamp = message.timestamp;
  console.log("Processing message:", data);
  const { tokenData = {} } = data;
  const accountId = process.env.AI_AGENT_ACCOUNT_ID;
  console.log("accountId to create token", accountId);

  if (!accountId) {
    console.warn("Missing account ID in token creation message.");
    return;
  }
  try {
    const hederaClient = client.getClient();
    const supplyKey = PrivateKey.generateECDSA();

    const tx = new TokenCreateTransaction()
      .setTokenName(tokenData.name || "My Token")
      .setTokenSymbol(tokenData.symbol || "MTK")
      .setDecimals(0)
      .setInitialSupply(tokenData.initialSupply || 1000000)
      .setTreasuryAccountId(accountId)
      .setTokenType(TokenType.FungibleCommon)
      // .setInitialBalance(new Hbar(5))
      .setMaxTransactionFee(new Hbar(5))
      .setTokenMemo(`AI-Enhanced Token created by ${tokenData.creator}`)
      .setSupplyKey(supplyKey)
      .freezeWith(hederaClient);

    const signedTx = await tx.signWithOperator(hederaClient);
    const response = await signedTx.execute(hederaClient);
    const receipt = await response.getReceipt(hederaClient);
    const tokenId = receipt.tokenId?.toString();

    console.log(`✅ Token created successfully: ${tokenId}`);

    // Get EVM Address
    const launchedTokenId = TokenId.fromString(tokenId);
    const evmAddress = launchedTokenId.toSolidityAddress();

    // Transfer 10% of the token to creator
    const transferAmount = Math.floor(tokenData.initialSupply * 0.1);
    const tokenTransferTx = await new TransferTransaction()
      .addTokenTransfer(tokenId, accountId, -transferAmount)
      .addTokenTransfer(tokenId, tokenData.creator, transferAmount)
      .freezeWith(hederaClient);

    const signTokenTransfer = await tokenTransferTx.signWithOperator(
      hederaClient
    );
    const transferResponse = await signTokenTransfer.execute(hederaClient);

    // Wait for the transfer receipt
    await transferResponse.getReceipt(hederaClient);

    // Add a small delay to ensure network propagation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Now check the balance
    const balanceCheck = await new AccountBalanceQuery()
      .setAccountId(tokenData.creator)
      .execute(hederaClient);

    // Get the balance using the token ID
    const balance = balanceCheck.tokens.get(tokenId);

    console.log("balance", balance?.toString());
    console.log("walletAddress", tokenData.creator);
    console.log("token id", tokenId);
    return NextResponse.json(
      {
        message: "Token created successfully",
        success: true,
        tokenId: tokenId,
        hashScanUrl: `https://hashscan.io/testnet/token/${tokenId}`,
        tokenBalance: balance,
        tokenEvmAddress: evmAddress,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Failed to create token:", err);
  }
}

async function monitorAndProcess(client, topicId) {
  console.log("monitoring and processing the latest message...");
  const messages = await client.getMessages(topicId);
  const lastMsg = messages.messages.at(-1);
  if (lastMsg) {
    return await processMessage(lastMsg, client);
  }
  return null;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { walletAddress, tokenName, tokenSymbol, initialSupply } = body;

    if (!walletAddress || !tokenName || !tokenSymbol || !initialSupply) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize AI Agent
    const aiClient = new HCS10Client({
      network: "testnet",
      operatorId: process.env.AI_AGENT_ACCOUNT_ID,
      operatorPrivateKey: process.env.AI_AGENT_PRIVATE_KEY,
      prettyPrint: true,
    });

    const topicId = process.env.AI_AGENT_INBOUND_TOPIC_ID;
    const message = {
      op: "create_token",
      operator_id: `${process.env.AI_AGENT_ACCOUNT_ID}`,
      tokenData: {
        name: tokenName,
        symbol: tokenSymbol,
        initialSupply: initialSupply,
        creator: walletAddress,
      },
    };

    await aiClient.sendMessage(topicId, message);
    const processedData = await monitorAndProcess(aiClient, topicId);

    if (!processedData) {
      console.error("Failed to process AI token creation");
      return NextResponse.json(
        {
          success: false,
          message: "Failed to process AI token creation.",
        },
        { status: 500 }
      );
    }
    // Return the processed data response
    return processedData;
  } catch (error) {
    console.error("Error creating token:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
