"use client";

import { useWallet } from "@/WalletProvider";

export default function WalletButton() {
  const { connect, disconnect, accountId, balance, isConnecting } = useWallet();

  if (isConnecting) {
    return (
      <button
        className="px-4 py-1.5 m-20 text-white bg-blue-800 rounded-2xl"
        disabled
      >
        Connecting...
      </button>
    );
  }

  if (accountId) {
    return (
      <div className="p-20 text-white">
        <div>Account: {accountId}</div>
        <div>Balance: {balance} HBAR</div>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <button
      className="px-4 py-1.5 m-20 text-white bg-blue-800 rounded-2xl"
      onClick={connect}
    >
      Connect Wallet
    </button>
  );
}
