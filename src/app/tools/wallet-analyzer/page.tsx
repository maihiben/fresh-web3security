"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { Wallet, ShieldCheck, AlertTriangle, LogIn, CheckCircle, ShieldX } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { useTokenBalances } from '../../../hooks/useTokenBalances';

const steps = [
  {
    icon: <LogIn className="w-7 h-7 text-cyan-400" />,
    title: "Connect Wallet",
    desc: "Click 'Connect Wallet' to check your token security status."
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-lime-400" />,
    title: "Status: Secure",
    desc: "If status is 'secure', you have nothing to worry about."
  },
  {
    icon: <ShieldX className="w-7 h-7 text-pink-400" />,
    title: "Status: Compromised",
    desc: "If status is 'compromised', click to safeguard your assets."
  }
];

export default function WalletAnalyzerPage() {
  const [address, setAddress] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { risks: number; message: string; status: "secure" | "compromised" }>(null);
  const [isConnected, setIsConnected] = useState(false);

  const { address: connectedAddress, isConnected: wagmiIsConnected } = useAccount();
  // We'll get chain from RainbowKit ConnectButton.Custom render prop
  const [selectedChainId, setSelectedChainId] = useState<number | undefined>(undefined);
  const { tokens, loading: tokensLoading, error: tokensError } = useTokenBalances(wagmiIsConnected && selectedChainId ? connectedAddress : undefined, wagmiIsConnected && selectedChainId ? selectedChainId : undefined);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      // Placeholder: randomly generate a result
      const compromised = Math.random() > 0.5;
      setResult(
        compromised
          ? { risks: Math.floor(Math.random() * 3) + 1, message: "Compromised! Active bots or token drainers detected.", status: "compromised" }
          : { risks: 0, message: "Secure! No vulnerabilities found.", status: "secure" }
      );
      setAnalyzing(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero + Illustration */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-44 pb-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start md:items-start gap-6">
          <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg">
            Secure your tokens with <span className="text-cyan-400">Web3 Wallet Security</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-2 max-w-2xl">
            We provide advanced security features to keep your digital assets safe. The contract scans your address for active bots and token drainers and helps you disable them.
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
                document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-lime-400/20 border border-lime-400/40 text-lime-200 font-bold text-sm shadow-lime-400/30 shadow-md hover:bg-lime-400/40 hover:text-white hover:shadow-lime-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-lime-400/40 focus:outline-none focus:ring-2 focus:ring-lime-400 tracking-wide"
            >
              Secure Now
            </button>
          </div>
        </div>
        {/* Right: Illustration (placeholder) */}
        <div className="flex-1 flex items-center justify-center">
          <motion.img
            src="/images/tools/wallet-analyzer-hero.png"
            alt="Wallet Security Illustration"
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
          {[
            {
              icon: <LogIn className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />, title: "Connect Wallet", desc: "Click 'Connect Wallet' to securely link your wallet. We never access your funds or private keys."
            },
            {
              icon: <Wallet className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />, title: "Enter Address", desc: "Alternatively, paste any EVM wallet address to analyze its security status."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />, title: "Analyze", desc: "Click 'Analyze' to scan for active bots, suspicious approvals, and token drainers."
            },
            {
              icon: <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-pink-400" />, title: "Review Results", desc: "Instantly see if your wallet is secure or compromised, with clear risk details."
            },
            {
              icon: <ShieldX className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />, title: "Safeguard Assets", desc: "If compromised, follow our guided steps to revoke risky approvals and protect your tokens."
            }
          ].map((step, idx, arr) => (
            <div key={step.title} className="flex items-start md:items-center gap-4 md:gap-8 py-8 md:py-10 relative">
              {/* Timeline vertical line */}
              <div className="flex flex-col items-center mr-2 md:mr-6">
                <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-cyan-400' : idx === arr.length-1 ? 'bg-yellow-400' : 'bg-gray-700 border-2 border-cyan-400/40'} z-10`}>
                  {step.icon}
                </div>
                {idx < arr.length - 1 && (
                  <div className="w-1 h-16 md:h-24 bg-gradient-to-b from-cyan-400/30 to-transparent mt-1 mb-1 rounded-full" />
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
          <div className="absolute left-4 md:left-7 top-8 bottom-8 w-1 bg-gradient-to-b from-cyan-400/20 to-transparent z-0 pointer-events-none" />
        </div>
      </section>
      {/* Analyzer Card */}
      <section id="analyze-section" className="w-full max-w-screen-md mx-auto px-4 md:px-0 scroll-mt-24">
        <GlassCard className="flex flex-col items-center gap-10 py-12 px-4 md:px-16 relative overflow-hidden bg-gradient-to-br from-cyan-900/30 via-[#181F2B]/40 to-[#0D0D0D]/80 border-2 border-cyan-400/10 shadow-2xl backdrop-blur-xl">
          {/* Connect Wallet Button */}
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
              // Sync selectedChainId for useTokenBalances
              if (chain && chain.id !== selectedChainId) setSelectedChainId(chain.id);
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === "authenticated");
              // Sync connection state for conditional rendering below
              if (isConnected !== !!connected) setIsConnected(!!connected);
              if (!connected) {
                // Show custom connect button (as before)
                return (
                  <motion.button
                    whileHover={{ scale: 1.06, boxShadow: "0 0 32px #00ffff99, 0 0 8px #39ff1499" }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-3 px-6 py-3 md:px-10 md:py-5 rounded-2xl bg-cyan-400/20 border border-cyan-400/40 text-cyan-100 font-extrabold text-lg md:text-2xl shadow-cyan-400/40 shadow-lg hover:bg-cyan-400/40 hover:text-white hover:shadow-cyan-400/80 transition-all duration-300 ease-in-out backdrop-blur-lg ring-2 ring-cyan-400/30 focus:outline-none focus:ring-4 focus:ring-cyan-400/60 tracking-wider mb-2 neon-glow relative animate-pulse-slow"
                    style={{
                      WebkitBackdropFilter: "blur(12px)",
                      backdropFilter: "blur(12px)"
                    }}
                    onClick={openConnectModal}
                  >
                    <Wallet className="w-6 h-6 md:w-8 md:h-8 text-cyan-300 group-hover:text-white transition" />
                    <span className="block md:hidden">Connect</span>
                    <span className="hidden md:block">Connect Wallet</span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent w-12 h-8 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500" />
                  </motion.button>
                );
              }
              // Show both chain and account buttons, styled for this tool
              return (
                <div className="flex flex-col items-center gap-2 mb-2">
                  <motion.button
                    whileHover={{ scale: 1.06, boxShadow: "0 0 24px #00ffff99" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-bold text-base shadow-cyan-400/30 shadow-md hover:bg-cyan-400/40 hover:text-white hover:shadow-cyan-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 tracking-wide neon-glow"
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
                    whileHover={{ scale: 1.06, boxShadow: "0 0 24px #00ffff99" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-8 py-3 w-full max-w-xs md:max-w-md rounded-2xl bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-extrabold text-lg shadow-cyan-400/30 shadow-md hover:bg-cyan-400/40 hover:text-white hover:shadow-cyan-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 tracking-wide neon-glow font-mono"
                    style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
                    onClick={openAccountModal}
                  >
                    <Wallet className="w-5 h-5 text-cyan-300" />
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
              );
            }}
          </ConnectButton.Custom>

          {/* Divider with OR badge, label, and input: only show when not connected */}
          {!isConnected && (
            <>
              <div className="flex items-center w-full max-w-md my-2">
                <div className="flex-1 h-px bg-cyan-400/20" />
                <span className="mx-4 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-200 font-bold text-xs uppercase tracking-widest shadow-cyan-400/10 shadow-sm backdrop-blur-md">
                  or
                </span>
                <div className="flex-1 h-px bg-cyan-400/20" />
              </div>
              <label htmlFor="address" className="text-gray-400 text-sm mb-1">
                Enter a wallet address:
              </label>
              <input
                id="address"
                type="text"
                placeholder="0x..."
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all mb-2 font-mono text-lg shadow-inner"
                autoComplete="off"
              />
            </>
          )}
          {/* Analyze Button: always visible */}
          <motion.button
            onClick={handleAnalyze}
            disabled={(!isConnected && !address) || analyzing}
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px #39ff14cc" }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 rounded-2xl bg-lime-400 text-black font-extrabold text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-xl disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-fast mt-2"
          >
            {analyzing ? "Analyzing..." : "Analyze"}
          </motion.button>

          {/* Results Placeholder */}
          {result && (
            <div className="flex flex-col items-center gap-2 mt-4">
              {result.status === "secure" ? (
                <ShieldCheck className="w-10 h-10 text-lime-400" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-pink-500" />
              )}
              <span className={`text-lg md:text-xl font-bold ${result.status === "secure" ? "text-lime-400" : "text-pink-400"}`}>
                {result.message}
              </span>
              {result.status === "compromised" && (
                <button
                  className="inline-block px-8 py-3 rounded-xl bg-pink-500 text-white font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-pink-500 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg mt-2"
                >
                  Safeguard Assets
                </button>
              )}
            </div>
          )}
          {/* Token Balances Display */}
          {isConnected && (
            <div className="w-full mt-8">
              <h3 className="text-lg font-bold mb-2 text-cyan-300">Your ERC-20 Tokens</h3>
              {tokensLoading && (
                <div className="text-cyan-200 animate-pulse">Loading tokens...</div>
              )}
              {tokensError && (
                (() => { console.error('Token fetch error:', tokensError); return null; })() || (
                  <div className="text-pink-400 font-semibold">Error fetching tokens: {tokensError}</div>
                )
              )}
              {!tokensLoading && !tokensError && tokens.length === 0 && (
                <div className="text-gray-400">No ERC-20 tokens with balance found on this chain.</div>
              )}
              {!tokensLoading && !tokensError && tokens.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {tokens.map(token => (
                    <div key={token.contractAddress} className="flex items-center gap-4 p-3 rounded-xl bg-cyan-900/30 border border-cyan-400/10 shadow hover:shadow-cyan-400/20 transition-all">
                      <img
                        src={token.logoUrl || '/vercel.svg'}
                        alt={token.symbol}
                        className="w-10 h-10 rounded-full bg-white/10 object-contain border border-cyan-400/20"
                        onError={e => { (e.target as HTMLImageElement).src = '/vercel.svg'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-cyan-100 truncate">{token.name} <span className="text-xs text-cyan-300">({token.symbol})</span></div>
                        <div className="text-cyan-200 font-mono text-sm truncate">
                          {Number(token.balance) / Math.pow(10, token.decimals)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Subtle background pattern */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
            <svg width="100%" height="100%" className="absolute inset-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="bg-grad" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#00fff7" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#0D0D0D" stopOpacity="0.0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#bg-grad)" />
            </svg>
          </div>
        </GlassCard>
      </section>
      <style jsx global>{`
        .neon-glow {
          box-shadow: 0 0 32px #00ffff44, 0 0 8px #39ff1444;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.2s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 32px #00ffff44, 0 0 8px #39ff1444; }
          50% { box-shadow: 0 0 48px #00fff799, 0 0 16px #39ff1499; }
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