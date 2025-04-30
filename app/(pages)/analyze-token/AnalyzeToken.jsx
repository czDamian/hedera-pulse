"use client";

import { useState } from "react";
import Connect from "@/components/Connect";
import ReactMarkdown from "react-markdown";

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
        console.log("Token Data:", data);
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
    <section id="analyze-token" className="min-h-screen">
      <Connect />
      <div className="text-white px-4 sm:px-8 md:px-12 max-w-4xl mx-auto py-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6 my-12">
          <div>
            <label className="block mb-2 text-sm font-medium">Token ID</label>
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="0.0.5922299"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-green-900 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              required
            />
          </div>

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
                Analyzing...
              </span>
            ) : (
              "Analyze Token"
            )}
          </button>

          {statusMessage && (
            <div className="text-sm text-center font-medium text-green-400 animate-pulse">
              {statusMessage}
            </div>
          )}
        </form>

        {/* Results Section */}
        {tokenData && (
          <div className="space-y-8">
            {/* Token Info Card */}
            <div className="bg-gray-800/30 rounded-xl border border-green-900/50 overflow-hidden backdrop-blur-sm">
              <div className="p-6 space-y-4">
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
            </div>

            {/* AI Analysis Section */}
            {tokenData?.aiAnalysis && (
              <div className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-green-900/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-lemon-milk)] flex items-center gap-2">
                  <span>AI Analysis</span>
                </h2>
                <div className="markdown-content">
                  <ReactMarkdown>{tokenData.aiAnalysis}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Supply and Holders Section */}
            <div className="bg-gray-800/30 rounded-xl border border-green-900/50 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-green-400">
                Supply Details
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
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

            <div className="bg-gray-800/30 rounded-xl border border-green-900/50 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-green-400">
                Token Holders
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-2 mt-4">
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
        )}
      </div>
    </section>
  );
};

export default AnalyzeToken;

   