"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import { FaWallet } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";
import Link from "next/link";

const Onboard = () => {
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    try {
      setIsLoading(true);
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x128",
            chainName: "Hedera Testnet (Hashio)",
            nativeCurrency: {
              name: "HBAR",
              symbol: "HBAR",
              decimals: 18,
            },
            rpcUrls: ["https://testnet.hashio.io/api"],
            blockExplorerUrls: ["https://hashscan.io/testnet"],
          },
        ],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (err) {
      console.error("Wallet connection error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5913] to-black text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="max-w-48 mx-auto"
            />
            <div className="space-y-6 text-center">
              <h1 className="text-3xl font-bold font-[family-name:var(--font-lemon-milk)]">
                Create Your Digital Token Journey
              </h1>
              <p className="text-lg text-gray-300 font-[family-name:var(--font-groteskRegular)]">
                Launch your token on Hedera with AI-powered insights and
                real-time analytics
              </p>
              <div className="space-y-4">
                <div className="flex justify-center items-center gap-3">
                  <BsShieldLockFill className="text-green-400 text-xl" />
                  <span>Secure wallet integration</span>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <MdSecurity className="text-green-400 text-xl" />
                  <span>Enterprise-grade security</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-black/30 p-8 md:px-12 py-12 rounded-2xl backdrop-blur-sm border border-green-900/30">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-lemon-milk)]">
                  Welcome to Hedera Pulse
                </h2>
                <p className="text-gray-400">
                  Connect your wallet to get started
                </p>
              </div>

              <div className="space-y-6">
                <button
                  onClick={connectWallet}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  <FaWallet className="text-xl" />
                  {isLoading
                    ? "Connecting..."
                    : account
                    ? `Connected: ${account.slice(0, 4)}...${account.slice(-4)}`
                    : "Connect Wallet"}
                </button>

                <div>
                  {/* show other links */}

                  {account && (
                    <div>
                      <h1>Sign in successful. Proceed to: </h1>
                      <div className="flex flex-col gap-4 mt-4 px-4">
                        <Link
                          href="/create-token"
                          className="animate-pulse hover:underline"
                        >
                          - Launch Token
                        </Link>
                        <Link
                          href="/analyze-token"
                          className="animate-pulse hover:underline"
                        >
                          - Analyze Token
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
