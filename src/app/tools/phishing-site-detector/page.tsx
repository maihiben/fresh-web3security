"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { ShieldAlert, ShieldCheck, AlertTriangle, ShieldX, Search, Globe } from "lucide-react";
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
  const [result, setResult] = useState<null | any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/phishing-site-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok || data.status === "error") {
        setError(data.message || "Error checking site. Please try again.");
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (e) {
      setError("Network error. Please try again.");
      setResult(null);
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
      {/* Disclaimer/Beta Notice (standalone card, padded container) */}
      <div className="w-full max-w-screen-md mx-auto px-4 md:px-0 mb-8">
        <div className="p-4 rounded-xl bg-yellow-900/70 border border-yellow-400/40 text-yellow-200 flex items-start gap-3 shadow-lg">
          <span className="text-2xl mt-0.5">⚠️</span>
          <div>
            <span className="font-bold text-yellow-300 block mb-1">Beta Notice: Phishing Site Detector is in Active Development</span>
            <span className="text-yellow-100 text-sm">
              This tool is currently in <b>beta</b> and under active development and improvement. Results are based on public threat intelligence, heuristics, and user-editable lists. <b>No tool can guarantee a website is safe.</b> Always do your own manual checks before connecting your wallet or entering sensitive information.<br/>
              <span className="block mt-2 font-semibold">Recommended manual checks:</span>
              <ul className="list-disc ml-6 mt-1">
                <li>Verify the URL is correct and uses HTTPS</li>
                <li>Only use links from official sources</li>
                <li>Watch for typos or unusual characters</li>
                <li>Be cautious of sites asking for private keys or seed phrases</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
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
          <motion.button
            onClick={handleScan}
            disabled={!url || scanning}
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px #ffe066cc" }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 rounded-2xl bg-yellow-400 text-black font-extrabold text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-yellow-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-xl disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-fast mt-2"
          >
            {scanning ? "Scanning..." : "Scan Website"}
          </motion.button>
          {/* Error Message */}
          {error && (
            <div className="w-full bg-pink-900/30 rounded-xl p-4 mt-4 text-pink-200 text-base font-bold border border-pink-400/20 shadow-inner text-center">
              {error}
            </div>
          )}
          {/* Results Placeholder */}
          {result && (
            <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-xl mx-auto">
              {/* Risk Score and Meter */}
              {typeof result.riskScore === 'number' && (
                <div className="w-full flex flex-col items-center mt-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">Risk Score:</span>
                    <span className={`font-bold text-xl ${result.riskLevel === 'high' ? 'text-red-400' : result.riskLevel === 'medium' ? 'text-yellow-400' : 'text-lime-400'}`}>{result.riskScore}/100</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ml-2 ${result.riskLevel === 'high' ? 'bg-red-900 text-red-300' : result.riskLevel === 'medium' ? 'bg-yellow-900 text-yellow-300' : 'bg-lime-900 text-lime-300'}`}>{result.riskLevel.toUpperCase()}</span>
                  </div>
                  {/* Risk Meter Bar */}
                  <div className="w-full h-3 rounded bg-gray-800 mt-2 mb-1 overflow-hidden">
                    <div
                      className={`h-3 rounded ${result.riskLevel === 'high' ? 'bg-gradient-to-r from-yellow-400 via-red-500 to-red-700' : result.riskLevel === 'medium' ? 'bg-gradient-to-r from-lime-300 via-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-lime-400 to-lime-600'}`}
                      style={{ width: `${result.riskScore}%`, transition: 'width 0.5s' }}
                    />
                  </div>
                  {/* Score Breakdown */}
                  {result.scoreBreakdown && Object.keys(result.scoreBreakdown).length > 0 && (
                    <div className="w-full mt-2">
                      <span className="font-bold text-gray-200 text-sm">Score Breakdown:</span>
                      <ul className="ml-4 mt-1 text-xs text-gray-300 list-disc">
                        {Object.entries(result.scoreBreakdown).map(([key, value]) => (
                          <li key={key}>
                            <span className="font-semibold">{key.replace(/_/g, ' ')}:</span> +{String(value)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {/* Message */}
              {result.message && (
                <span className={`text-lg md:text-xl font-bold text-center w-full ${result.riskLevel === 'high' ? 'text-red-400' : result.riskLevel === 'medium' ? 'text-yellow-400' : 'text-lime-400'}`}>{result.message}</span>
              )}
              {/* Domain */}
              {result.domain && (
                <span className="text-base font-mono text-gray-300">Domain: <span className="text-white">{result.domain}</span></span>
              )}
              {/* Reasons (warnings/explanations) */}
              {result.reasons && result.reasons.length > 0 && (
                <div className="w-full bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-3 mt-2">
                  <span className="font-bold text-yellow-300">Why this result?</span>
                  <ul className="list-disc ml-6 mt-1 text-yellow-100 text-sm">
                    {result.reasons.map((reason: string, i: number) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Heuristic Analysis */}
              {result.heuristics && (
                <div className="w-full bg-cyan-900/20 border border-cyan-400/30 rounded-lg p-3 mt-2">
                  <span className="font-bold text-cyan-300">Heuristic Analysis</span>
                  <ul className="ml-2 mt-1 text-cyan-100 text-sm">
                    {result.heuristics.lookalike && (
                      <li>
                        <span className="font-semibold">Lookalike:</span> Looks similar to <span className="text-white">{result.heuristics.lookalike.match}</span> ({result.heuristics.lookalike.type})
                      </li>
                    )}
                    {result.heuristics.suspiciousKeywords && result.heuristics.suspiciousKeywords.length > 0 && (
                      <li>
                        <span className="font-semibold">Suspicious keywords:</span> {result.heuristics.suspiciousKeywords.map((kw: string) => <span key={kw} className="text-white">{kw}</span>).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                      </li>
                    )}
                    {result.heuristics.riskyTld && (
                      <li>
                        <span className="font-semibold">Risky TLD:</span> <span className="text-white">.{result.tld}</span>
                      </li>
                    )}
                    {result.heuristics.brandInSubdomain && (
                      <li>
                        <span className="font-semibold">Brand in subdomain:</span> <span className="text-white">{result.heuristics.brandInSubdomain}</span>
                      </li>
                    )}
                    {result.heuristics.domainAge && result.heuristics.domainAge.ageDays !== undefined && (
                      <li>
                        <span className="font-semibold">Domain age:</span> <span className="text-white">{result.heuristics.domainAge.ageDays} days</span>
                        {result.heuristics.domainAge.createdAt && (
                          <> (Registered: <span className="text-white">{(() => {
                            const d = result.heuristics.domainAge.createdAt;
                            const date = new Date(d);
                            return isNaN(date.getTime()) ? d : date.toLocaleDateString();
                          })()}</span>)</>
                        )}
                        {result.heuristics.domainAge.registrar && (
                          <> (Registrar: <span className="text-white">{result.heuristics.domainAge.registrar}</span>)</>
                        )}
                        {result.heuristics.domainAge.error && (
                          <> (<span className="text-pink-300">{result.heuristics.domainAge.error}</span>)</>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              )}
              {/* Blacklist Results */}
              {result.blacklist && (
                <div className="w-full bg-pink-900/20 border border-pink-400/30 rounded-lg p-3 mt-2">
                  <span className="font-bold text-pink-300">Blacklist Results</span>
                  <ul className="ml-2 mt-1 text-pink-100 text-sm">
                    <li>
                      <span className="font-semibold">CryptoScamDB:</span> <span className="text-white">{result.blacklist.scamdb ? result.blacklist.scamdb : 'Not listed'}</span>
                    </li>
                    <li>
                      <span className="font-semibold">Chainabuse:</span> <span className="text-white">{result.blacklist.chainabuse ? result.blacklist.chainabuse : 'Not listed'}</span>
                    </li>
                    <li>
                      <span className="font-semibold">PhishFort:</span> <span className="text-white">{result.blacklist.phishfort ? result.blacklist.phishfort : 'Not listed'}</span>
                    </li>
                    <li>
                      <span className="font-semibold">ScamSniffer:</span> <span className="text-white">{result.blacklist.scamsniffer ? result.blacklist.scamsniffer : 'Not listed'}</span>
                    </li>
                  </ul>
                </div>
              )}
              {/* Domain Details */}
              <div className="w-full bg-gray-900/30 border border-gray-700/30 rounded-lg p-3 mt-2 text-xs text-gray-300">
                <span className="font-bold text-gray-200">Domain Details</span>
                <ul className="ml-2 mt-1">
                  <li><span className="font-semibold">Domain:</span> <span className="text-white">{result.domain}</span></li>
                  {result.unicodeDomain && result.unicodeDomain !== result.domain && (
                    <li><span className="font-semibold">Unicode:</span> <span className="text-white">{result.unicodeDomain}</span></li>
                  )}
                  <li><span className="font-semibold">TLD:</span> <span className="text-white">.{result.tld}</span></li>
                  {result.subdomain && result.subdomain.length > 0 && (
                    <li><span className="font-semibold">Subdomain:</span> <span className="text-white">{result.subdomain}</span></li>
                  )}
                  {result.checkedAt && (
                    <li><span className="font-semibold">Checked at:</span> <span className="text-white">{new Date(result.checkedAt).toLocaleString()}</span></li>
                  )}
                </ul>
              </div>
              {/* Technical Details (collapsible) */}
              <details className="w-full mt-2 bg-gray-900/60 rounded-xl p-4 text-gray-200 text-xs font-mono border border-gray-700/40 shadow-inner">
                <summary className="cursor-pointer font-bold text-cyan-300">Technical Details</summary>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs">Raw API data</span>
                  <button
                    className="px-3 py-1 rounded bg-cyan-700 text-white text-xs font-bold hover:bg-cyan-500 transition ml-2"
                    onClick={() => {
                      const text = JSON.stringify(result, null, 2);
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
                        } catch {}
                      }
                    }}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-gray-200 bg-gray-900/40 rounded p-2 mt-1">
                  {JSON.stringify(Object.fromEntries(Object.entries(result).filter(([key]) => key !== 'analysisLog')), null, 2)}
                </pre>
              </details>
              {/* Analysis Log (collapsible) */}
              {result.analysisLog && result.analysisLog.length > 0 && (
                <details className="w-full mt-2 bg-gray-800/60 rounded-xl p-4 text-gray-200 text-xs font-mono border border-gray-700/40 shadow-inner">
                  <summary className="cursor-pointer font-bold text-yellow-300">Analysis Log</summary>
                  <ul className="list-disc ml-6 mt-2 text-yellow-100">
                    {result.analysisLog.map((log: string, i: number) => (
                      <li key={i}>{log}</li>
                    ))}
                  </ul>
                </details>
              )}
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