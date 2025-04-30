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
    <section id="my-tokens" className="">
      <Connect />
      <div className="text-white px-8 md:px-12 max-w-3xl mx-auto ">
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
            <div className="grid gap-4">
              {tokens.map((token) => (
                <div
                  key={token.tokenId}
                  className="bg-gray-800/50 rounded-lg border border-green-900 p-6"
                >
                  {/* Token Name Header */}
                  <div className="mb-4 pb-4 border-b border-green-900">
                    <h3 className="text-xl font-bold text-green-400">
                      <span className="uppercase">
                        {token.name || "Unnamed Token"}
                      </span>
                      <span> ({token.symbol || ""})</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-gray-400">Token ID</span>
                      <p className="font-mono bg-gray-900 p-2 rounded">
                        {token.tokenId}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-gray-400">Balance</span>
                      <p className="font-mono bg-gray-900 p-2 rounded">
                        {token.balance.toLocaleString()} {token.symbol}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-gray-400">Decimals</span>
                      <p className="font-mono bg-gray-900 p-2 rounded">
                        {token.decimals}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-gray-400">Created At</span>
                      <p className="font-mono bg-gray-900 p-2 rounded">
                        {new Date(
                          Number(token.createdAt) * 1000
                        ).toLocaleDateString()}
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
