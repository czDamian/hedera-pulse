"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Connect from "@/components/Connect";

const MyTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          fetchUserTokens(address);
        } catch (err) {
          console.error("Error connecting wallet:", err);
          setError("Please connect your wallet to view tokens");
        }
      }
    };

    connectWallet();
  }, []);

  const fetchUserTokens = async (address) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/my-tokens?address=${address}`);
      const data = await response.json();

      if (data.success) {
        setTokens(data.tokens);
      } else {
        setError(data.error || "Failed to fetch tokens");
      }
    } catch (err) {
      console.error("Error fetching tokens:", err);
      setError("Failed to fetch your tokens");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="my-tokens" className="min-h-screen ">
      <Connect />
      <div className="text-white px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="my-12">
          <h1 className="text-2xl font-bold mb-6 font-[family-name:var(--font-lemon-milk)]">
            My Tokens
          </h1>

          {isLoading ? (
            <div className="text-center py-8">Loading your tokens...</div>
          ) : error ? (
            <div className="text-red-400 text-center py-8">{error}</div>
          ) : tokens.length === 0 ? (
            <div className="bg-gray-800/50 rounded-lg border border-green-900 p-8 text-center">
              <h2 className="text-xl mb-2">No Tokens Found</h2>
              <p className="text-gray-400">
                You don&apos;t have any tokens in your wallet yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tokens.map((token) => (
                <div
                  key={token.tokenId}
                  className="bg-gray-800/50 rounded-lg border border-green-900 p-4 hover:border-green-500 transition-colors max-w-sm"
                >
                  {/* Token Name Header */}
                  <div className="mb-2 pb-2 border-b border-green-900">
                    <h3 className="text-lg font-bold text-green-400 flex items-center justify-between">
                      <span className="uppercase truncate">
                        {token.name || "Unnamed Token"}
                      </span>
                      <span className="text-xs ml-2 flex-shrink-0">({token.symbol || ""})</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="space-y-1">
                      <span className="text-gray-400 text-xs">Token ID</span>
                      <p className="font-mono bg-gray-900 p-1.5 rounded text-xs overflow-hidden text-ellipsis">
                        {token.tokenId}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-400 text-xs">Balance</span>
                      <p className="font-mono bg-gray-900 p-1.5 rounded text-sm">
                        {token.balance.toLocaleString()} {token.symbol}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-400 text-xs">Decimals</span>
                      <p className="font-mono bg-gray-900 p-1.5 rounded text-sm">
                        {token.decimals}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-400 text-xs">Created At</span>
                      <p className="font-mono bg-gray-900 p-1.5 rounded text-sm">
                        {new Date(Number(token.createdAt) * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyTokens;
