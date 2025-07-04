"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { Wallet, ShieldCheck, AlertTriangle } from "lucide-react";

export default function WalletAnalyzerPage() {
  const [address, setAddress] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { risks: number; message: string }>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      // Placeholder: randomly generate a result
      const risks = Math.random() > 0.5 ? Math.floor(Math.random() * 4) : 0;
      setResult(
        risks === 0
          ? { risks: 0, message: "No vulnerabilities found! Your wallet looks safe." }
          : { risks, message: `Found ${risks} potential risk${risks > 1 ? "s" : ""}. Please review your approvals and tokens.` }
      );
      setAnalyzing(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-screen-md mx-auto px-4 md:px-0 pt-32 pb-10 text-center">
        <h1 className="font-orbitron text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
          <Wallet className="text-cyan-400 w-10 h-10 md:w-12 md:h-12" /> Wallet Analyzer
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto">
          Instantly scan your wallet for vulnerabilities, suspicious activity, and risky assets across EVM chains.
        </p>
      </section>
      {/* Analyzer Card */}
      <section className="w-full max-w-screen-md mx-auto px-4 md:px-0">
        <GlassCard className="flex flex-col items-center gap-8 py-10 px-4 md:px-12">
          {/* Wallet Connect Placeholder */}
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-bold shadow-cyan-400/30 shadow-md hover:bg-cyan-400/40 hover:text-white hover:shadow-cyan-400/60 transition-all duration-300 ease-in-out backdrop-blur-md ring-1 ring-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 tracking-wide text-lg md:text-xl mb-2"
            disabled
          >
            <Wallet className="w-6 h-6" /> Connect Wallet (Coming Soon)
          </button>
          {/* OR Address Input */}
          <div className="flex flex-col items-center w-full max-w-md">
            <label htmlFor="address" className="text-gray-400 text-sm mb-2">
              Or enter a wallet address:
            </label>
            <input
              id="address"
              type="text"
              placeholder="0x..."
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-cyan-400/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all mb-4"
              autoComplete="off"
            />
            <button
              onClick={handleAnalyze}
              disabled={!address || analyzing}
              className="inline-block px-8 py-3 rounded-xl bg-lime-400 text-black font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {analyzing ? "Analyzing..." : "Analyze"}
            </button>
          </div>
          {/* Results Placeholder */}
          {result && (
            <div className="flex flex-col items-center gap-2 mt-4">
              {result.risks === 0 ? (
                <ShieldCheck className="w-10 h-10 text-lime-400" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-pink-500" />
              )}
              <span className={`text-lg md:text-xl font-bold ${result.risks === 0 ? "text-lime-400" : "text-pink-400"}`}>
                {result.message}
              </span>
            </div>
          )}
        </GlassCard>
      </section>
    </div>
  );
} 