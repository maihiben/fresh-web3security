"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { FileText, Wallet, AlertTriangle, LogIn, CheckCircle, ShieldX, ShieldAlert, Search } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";

const steps = [
  {
    icon: <LogIn className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />, title: "Connect Wallet", desc: "Securely link your wallet. We never access your funds or private keys."
  },
  {
    icon: <FileText className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />, title: "Enter Contract", desc: "Paste the smart contract address you want to scan."
  },
  {
    icon: <Search className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />, title: "Analyze", desc: "Click 'Scan' to analyze the contract for vulnerabilities and risks."
  },
  {
    icon: <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-pink-400" />, title: "Review Results", desc: "See if the contract is safe or risky, with clear details and recommendations."
  },
  {
    icon: <ShieldX className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />, title: "Take Action", desc: "If risky, follow our guide to stay safe and avoid interacting with dangerous contracts."
  }
];

export default function SmartContractScannerPage() {
  const [contract, setContract] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Validate contract address
  const handleContractChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setContract(value);
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

  // Clear result on chain/account change
  React.useEffect(() => {
    setResult(null);
  }, [chainId, account]);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);
    try {
      const res = await fetch('/api/scan-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contract, chainId }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ status: 'error', message: 'Error analyzing contract.' });
    }
    setScanning(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero + Illustration */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-44 pb-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start md:items-start gap-6">
          <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg flex items-center gap-3">
            <FileText className="w-10 h-10 text-purple-400" />
            Smart Contract Scanner
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-2 max-w-2xl">
            Analyze smart contracts for vulnerabilities and get instant security insights before interacting. Stay safe from malicious or buggy contracts.
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
                document.getElementById('scan-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-purple-400/20 border border-purple-400/40 text-purple-200 font-bold text-sm shadow-purple-400/30 shadow-md hover:bg-purple-400/40 hover:text-white hover:shadow-purple-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 tracking-wide"
            >
              Scan Now
            </button>
          </div>
        </div>
        {/* Right: Illustration (placeholder) */}
        <div className="flex-1 flex items-center justify-center">
          <motion.img
            src="/images/tools/contract-scanner.png"
            alt="Smart Contract Scanner Illustration"
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
                <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-purple-400' : idx === arr.length-1 ? 'bg-yellow-400' : 'bg-gray-700 border-2 border-purple-400/40'} z-10`}>
                  {step.icon}
                </div>
                {idx < arr.length - 1 && (
                  <div className="w-1 h-16 md:h-24 bg-gradient-to-b from-purple-400/30 to-transparent mt-1 mb-1 rounded-full" />
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
          <div className="absolute left-4 md:left-7 top-8 bottom-8 w-1 bg-gradient-to-b from-purple-400/20 to-transparent z-0 pointer-events-none" />
        </div>
      </section>
      {/* Scan Card */}
      <section id="scan-section" className="w-full max-w-screen-md mx-auto px-4 md:px-0 scroll-mt-24">
        <GlassCard className="flex flex-col items-center gap-10 py-12 px-4 md:px-16 relative overflow-hidden bg-gradient-to-br from-purple-900/30 via-[#181F2B]/40 to-[#0D0D0D]/80 border-2 border-purple-400/10 shadow-2xl backdrop-blur-xl">
          {/* Connect Wallet Button */}
          <ConnectButton.Custom>
            {({ account: acc, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                acc &&
                chain &&
                (!authenticationStatus || authenticationStatus === "authenticated");
              if (isConnected !== !!connected) setIsConnected(!!connected);
              if (connected && chain && chain.id !== chainId) setChainId(chain.id);
              if (connected && acc && acc.address !== account) setAccount(acc.address);
              if (!connected) {
                // Show only connect button and a friendly message
                return (
                  <div className="flex flex-col items-center w-full">
                    <motion.button
                      whileHover={{ scale: 1.06, boxShadow: "0 0 32px #a78bfa99, 0 0 8px #a78bfa99" }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-3 px-6 py-3 md:px-10 md:py-5 rounded-2xl bg-purple-400/20 border border-purple-400/40 text-purple-100 font-extrabold text-lg md:text-2xl shadow-purple-400/40 shadow-lg hover:bg-purple-400/40 hover:text-white hover:shadow-purple-400/80 transition-all duration-300 ease-in-out backdrop-blur-lg ring-2 ring-purple-400/30 focus:outline-none focus:ring-4 focus:ring-purple-400/60 tracking-wider mb-2 neon-glow relative animate-pulse-slow"
                      style={{
                        WebkitBackdropFilter: "blur(12px)",
                        backdropFilter: "blur(12px)"
                      }}
                      onClick={openConnectModal}
                    >
                      <Wallet className="w-6 h-6 md:w-8 md:h-8 text-purple-200 group-hover:text-white transition" />
                      <span className="block md:hidden">Connect</span>
                      <span className="hidden md:block">Connect Wallet</span>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent w-12 h-8 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500" />
                    </motion.button>
                    <span className="text-gray-400 text-sm mt-2 text-center max-w-xs">You need to connect your wallet to use this tool.</span>
                  </div>
                );
              }
              // Show both chain and account buttons, styled for this tool, and the input for contract address
              return (
                <>
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <motion.button
                      whileHover={{ scale: 1.06, boxShadow: "0 0 24px #a78bfa99" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-400/20 border border-purple-400/40 text-purple-200 font-bold text-base shadow-purple-400/30 shadow-md hover:bg-purple-400/40 hover:text-white hover:shadow-purple-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 tracking-wide neon-glow"
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
                      whileHover={{ scale: 1.06, boxShadow: "0 0 24px #a78bfa99" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-8 py-3 w-full max-w-xs md:max-w-md rounded-2xl bg-purple-400/20 border border-purple-400/40 text-purple-200 font-extrabold text-lg shadow-purple-400/30 shadow-md hover:bg-purple-400/40 hover:text-white hover:shadow-purple-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 tracking-wide neon-glow font-mono"
                      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
                      onClick={openAccountModal}
                    >
                      <Wallet className="w-5 h-5 text-purple-300" />
                      <span className="truncate w-full text-left">
                        <span className="hidden md:inline">{account}</span>
                        <span className="inline md:hidden">
                          {account
                            ? `${account.slice(0, 8)}…${account.slice(-6)}`
                            : ''}
                        </span>
                      </span>
                    </motion.button>
                  </div>
                  {/* Show input for contract address only when connected */}
                  <label htmlFor="contract" className="text-gray-400 text-sm mb-1">
                    Enter contract address:
                  </label>
                  <input
                    id="contract"
                    type="text"
                    placeholder="0x..."
                    value={contract}
                    onChange={handleContractChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all mb-2 font-mono text-lg shadow-inner"
                    autoComplete="off"
                  />
                  {inputError && <p className="text-red-400 text-sm mt-1">{inputError}</p>}
                </>
              );
            }}
          </ConnectButton.Custom>

          {/* Scan Contract Button: only enabled if connected and contract is entered */}
          {isConnected && (
            <motion.button
              onClick={handleScan}
              disabled={!contract || !!inputError || scanning || !chainId}
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px #a78bface" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-4 rounded-2xl bg-purple-400 text-black font-extrabold text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-purple-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-xl disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-fast mt-2"
            >
              {scanning ? "Scanning..." : "Scan Contract"}
            </motion.button>
          )}
          {/* Results Placeholder */}
          {result && (
            <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-xl mx-auto">
              {result.status === "safe" ? (
                <CheckCircle className="w-10 h-10 text-purple-400" />
              ) : result.status === "risky" ? (
                <ShieldAlert className="w-10 h-10 text-pink-500" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-yellow-400" />
              )}
              <span className={`text-lg md:text-xl font-bold ${result.status === "safe" ? "text-purple-400" : result.status === "risky" ? "text-pink-400" : "text-yellow-400"} text-center w-full`}>
                {result.message}
              </span>
              {/* Risk Level */}
              {result.riskLevel && (
                <span className="text-base font-semibold text-gray-300 text-center w-full">Risk Level: <span className="font-bold text-white">{result.riskLevel}</span></span>
              )}
              {/* Issues/Warnings */}
              {result.details && result.details.issues && result.details.issues.length > 0 && (
                <div className="w-full bg-yellow-900/30 rounded-xl p-4 mt-2 text-yellow-200 text-sm font-mono border border-yellow-400/20 shadow-inner">
                  <div className="font-bold text-yellow-300 mb-1">Vulnerabilities / Issues:</div>
                  <ul className="list-disc ml-6">
                    {result.details.issues.map((issue: any, idx: number) => (
                      <li key={idx}><span className="font-bold">{issue.type}:</span> {issue.description}</li>
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
            </div>
          )}
          {/* Subtle background pattern */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
            <svg width="100%" height="100%" className="absolute inset-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="bg-grad" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.10" />
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
          box-shadow: 0 0 32px #a78bfa44, 0 0 8px #a78bfa44;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.2s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 32px #a78bfa44, 0 0 8px #a78bfa44; }
          50% { box-shadow: 0 0 48px #a78bfa99, 0 0 16px #a78bfa99; }
        }
        .animate-pulse-fast {
          animation: pulse-fast 1.1s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-fast {
          0%, 100% { box-shadow: 0 0 12px #a78bfa44; }
          50% { box-shadow: 0 0 32px #a78bface; }
        }
      `}</style>
    </div>
  );
} 