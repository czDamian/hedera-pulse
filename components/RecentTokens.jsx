"use client";

import { motion } from "framer-motion";

const recentTokens = [
  {
    name: "Arbitrum",
    symbol: "ARBs",
    tokenId: "0.0.5919679",
    createdAt: "4/28/2025",
  },
  {
    name: "Pulse",
    symbol: "PULSE",
    tokenId: "0.0.5919743",
    createdAt: "4/28/2025",
  },
  {
    name: "juve",
    symbol: "JUV",
    tokenId: "0.0.5922243",
    createdAt: "4/29/2025",
  },
  {
    name: "MAVE",
    symbol: "MAV",
    tokenId: "0.0.5922445",
    createdAt: "4/29/2025",
  },
  {
    name: "Hedera",
    symbol: "HBAR",
    tokenId: "0.0.5928493",
    createdAt: "4/30/2025",
  },
  {
    name: "Awesome",
    symbol: "AWS",
    tokenId: "0.0.5934070",
    createdAt: "5/1/2025",
  },
  {
    name: "Valerian",
    symbol: "VLY",
    tokenId: "0.0.5934108",
    createdAt: "5/1/2025",
  },
  {
    name: "Miami",
    symbol: "MIA",
    tokenId: "0.0.5934328",
    createdAt: "5/1/2025",
  },
  {
    name: "PSG",
    symbol: "PSG",
    tokenId: "0.0.5934381",
    createdAt: "5/1/2025",
  },
];

const RecentTokens = () => {
  return (
    <section id="recent-tokens" className="min-h-screen">
      <div className="text-white px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="my-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6 font-[family-name:var(--font-lemon-milk)]"
          >
            Recently launched Tokens
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentTokens.map((token, index) => (
              <motion.div
                key={token.tokenId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-lg border border-green-900 p-4 hover:border-green-500 transition-colors max-w-sm"
              >
                <div className="mb-2 pb-2 border-b border-green-900">
                  <h3 className="text-lg font-bold text-green-400 flex items-center justify-between">
                    <span className="uppercase truncate">{token.name}</span>
                    <span className="text-xs ml-2 flex-shrink-0">
                      ({token.symbol})
                    </span>
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
                    <span className="text-gray-400 text-xs">Created At</span>
                    <p className="font-mono bg-gray-900 p-1.5 rounded text-sm">
                      {token.createdAt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentTokens;
