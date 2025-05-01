"use client";

import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { FaWallet } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Connect = () => {
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Check if wallet is already connected on page load
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
        } catch (err) {
          console.error("No wallet connected:", err);
        }
      }
    };

    checkConnection();

    // Close dropdown and mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    if (account) {
      setShowDropdown(!showDropdown);
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

  const disconnectWallet = () => {
    setAccount("");
    setShowDropdown(false);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-8 py-4 bg-gradient-to-r from-[#14450E] to-[#14450E]">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-auto h-8 md:h-12"
          />
          <span className="text-white font-[family-name:var(--font-kg-red-hands)]">Hedera Pulse</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white p-2 cursor-pointer"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <HiX className="h-6 w-6" />
        ) : (
          <HiMenu className="h-6 w-6" />
        )}
      </button>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center gap-4 font-[family-name:var(--font-caviar-dreams)]">
        <Link
          href="/create-token"
          className="text-white hover:text-green-400 transition-colors"
        >
          Create Token
        </Link>
        <Link
          href="/analyze-token"
          className="text-white hover:text-green-400 transition-colors"
        >
          Analyze Token
        </Link>
        <Link
          href="/my-tokens"
          className="text-white hover:text-green-400 transition-colors"
        >
          My Tokens
        </Link>
        {/* Wallet Connect Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-4 py-2 rounded-lg text-white transition-all duration-200 disabled:opacity-50"
          >
            <FaWallet className="text-white" />
            {isLoading
              ? "Connecting..."
              : account
              ? `${account.slice(0, 4)}...${account.slice(-4)}`
              : "Connect Wallet"}
          </button>

          {/* Dropdown Menu */}
          {showDropdown && account && (
            <div className="absolute right-0 mt-2 bg-black border border-green-900 rounded-lg shadow-lg z-10 overflow-hidden">
              <button
                onClick={disconnectWallet}
                className="w-full text-center px-4 py-2 text-white hover:bg-green-900 transition-colors text-sm"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-16 left-0 right-0 bg-[#14450E] border-t border-green-900 md:hidden z-50"
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="/create-token"
              className="text-white hover:text-green-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Token
            </Link>
            <Link
              href="/analyze-token"
              className="text-white hover:text-green-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analyze Token
            </Link>
            <Link
              href="/my-tokens"
              className="text-white hover:text-green-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Tokens
            </Link>
            {/* Mobile Wallet Button */}
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-4 py-2 rounded-lg text-white transition-all duration-200 disabled:opacity-50"
            >
              <FaWallet className="text-white" />
              {isLoading
                ? "Connecting..."
                : account
                ? `${account.slice(0, 4)}...${account.slice(-4)}`
                : "Connect Wallet"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Connect;
