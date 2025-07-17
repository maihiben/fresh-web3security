"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { Ban, Wallet, ShieldCheck, AlertTriangle, LogIn, CheckCircle, ShieldX, Undo2, ShieldAlert, Globe, Search } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const steps = [
  {
    icon: <Globe className="w-7 h-7 text-blue-400" />, title: "Enter Website URL", desc: "Paste the website address you want to check for phishing."
  },
  {
    icon: <Search className="w-7 h-7 text-purple-400" />, title: "Scan for Phishing", desc: "Click 'Scan Website' to analyze the site for phishing or scam risks."
  },
  {
    icon: <AlertTriangle className="w-7 h-7 text-pink-400" />, title: "Review Results", desc: "See if the site is safe, suspicious, or reported as phishing."
  },
  {
    icon: <ShieldAlert className="w-7 h-7 text-yellow-400" />, title: "Take Action", desc: "Get recommendations to avoid, report, or proceed with caution."
  }
];

export default function PhishingSiteDetectorPage() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | { risks: number; message: string; status: "safe" | "phishing" | "suspicious" }>(null);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      // Placeholder: randomly generate a result
      const rand = Math.random();
      if (rand < 0.6) {
        setResult({ risks: 0, message: "This site is safe.", status: "safe" });
      } else if (rand < 0.85) {
        setResult({ risks: 1, message: "Warning: This site is suspicious. Proceed with caution!", status: "suspicious" });
      } else {
        setResult({ risks: 2, message: "Alert: This site is reported as phishing! Do NOT connect your wallet.", status: "phishing" });
      }
      setScanning(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero + Illustration */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-44 pb-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start md:items-start gap-6">
          <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg flex items-center gap-3">
            <ShieldAlert className="w-10 h-10 text-yellow-400" />
            Phishing Site Detector
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-2 max-w-2xl">
            Check if a website is a known phishing site or scam before connecting your wallet. Stay safe from web3 scams and malicious dApps.
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
                document.getElementById('phishing-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-yellow-400/20 border border-yellow-400/40 text-yellow-200 font-bold text-sm shadow-yellow-400/30 shadow-md hover:bg-yellow-400/40 hover:text-white hover:shadow-yellow-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-yellow-400/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 tracking-wide"
            >
              Scan Website
            </button>
          </div>
        </div>
        {/* Right: Illustration (placeholder) */}
        <div className="flex-1 flex items-center justify-center">
          <motion.img
            src="/images/tools/revoke-approvals.png"
            alt="Phishing Site Detector Illustration"
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
                <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-yellow-400' : idx === arr.length-1 ? 'bg-yellow-400' : 'bg-gray-700 border-2 border-yellow-400/40'} z-10`}>
                  {step.icon}
                </div>
                {idx < arr.length - 1 && (
                  <div className="w-1 h-16 md:h-24 bg-gradient-to-b from-yellow-400/30 to-transparent mt-1 mb-1 rounded-full" />
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
          <div className="absolute left-4 md:left-7 top-8 bottom-8 w-1 bg-gradient-to-b from-yellow-400/20 to-transparent z-0 pointer-events-none" />
        </div>
      </section>
      {/* Phishing Detector Card */}
      <section id="phishing-section" className="w-full max-w-screen-md mx-auto px-4 md:px-0 scroll-mt-24">
        <GlassCard className="flex flex-col items-center gap-10 py-12 px-4 md:px-16 relative overflow-hidden bg-gradient-to-br from-yellow-900/30 via-[#181F2B]/40 to-[#0D0D0D]/80 border-2 border-yellow-400/10 shadow-2xl backdrop-blur-xl">

          <label htmlFor="url" className="text-gray-400 text-sm mb-1">
            Enter a website URL:
          </label>
          <input
            id="url"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-yellow-400/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all mb-2 font-mono text-lg shadow-inner"
            autoComplete="off"
          />
          {/* Scan Website Button: always visible */}
          <motion.button
            onClick={handleScan}
            disabled={!url || scanning}
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px #ffe066cc" }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 rounded-2xl bg-yellow-400 text-black font-extrabold text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-yellow-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-xl disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-fast mt-2"
          >
            {scanning ? "Scanning..." : "Scan Website"}
          </motion.button>
          {/* Results Placeholder */}
          {result && (
            <div className="flex flex-col items-center gap-2 mt-4">
              {result.status === "safe" ? (
                <ShieldCheck className="w-10 h-10 text-lime-400" />
              ) : result.status === "suspicious" ? (
                <AlertTriangle className="w-10 h-10 text-pink-400" />
              ) : (
                <ShieldX className="w-10 h-10 text-yellow-400" />
              )}
              <span className={`text-lg md:text-xl font-bold ${result.status === "safe" ? "text-lime-400" : result.status === "suspicious" ? "text-pink-400" : "text-yellow-400"}`}>
                {result.message}
              </span>
              {result.status === "phishing" && (
                <button
                  className="inline-block px-8 py-3 rounded-xl bg-pink-500 text-white font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-pink-500 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg mt-2"
                >
                  Report This Site
                </button>
              )}
            </div>
          )}
          {/* Subtle background pattern */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
            <svg width="100%" height="100%" className="absolute inset-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="bg-grad" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#ffe066" stopOpacity="0.10" />
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
          box-shadow: 0 0 32px #ffe06644, 0 0 8px #ffe06644;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.2s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 32px #ffe06644, 0 0 8px #ffe06644; }
          50% { box-shadow: 0 0 48px #ffe06699, 0 0 16px #ffe06699; }
        }
        .animate-pulse-fast {
          animation: pulse-fast 1.1s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-fast {
          0%, 100% { box-shadow: 0 0 12px #ffe06644; }
          50% { box-shadow: 0 0 32px #ffe066cc; }
        }
      `}</style>
    </div>
  );
} 