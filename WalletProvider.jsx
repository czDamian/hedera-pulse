"use client";

import { HashinalsWalletConnectSDK } from "@hashgraphonline/hashinal-wc";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { PrivateKey } from "@hashgraph/sdk";

const WalletContext = createContext({});

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
const APP_METADATA = {
  name: "My Hedera App",
  description: "Next.js app using Hashinal WalletConnect",
  url: typeof window !== "undefined" ? window.location.origin : "",
  icons: ["https://your-app-icon.com/icon.png"],
};

export function WalletProvider({ children }) {
  const [sdk, setSdk] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const initSDK = async () => {
      const instance = HashinalsWalletConnectSDK.getInstance();
      setSdk(instance);

      try {
        const existingAccount = await instance.initAccount(
          PROJECT_ID,
          APP_METADATA
        );
        if (existingAccount) {
          setAccountId(existingAccount.accountId);
          setBalance(existingAccount.balance);
        }
      } catch (error) {
        console.error("Failed to init wallet:", error);
      }
    };

    initSDK();
  }, []);

  const connect = async () => {
    if (!sdk) return;
    setIsConnecting(true);
    try {
      const { accountId, balance } = await sdk.connectWallet(
        PROJECT_ID,
        APP_METADATA
      );
      setAccountId(accountId);
      setBalance(balance);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (!sdk) return;
    try {
      await sdk.disconnectWallet();
      setAccountId(null);
      setBalance(null);
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      throw error;
    }
  };

  const submitHCS2Message = useCallback(async (message, topicId, submitKey) => {
    try {
      const sdk = HashinalsWalletConnectSDK.getInstance();

      // Validate message format
      if (message.m && message.m.length > 500) {
        throw new Error("Memo must not exceed 500 characters");
      }

      if (!message.p || message.p !== "hcs-2") {
        throw new Error("Invalid protocol. Must be 'hcs-2'");
      }

      // Convert message to string
      const messageString = JSON.stringify(message);

      // If a submit key is provided, convert it to a PrivateKey object
      const privateKey = submitKey
        ? PrivateKey.fromString(submitKey)
        : undefined;

      const receipt = await sdk.submitMessageToTopic(
        topicId,
        messageString,
        privateKey
      );

      console.log("HCS-2 message submitted successfully!");
      console.log("Transaction ID:", receipt.transactionId.toString());

      return receipt;
    } catch (error) {
      console.error("Error submitting HCS-2 message:", error);
      throw error;
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
        accountId,
        balance,
        isConnecting,
        submitHCS2Message,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
