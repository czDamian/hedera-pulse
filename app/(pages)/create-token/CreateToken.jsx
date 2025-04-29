"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Connect from "@/components/Connect";

const CreateToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [account, setAccount] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState(1000000);
  const [tokenId, setTokenId] = useState("");
  const [hashScanUrl, setHashScanUrl] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);

  const feeAddress = process.env.NEXT_PUBLIC_EVM_ADDRESS;
  const feeAmount = process.env.NEXT_PUBLIC_FEE_AMOUNT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsLoading(true);
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }
    // collect fee for creating token
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      if (!address) {
        setStatusMessage("Please connect your wallet to MetaMask");
        return;
      }
      setAccount(address);
      console.log("Account:", address);
      const network = await provider.getNetwork();
      console.log("Wrong network:", Number(network.chainId));
      if (Number(network.chainId) !== 296) {
        setStatusMessage("Please switch to Hedera Testnet in MetaMask");
        console.log("Wrong network:", Number(network.chainId));
        return;
      }
      const tx = await signer.sendTransaction({
        to: feeAddress,
        value: ethers.parseEther(feeAmount),
      });

      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      setStatusMessage("Transaction fee paid, creating token...");

      console.log("fee paid, proceeding to create token");
      try {
        const response = await fetch("/api/create-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: account,
            tokenName,
            tokenSymbol,
            initialSupply,
          }),
        });

        const data = await response.json();
        if (data?.success) {
          setStatusMessage("Token created successfully!");
          setTokenId(data.tokenId);
          setHashScanUrl(data.hashScanUrl);
          setTokenBalance(data.tokenBalance?.low);
          // setTokenEvmAddress(data.tokenEvmAddress);
          await addHederaTokenToMetaMask(data.tokenEvmAddress, tokenSymbol, 0);
        }
        console.log(data);
      } catch (error) {
        console.error("Error creating token:", error);
        setStatusMessage("Error creating token. Please try again.");
      }
    } catch (error) {
      console.error("Error Paying token creation fee:", error);
      console.error("Error:", error.message);
      setStatusMessage("Error Paying Token Creation fee.");
      setIsLoading(false);
      return;
    }
  };

  async function addHederaTokenToMetaMask(
    tokenAddress,
    tokenSymbol,
    tokenDecimals
  ) {
    try {
      // Only works if MetaMask is available and the user is connected
      if (window.ethereum) {
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Hedera tokens are ERC-20 compatible via EVM
            options: {
              address: tokenAddress, // The EVM-compatible token address
              symbol: tokenSymbol, // Token symbol (e.g. "MYT")
              decimals: tokenDecimals, // Number of decimals
              image: "https://yourdomain.com/logo.png", // Optional token icon
            },
          },
        });

        if (wasAdded) {
          console.log("Token added to MetaMask successfully");
        } else {
          console.log("Token not added to MetaMask");
        }
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Failed to add token to MetaMask", error);
    }
  }

  return (
    <div className="text-white px-8 md:px-12 max-w-3xl mx-auto">
      <Connect />

      <form onSubmit={handleSubmit} className="space-y-6 my-12">
        <div>
          <label className="block mb-1 text-sm font-medium">Token Name</label>
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Token Symbol</label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Initial Supply
          </label>
          <select
            value={initialSupply}
            onChange={(e) => setInitialSupply(Number(e.target.value))}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          >
            <option value={1000000}>1 Million</option>
            <option value={10000000}>10 Million</option>
            <option value={100000000}>100 Million</option>
            <option value={1000000000}>1 Billion</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
          disabled={isLoading}
        >
          Create Token
        </button>
        {statusMessage && (
          <div className="text-sm text-white animate-pulse">
            {" "}
            {statusMessage}{" "}
          </div>
        )}
      </form>

      {/* Token Details Section */}
      {tokenId && (
        <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-green-900">
          <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-lemon-milk)]">
            Token Created Successfully! 🎉
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-gray-400">Token ID:</span>
              <span className="font-mono bg-gray-900 p-2 rounded">
                {tokenId}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-400">Your Allocations:</span>
              <span className="font-mono bg-gray-900 p-2 rounded">
                {tokenBalance.toLocaleString()} {tokenSymbol}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-400">View on HashScan:</span>
              <a
                href={hashScanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 underline break-all"
              >
                {hashScanUrl}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateToken;
