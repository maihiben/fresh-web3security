"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { ShieldAlert, Wallet, AlertTriangle, LogIn, CheckCircle, ShieldX, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";

const steps = [
  {
    icon: <LogIn className="w-7 h-7 text-cyan-400" />, title: "Connect Wallet", desc: "Securely link your wallet. We never access your funds or private keys."
  },
  {
    icon: <ShieldAlert className="w-7 h-7 text-lime-400" />, title: "Enter Token", desc: "Paste the token contract address you want to check."
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-blue-400" />, title: "Analyze", desc: "Click 'Detect' to analyze the token for scam or phishing risks."
  },
  {
    icon: <AlertTriangle className="w-7 h-7 text-pink-400" />, title: "Review Results", desc: "See if the token is safe or flagged as fake, with clear details."
  },
  {
    icon: <XCircle className="w-7 h-7 text-yellow-400" />, title: "Remove if Fake", desc: "If fake, follow our guide to remove the token from your wallet."
  }
];

export default function DetectFakeTokensPage() {
  const [token, setToken] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState<null | any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [detectedWallet, setDetectedWallet] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Validate token address on change
  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setToken(value);
    if (!value) {
      setInputError(null);
      return;
    }
    if (!ethers.isAddress(value)) {
      setInputError("Invalid address.");
    } else {
      setInputError(null);
    }
  };

  const handleDetect = async () => {
    setDetecting(true);
    setResult(null);
    try {
      const res = await fetch('/api/detect-fake-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, chainId }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ status: 'fake', message: 'Error analyzing token. Please try again.' });
    }
    setDetecting(false);
  };

  // Wallet instructions map
  const walletInstructions: Record<string, string> = {
    "MetaMask": `1. Open MetaMask.\n2. Go to the "Assets" tab.\n3. Find the token you want to remove.\n4. Click the three dots next to the token.\n5. Select "Hide" or "Remove".`,
    "Trust Wallet": `1. Open Trust Wallet.\n2. Tap the token you want to remove.\n3. Tap the three dots in the top right.\n4. Tap "Remove" or "Hide".`,
    "Coinbase Wallet": `1. Open Coinbase Wallet.\n2. Go to the "Tokens" tab.\n3. Tap the token you want to remove.\n4. Tap the three dots or settings.\n5. Tap "Hide" or "Remove".`,
    "Rainbow": `1. Open Rainbow Wallet.\n2. Go to your assets.\n3. Tap the token you want to remove.\n4. Tap the three dots or settings.\n5. Tap "Hide" or "Remove".`,
    "Other": `1. Open your wallet app.\n2. Go to your tokens or assets list.\n3. Find the token you want to remove.\n4. Look for a "Hide" or "Remove" option in the menu or settings.`,
  };
  const walletOptions = [
    { value: "", label: "Select wallet" },
    { value: "MetaMask", label: "MetaMask" },
    { value: "Trust Wallet", label: "Trust Wallet" },
    { value: "Coinbase Wallet", label: "Coinbase Wallet" },
    { value: "Rainbow", label: "Rainbow Wallet" },
    { value: "Other", label: "Other / Generic" },
  ];

  // Helper for modal wallet selection
  const currentWallet = selectedWallet ?? "";

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero + Illustration */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-44 pb-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start md:items-start gap-6">
          <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg flex items-center gap-3">
            <ShieldAlert className="w-10 h-10 text-lime-400" />
            Detect Fake Tokens
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-2 max-w-2xl">
            Identify scam tokens and avoid phishing attempts with real-time detection algorithms. Stay safe from fake assets.
          </p>
          {/* Action Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                document.getElementById('steps-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-bold text-sm shadow-cyan-400/30 shadow-md hover:bg-cyan-400/40 hover:text-white hover:shadow-cyan-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 tracking-wide"
            >
              Instructions
            </button>
            <button
              onClick={() => {
                document.getElementById('detect-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-lime-400/20 border border-lime-400/40 text-lime-200 font-bold text-sm shadow-lime-400/30 shadow-md hover:bg-lime-400/40 hover:text-white hover:shadow-lime-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-lime-400/40 focus:outline-none focus:ring-2 focus:ring-lime-400 tracking-wide"
            >
              Detect Now
            </button>
          </div>
        </div>
        {/* Right: Illustration (placeholder) */}
        <div className="flex-1 flex items-center justify-center">
          <motion.img
            src="/images/tools/detect-tokens.png"
            alt="Detect Fake Tokens Illustration"
            className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-contain rounded-2xl shadow-2xl neon-glow"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          />
        </div>
      </section>
      {/* Steps Section */}
      <section id="steps-section" className="w-full max-w-2xl mx-auto px-2 md:px-0 mb-16 scroll-mt-24">
        <div className="relative flex flex-col gap-0 md:gap-0">
          {steps.map((step, idx, arr) => (
            <div key={step.title} className="flex items-start md:items-center gap-4 md:gap-8 py-8 md:py-10 relative">
              {/* Timeline vertical line */}
              <div className="flex flex-col items-center mr-2 md:mr-6">
                <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-lime-400' : idx === arr.length-1 ? 'bg-yellow-400' : 'bg-gray-700 border-2 border-lime-400/40'} z-10`}>
                  {step.icon}
                </div>
                {idx < arr.length - 1 && (
                  <div className="w-1 h-16 md:h-24 bg-gradient-to-b from-lime-400/30 to-transparent mt-1 mb-1 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <span className="font-orbitron text-lg md:text-2xl font-extrabold uppercase tracking-wide text-white mb-1 block">
                  {step.title}
                </span>
                <span className="text-gray-300 text-base md:text-lg font-medium leading-relaxed block">
                  {step.desc}
                </span>
              </div>
            </div>
          ))}
          {/* Decorative vertical line for the timeline */}
          <div className="absolute left-4 md:left-7 top-8 bottom-8 w-1 bg-gradient-to-b from-lime-400/20 to-transparent z-0 pointer-events-none" />
        </div>
      </section>
      {/* Detect Card */}
      <section id="detect-section" className="w-full max-w-screen-md mx-auto px-4 md:px-0 scroll-mt-24">
        <GlassCard className="flex flex-col items-center gap-10 py-12 px-4 md:px-16 relative overflow-hidden bg-gradient-to-br from-lime-900/30 via-[#181F2B]/40 to-[#0D0D0D]/80 border-2 border-lime-400/10 shadow-2xl backdrop-blur-xl">
          {/* Connect Wallet Button */}
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === "authenticated");
              if (isConnected !== !!connected) setIsConnected(!!connected);
                // Use chain.name or fallback to 'Other' for wallet detection
                const walletName = chain?.name || 'Other';
                if (connected && walletName && detectedWallet !== walletName) {
                  setDetectedWallet(walletName);
                  setSelectedWallet(walletName);
                }
              // Set chainId state
              if (connected && chain && chain.id !== chainId) {
                setChainId(chain.id);
              }
              if (!connected) {
                // Show only connect button and a friendly message
                return (
                  <div className="flex flex-col items-center w-full">
                    <motion.button
                      whileHover={{ scale: 1.06, boxShadow: "0 0 32px #39ff1499, 0 0 8px #39ff1499" }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-3 px-6 py-3 md:px-10 md:py-5 rounded-2xl bg-lime-400/20 border border-lime-400/40 text-lime-100 font-extrabold text-lg md:text-2xl shadow-lime-400/40 shadow-lg hover:bg-lime-400/40 hover:text-white hover:shadow-lime-400/80 transition-all duration-300 ease-in-out backdrop-blur-lg ring-2 ring-lime-400/30 focus:outline-none focus:ring-4 focus:ring-lime-400/60 tracking-wider mb-2 neon-glow relative animate-pulse-slow"
                      style={{
                        WebkitBackdropFilter: "blur(12px)",
                        backdropFilter: "blur(12px)"
                      }}
                      onClick={openConnectModal}
                    >
                      <Wallet className="w-6 h-6 md:w-8 md:h-8 text-lime-200 group-hover:text-white transition" />
                      <span className="block md:hidden">Connect</span>
                      <span className="hidden md:block">Connect Wallet</span>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent w-12 h-8 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500" />
                    </motion.button>
                    <span className="text-gray-400 text-sm mt-2 text-center max-w-xs">You need to connect your wallet to use this tool.</span>
                  </div>
                );
              }
              // Show both chain and account buttons, styled for this tool, and the input for token address
              return (
                <>
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <motion.button
                      whileHover={{ scale: 1.06, boxShadow: "0 0 24px #39ff1499" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-400/20 border border-lime-400/40 text-lime-200 font-bold text-base shadow-lime-400/30 shadow-md hover:bg-lime-400/40 hover:text-white hover:shadow-lime-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-lime-400/40 focus:outline-none focus:ring-2 focus:ring-lime-400 tracking-wide neon-glow"
                      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
                      onClick={openChainModal}
                    >
                      <span className="w-2 h-2 rounded-full mr-2" style={{ background: chain?.iconBackground, display: 'inline-block' }} />
                      {chain?.iconUrl && (
                        <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} className="w-5 h-5 rounded-full mr-1" />
                      )}
                      <span className="hidden md:inline">{chain?.name}</span>
                      <span className="inline md:hidden">{chain?.name?.slice(0, 8)}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.06, boxShadow: "0 0 24px #39ff1499" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-8 py-3 w-full max-w-xs md:max-w-md rounded-2xl bg-lime-400/20 border border-lime-400/40 text-lime-200 font-extrabold text-lg shadow-lime-400/30 shadow-md hover:bg-lime-400/40 hover:text-white hover:shadow-lime-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-lime-400/40 focus:outline-none focus:ring-2 focus:ring-lime-400 tracking-wide neon-glow font-mono"
                      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
                      onClick={openAccountModal}
                    >
                      <Wallet className="w-5 h-5 text-lime-300" />
                      <span className="truncate w-full text-left">
                        <span className="hidden md:inline">{account?.address}</span>
                        <span className="inline md:hidden">
                          {account?.address
                            ? `${account.address.slice(0, 8)}…${account.address.slice(-6)}`
                            : ''}
                        </span>
                      </span>
                    </motion.button>
                  </div>
                  {/* Show input for token address only when connected */}
                  <label htmlFor="token" className="text-gray-400 text-sm mb-1">
                    Enter token contract address:
                  </label>
                  <input
                    id="token"
                    type="text"
                    placeholder="0x..."
                    value={token}
                    onChange={handleTokenChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-lime-400/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all mb-2 font-mono text-lg shadow-inner"
                    autoComplete="off"
                  />
                  {inputError && (
                    <span className="block text-pink-400 text-sm font-bold text-center w-full mb-2">{inputError}</span>
                  )}
                </>
              );
            }}
          </ConnectButton.Custom>

          {/* Detect Button: only enabled if connected and token is entered */}
          {isConnected && (
            <motion.button
              onClick={handleDetect}
              disabled={!token || !!inputError || detecting || !chainId}
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px #39ff14cc" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-4 rounded-2xl bg-lime-400 text-black font-extrabold text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-xl disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-fast mt-2"
            >
              {detecting ? "Detecting..." : "Detect"}
            </motion.button>
          )}
          {/* Results Placeholder */}
          {result && (
            <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-xl mx-auto">
              {result.status === "safe" ? (
                <CheckCircle className="w-10 h-10 text-lime-400" />
              ) : (
                <ShieldX className="w-10 h-10 text-pink-500" />
              )}
              <span className={`text-lg md:text-xl font-bold ${result.status === "safe" ? "text-lime-400" : "text-pink-400"} text-center w-full`}>{result.message}</span>
              {/* Risk Level */}
              {result.riskLevel && (
                <span className="text-base font-semibold text-gray-300 text-center w-full">Risk Level: <span className="font-bold text-white">{result.riskLevel}</span></span>
              )}
              {/* Token Details */}
              {result.token ? (
                <div className="w-full bg-black/30 rounded-xl p-4 mt-2 text-white text-sm font-mono border border-lime-400/20 shadow-inner">
                  <div><span className="font-bold text-lime-400">Token:</span> {result.token.name} ({result.token.symbol})</div>
                  <div><span className="font-bold text-lime-400">Address:</span> <span className="truncate inline-block max-w-[160px] align-middle" title={result.token.address}>{result.token.address.slice(0, 6)}...{result.token.address.slice(-4)}</span></div>
                  {result.token.decimals !== undefined && <div><span className="font-bold text-lime-400">Decimals:</span> {result.token.decimals}</div>}
                  {result.token.totalHolders !== undefined && <div><span className="font-bold text-lime-400">Holders:</span> {result.token.totalHolders}</div>}
                </div>
              ) : (
                <div className="w-full bg-black/30 rounded-xl p-4 mt-2 text-gray-400 text-sm font-mono border border-lime-400/20 shadow-inner text-center">
                  Token details not available. This may be a new or unlisted token. You can see the technical details below
                </div>
              )}
              {/* Flags/Warnings */}
              {result.flags && result.flags.length > 0 && (
                <div className="w-full bg-yellow-900/30 rounded-xl p-4 mt-2 text-yellow-200 text-sm font-mono border border-yellow-400/20 shadow-inner">
                  <div className="font-bold text-yellow-300 mb-1">Warnings / Flags:</div>
                  <ul className="list-disc ml-6">
                    {result.flags.map((flag: any, idx: number) => (
                      <li key={idx}>{typeof flag === 'string' ? flag : (flag.description || flag.flag || JSON.stringify(flag))}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Technical Details (collapsible) */}
              <details className="w-full mt-2 bg-gray-900/60 rounded-xl p-4 text-gray-200 text-xs font-mono border border-gray-700/40 shadow-inner">
                <summary className="cursor-pointer font-bold text-cyan-300">Technical Details</summary>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs">Raw engine data</span>
                  <button
                    className="px-3 py-1 rounded bg-cyan-700 text-white text-xs font-bold hover:bg-cyan-500 transition ml-2"
                    onClick={() => {
                      const text = JSON.stringify(result.details, null, 2);
                      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1200);
                      } else {
                        // Fallback for older browsers
                        try {
                          const textarea = document.createElement('textarea');
                          textarea.value = text;
                          document.body.appendChild(textarea);
                          textarea.select();
                          document.execCommand('copy');
                          document.body.removeChild(textarea);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1200);
                        } catch (err) {
                          alert('Copy to clipboard is not supported in this environment.');
                        }
                      }
                    }}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap break-all">{JSON.stringify(result.details, null, 2)}</pre>
              </details>
              {result.status === "fake" && (
                <button
                  className="inline-block px-8 py-3 rounded-xl bg-pink-500 text-white font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-pink-500 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg mt-2"
                  onClick={() => {
                    setSelectedWallet(detectedWallet ?? "Other");
                    setShowRemoveModal(true);
                  }}
                >
                  Remove Token
                </button>
              )}
            </div>
          )}
        </GlassCard>
      </section>
      {/* Remove Token Modal - moved outside main content for true overlay */}
      {showRemoveModal && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/70 backdrop-blur-lg">
          <div className="relative w-full max-w-md p-0">
            <div className="bg-gradient-to-br from-lime-900/40 via-[#181F2B]/80 to-[#0D0D0D]/90 border-2 border-lime-400/30 shadow-2xl rounded-2xl px-6 py-8 md:px-10 md:py-10 backdrop-blur-xl">
              <button
                className="absolute top-4 right-4 text-lime-400 hover:text-cyan-400 text-3xl font-extrabold focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full bg-black/30 w-10 h-10 flex items-center justify-center z-[100]"
                style={{ lineHeight: 1, touchAction: 'manipulation' }}
                onClick={() => {
                  setShowRemoveModal(false);
                  setSelectedWallet(null);
                }}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-2xl font-extrabold mb-6 text-center text-lime-400 drop-shadow-lg tracking-wide">Remove or Hide Token</h2>
              <div className="mb-5">
                <label htmlFor="wallet-select" className="block text-base font-bold mb-2 text-white">Select your wallet:</label>
                <select
                  id="wallet-select"
                  className="w-full px-4 py-3 rounded-xl bg-[#181F2B] border border-lime-400/40 text-white font-extrabold text-lg focus:outline-none focus:ring-2 focus:ring-lime-400 mb-2 shadow-inner"
                  value={currentWallet}
                  onChange={e => setSelectedWallet(e.target.value)}
                >
                  {walletOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="bg-black/40 rounded-xl p-5 text-white text-base whitespace-pre-line font-mono border border-lime-400/20 shadow-lg mb-6">
                {currentWallet ? walletInstructions[currentWallet] : <span className="text-gray-400">Please select your wallet above.</span>}
              </div>
              <button
                className="w-full px-6 py-3 rounded-xl bg-lime-400 text-black font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg"
                onClick={() => {
                  setShowRemoveModal(false);
                  setSelectedWallet(null);
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .neon-glow {
          box-shadow: 0 0 32px #39ff1444, 0 0 8px #39ff1444;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.2s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 32px #39ff1444, 0 0 8px #39ff1444; }
          50% { box-shadow: 0 0 48px #39ff1499, 0 0 16px #39ff1499; }
        }
        .animate-pulse-fast {
          animation: pulse-fast 1.1s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-fast {
          0%, 100% { box-shadow: 0 0 12px #39ff1444; }
          50% { box-shadow: 0 0 32px #39ff14cc; }
        }
      `}</style>
    </div>
  );
} 