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

export async function POST(req) {
  try {
    const body = await req.json();
    const { walletAddress, tokenName, tokenSymbol, initialSupply } = body;
    console.log(walletAddress, tokenName, tokenSymbol, initialSupply);

    // Validate required fields
    if (!walletAddress || !tokenName || !tokenSymbol || !initialSupply) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supplyKey = PrivateKey.generateECDSA();
    const accountIdTest = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
    const accountKeyTest = PrivateKey.fromStringECDSA(
      process.env.OPERATOR_ACCOUNT_PRIVATE_KEY
    );

    if (accountIdTest == null || accountKeyTest == null) {
      console.error(
        "Environment variables myAccountId and myPrivateKey must be present"
      );
    } else {
      console.log("Account ID and private key are set.");
    }

    const client = Client.forTestnet();
    client.setOperator(accountIdTest, accountKeyTest);

    const treasuryKey = PrivateKey.generateECDSA();
    const treasuryPublicKey = treasuryKey.publicKey;

    //Create token treasury account
    const treasuryAccount = new AccountCreateTransaction()
      .setKey(treasuryKey)
      //Do NOT set an alias if you need to update/rotate keys in the future
      .setAlias(treasuryPublicKey.toEvmAddress())
      .setInitialBalance(new Hbar(5))
      .setAccountMemo("treasury account");
    //Submit the transaction to a Hedera network
    const submitAccountCreateTx = await treasuryAccount.execute(client);

    //Get the receipt of the transaction
    const newAccountReceipt = await submitAccountCreateTx.getReceipt(client);

    //Get the account ID from the receipt
    const treasuryAccountId = newAccountReceipt.accountId;

    console.log("The new account ID is " + treasuryAccountId);

    // Create the token
    const tokenTx = await new TokenCreateTransaction()
      .setTokenName(tokenName)
      .setTokenSymbol(tokenSymbol)
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(0)
      .setInitialSupply(initialSupply)
      .setTreasuryAccountId(treasuryAccountId)
      .setSupplyKey(supplyKey) // Random supplyKey for now
      //   .setAdminKey(PrivateKey.generate()) // Random adminKey for now
      .setMaxTransactionFee(new Hbar(5))
      .freezeWith(client);
    const signTokenTx = await tokenTx.sign(treasuryKey);

    const submitTx = await signTokenTx.execute(client);
    const receipt = await submitTx.getReceipt(client);

    const tokenId = receipt.tokenId?.toString();
    console.log("The token ID is " + tokenId);

    const launchedTokenId = TokenId.fromString(tokenId);

    const evmAddress = launchedTokenId.toSolidityAddress();
    console.log("EVM Address of token:", evmAddress);
    // Transfer 10% of the token supply to the creator
    const transferAmount = Math.floor(initialSupply * 0.1);

    const tokenTransferTx = await new TransferTransaction()
      .addTokenTransfer(tokenId, treasuryAccountId, -transferAmount)
      .addTokenTransfer(tokenId, walletAddress, transferAmount)
      .freezeWith(client)
      .sign(treasuryKey);

    // Execute the transfer transaction
    const transferSubmit = await tokenTransferTx.execute(client);
    const transferReceipt = await transferSubmit.getReceipt(client);
    // Log transfer status
    console.log(
      `Transferred ${transferAmount} of token - ${tokenId} to ${walletAddress}`
    );

    // Get the balance of the recipient wallet address to confirm
    const balanceCheck = await new AccountBalanceQuery()
      .setAccountId(walletAddress)
      .execute(client);

    console.log(
      `Wallet balance of token ID ${tokenId}: ${balanceCheck.tokens._map.get(
        tokenId
      )}`
    );

    return NextResponse.json(
      {
        message: "Token created successfully",
        success: true,
        tokenId: tokenId,
        hashScanUrl: `https://hashscan.io/testnet/token/${tokenId}`,
        tokenBalance: balanceCheck.tokens._map.get(tokenId),
        tokenEvmAddress: evmAddress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating token:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
