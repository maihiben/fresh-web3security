"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { ShieldAlert, Wallet, AlertTriangle, LogIn, CheckCircle, ShieldX, XCircle } from "lucide-react";
import { motion } from "framer-motion";

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
  const [result, setResult] = useState<null | { risks: number; message: string; status: "safe" | "fake" }>(null);

  const handleDetect = () => {
    setDetecting(true);
    setResult(null);
    setTimeout(() => {
      // Placeholder: randomly generate a result
      const fake = Math.random() > 0.5;
      setResult(
        fake
          ? { risks: Math.floor(Math.random() * 2) + 1, message: "Fake token detected! Remove immediately.", status: "fake" }
          : { risks: 0, message: "Token is safe. No scam detected!", status: "safe" }
      );
      setDetecting(false);
    }, 1800);
  };

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
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 32px #39ff1499, 0 0 8px #39ff1499" }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 px-6 py-3 md:px-10 md:py-5 rounded-2xl bg-lime-400/20 border border-lime-400/40 text-lime-100 font-extrabold text-lg md:text-2xl shadow-lime-400/40 shadow-lg hover:bg-lime-400/40 hover:text-white hover:shadow-lime-400/80 transition-all duration-300 ease-in-out backdrop-blur-lg ring-2 ring-lime-400/30 focus:outline-none focus:ring-4 focus:ring-lime-400/60 tracking-wider mb-2 neon-glow relative animate-pulse-slow"
            style={{
              WebkitBackdropFilter: "blur(12px)",
              backdropFilter: "blur(12px)"
            }}
          >
            <Wallet className="w-6 h-6 md:w-8 md:h-8 text-lime-200 group-hover:text-white transition" />
            Connect Wallet
            <span className="absolute right-4 top-1/2 -translate-y-1/2 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent w-12 h-8 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500" />
          </motion.button>
          {/* Divider with OR badge */}
          <div className="flex items-center w-full max-w-md my-2">
            <div className="flex-1 h-px bg-lime-400/20" />
            <span className="mx-4 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-200 font-bold text-xs uppercase tracking-widest shadow-lime-400/10 shadow-sm backdrop-blur-md">
              or
            </span>
            <div className="flex-1 h-px bg-lime-400/20" />
          </div>
          {/* Token Input + Detect */}
          <div className="flex flex-col items-center w-full max-w-md gap-2">
            <label htmlFor="token" className="text-gray-400 text-sm mb-1">
              Enter token contract address:
            </label>
            <input
              id="token"
              type="text"
              placeholder="0x..."
              value={token}
              onChange={e => setToken(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-lime-400/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all mb-2 font-mono text-lg shadow-inner"
              autoComplete="off"
            />
            <motion.button
              onClick={handleDetect}
              disabled={!token || detecting}
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px #39ff14cc" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-10 py-4 rounded-2xl bg-lime-400 text-black font-extrabold text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-xl disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-fast"
            >
              {detecting ? "Detecting..." : "Detect"}
            </motion.button>
          </div>
          {/* Results Placeholder */}
          {result && (
            <div className="flex flex-col items-center gap-2 mt-4">
              {result.status === "safe" ? (
                <CheckCircle className="w-10 h-10 text-lime-400" />
              ) : (
                <ShieldX className="w-10 h-10 text-pink-500" />
              )}
              <span className={`text-lg md:text-xl font-bold ${result.status === "safe" ? "text-lime-400" : "text-pink-400"}`}>
                {result.message}
              </span>
              {result.status === "fake" && (
                <button
                  className="inline-block px-8 py-3 rounded-xl bg-pink-500 text-white font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-pink-500 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg mt-2"
                >
                  Remove Token
                </button>
              )}
            </div>
          )}
          {/* Subtle background pattern */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
            <svg width="100%" height="100%" className="absolute inset-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="bg-grad" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#39ff14" stopOpacity="0.10" />
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