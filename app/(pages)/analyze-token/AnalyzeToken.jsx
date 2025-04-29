"use client";

import { useState } from "react";
import Connect from "@/components/Connect";

const AnalyzeToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenData, setTokenData] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/analyze-token?tokenId=${tokenId}`);
      const data = await response.json();

      if (data.success) {
        setTokenData(data);
        setStatusMessage("Token analysis complete!");
      } else {
        setStatusMessage(data.error || "Failed to analyze token");
      }
    } catch (error) {
      console.error("Error analyzing token:", error);
      setStatusMessage("Error analyzing token. Please try again.");
    } finally {
      setIsLoading(false);
      setStatusMessage("");
    }
  };

  return (
    <div className="text-white px-8 md:px-12 max-w-3xl mx-auto">
      <Connect />

      <form onSubmit={handleSubmit} className="space-y-6 my-12">
        <div>
          <label className="block mb-1 text-sm font-medium">Token ID</label>
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="0.0.5922299"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze Token"}
        </button>

        {statusMessage && (
          <div className="text-sm text-white animate-pulse">
            {statusMessage}
          </div>
        )}
      </form>

      {/* Token Analysis Results */}
      {tokenData && (
        <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-green-900">
          <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-lemon-milk)]">
            Token Analysis Results 📊
          </h2>

          <div className="space-y-6">
            {/* Token Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">
                Token Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-gray-400">Name:</span>
                  <div className="font-mono bg-gray-900 p-2 rounded">
                    {tokenData.tokenInfo.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-400">Symbol:</span>
                  <div className="font-mono bg-gray-900 p-2 rounded">
                    {tokenData.tokenInfo.symbol}
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">
                Supply Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-gray-400">Initial Supply:</span>
                  <div className="font-mono bg-gray-900 p-2 rounded">
                    {tokenData.initialSupply.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-400">Total Supply:</span>
                  <div className="font-mono bg-gray-900 p-2 rounded">
                    {tokenData.totalSupply.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Holders List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">
                Token Holders
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {tokenData.holders.map((holder, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-900 p-2 rounded"
                  >
                    <span className="font-mono text-sm">{holder.account}</span>
                    <span className="font-mono text-sm">
                      {Number(holder.balance).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeToken;
