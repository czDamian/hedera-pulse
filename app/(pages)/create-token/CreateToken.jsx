"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Connect from "@/components/Connect";

const CreateToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState(1000000);
  const [tokenId, setTokenId] = useState("");
  const [hashScanUrl, setHashScanUrl] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenMetadata, setTokenMetadata] = useState(null);

  const feeAddress = process.env.NEXT_PUBLIC_EVM_ADDRESS;
  const feeAmount = process.env.NEXT_PUBLIC_FEE_AMOUNT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsLoading(true);

    if (!window.ethereum) {
      setStatusMessage("MetaMask not installed");
      setIsLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      if (!address) {
        setStatusMessage("Please connect your wallet to MetaMask");
        setIsLoading(false);
        return;
      }
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 296) {
        setStatusMessage("Please switch to Hedera Testnet in MetaMask");
        setIsLoading(false);
        return;
      }

      // Process fee payment
      try {
        const tx = await signer.sendTransaction({
          to: feeAddress,
          value: ethers.parseEther(feeAmount),
        });

        await tx.wait();
        setStatusMessage("Transaction fee paid, creating token...");

        const response = await fetch("/api/create-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: address,
            tokenName,
            tokenSymbol,
            initialSupply,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create token");
        }

        if (data?.success) {
          setStatusMessage("Token created successfully!");
          setTokenId(data.tokenId);
          setHashScanUrl(data.hashScanUrl);
          setTokenBalance(data.tokenBalance?.low);
          setTokenMetadata({
            address: data.tokenEvmAddress,
            symbol: tokenSymbol,
            decimals: 0,
          });
          setTokenName("");
          setTokenSymbol("");
          setInitialSupply(1000000);
        }
      } catch (error) {
        console.error("Error in token creation process:", error);
        setStatusMessage(
          error.message || "Error creating token. Please try again."
        );
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error in wallet connection:", error);
      setStatusMessage(error.message || "Error connecting wallet");
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
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
            type: "ERC20",
            options: {
              address: tokenAddress, // The EVM-compatible token address
              symbol: tokenSymbol, //
              decimals: tokenDecimals,
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
    <section id="create-token" className="min-h-screen pb-10">
      <Connect />
      <div className="max-w-3xl text-white px-8 md:px-12 mx-auto relative">
        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

        {/* Title Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-lemon-milk)] mb-4">
            Create Your Token
          </h1>
          <p className="text-green-400/80 text-sm md:text-base">
            Launch your Hedera token in seconds with our AI-powered smart token
            creation
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-sm bg-black/30 rounded-xl border border-green-900/50 p-6 md:p-8 space-y-8 relative"
        >
          <div className="space-y-6">
            {/* Token Name Input */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-green-400">
                Token Name
                <span className="text-xs text-gray-400 ml-2">
                  (e.g., "MyAwesomeToken")
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                  required
                  placeholder="Enter token name"
                />
                <div className="absolute inset-0 border border-green-500/0 rounded-lg group-hover:border-green-500/20 pointer-events-none transition-all" />
              </div>
            </div>

            {/* Token Symbol Input */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-green-400">
                Token Symbol
                <span className="text-xs text-gray-400 ml-2">
                  (e.g., "MTK")
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all uppercase"
                  required
                  placeholder="Enter token symbol"
                  maxLength={5}
                />
                <div className="absolute inset-0 border border-green-500/0 rounded-lg group-hover:border-green-500/20 pointer-events-none transition-all" />
              </div>
            </div>

            {/* Initial Supply Select */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-green-400">
                Initial Supply
                <span className="text-xs text-gray-400 ml-2">
                  (Total tokens to mint)
                </span>
              </label>
              <div className="relative">
                <select
                  value={initialSupply}
                  onChange={(e) => setInitialSupply(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all appearance-none hover:bg-gray-800/70"
                  required
                  style={{ colorScheme: "dark" }}
                >
                  <option
                    value={1000000}
                    className="bg-gray-900 hover:bg-green-800"
                  >
                    1 Million Tokens
                  </option>
                  <option
                    value={10000000}
                    className="bg-gray-900 hover:bg-green-800"
                  >
                    10 Million Tokens
                  </option>
                  <option
                    value={100000000}
                    className="bg-gray-900 hover:bg-green-800"
                  >
                    100 Million Tokens
                  </option>
                  <option
                    value={1000000000}
                    className="bg-gray-900 hover:bg-green-800"
                  >
                    1 Billion Tokens
                  </option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating Token...
              </span>
            ) : (
              "Create Token"
            )}
          </button>

          {/* Status Message */}
          {statusMessage && (
            <div className="text-sm text-center font-medium text-green-400 animate-pulse mt-4">
              {statusMessage}
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
                  {tokenBalance?.toLocaleString()} {tokenSymbol}
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
              {tokenMetadata && (
                <button
                  onClick={() =>
                    addHederaTokenToMetaMask(
                      tokenMetadata.address,
                      tokenMetadata.symbol,
                      tokenMetadata.decimals
                    )
                  }
                  className="mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600  w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <img
                    src="/metamask.png"
                    alt="MetaMask"
                    className="w-5 h-5"
                  />
                  Add to MetaMask
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateToken;
