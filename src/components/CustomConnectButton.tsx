"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useRef } from 'react';

function shortAddress(address: string) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export default function CustomConnectButton() {
  const lastSavedAddress = useRef<string | null>(null);
  // Custom hook to save wallet address
  function useSaveWalletAddress(connected: boolean, address?: string | null) {
    useEffect(() => {
      if (typeof window === 'undefined') return;
      if (!connected || !address) return;
      if (lastSavedAddress.current === address) return;
      lastSavedAddress.current = address;
      const saveAddress = async () => {
        try {
          await setDoc(doc(db, 'wallets', address), {
            address,
            savedAt: new Date().toISOString(),
          });
        } catch (e) {
          // Optionally handle error
        }
      };
      saveAddress();
    }, [connected, address]);
  }
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        useSaveWalletAddress(!!connected, account?.address);

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
            })}
            className="flex items-center gap-2"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="ml-6 px-7 py-3 rounded-xl bg-lime-400 text-black font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg"
                  >
                    <span className="block md:hidden">Connect</span>
                    <span className="hidden md:block">Connect Wallet</span>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className="px-7 py-3 rounded-xl bg-lime-400 text-black font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <span
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 8,
                          display: "inline-block",
                        }}
                        className="inline-block"
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </span>
                    )}
                    <span className="hidden md:inline">{chain.name}</span>
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="px-7 py-3 rounded-xl bg-lime-400 text-black font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg"
                    type="button"
                  >
                    <span className="block md:hidden">{shortAddress(account?.address)}</span>
                    <span className="hidden md:block">{account.displayName}</span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
} 