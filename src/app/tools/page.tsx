"use client";
import React from "react";
import { Wallet, Ban, ShieldAlert, FileText, BookOpen } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Link from "next/link";

const tools = [
  {
    icon: <Wallet className="text-cyan-400 w-10 h-10 md:w-12 md:h-12" />,
    title: "Wallet Analyzer",
    description: "Scan your wallet for vulnerabilities, suspicious activity, and risky assets across EVM chains.",
    href: "/tools/wallet-analyzer",
    button: "Launch Analyzer"
  },
  {
    icon: <Ban className="text-pink-500 w-10 h-10 md:w-12 md:h-12" />,
    title: "Revoke Token Approvals",
    description: "Find and revoke dangerous or unnecessary token approvals to protect your assets.",
    href: "/tools/revoke-token-approvals",
    button: "Revoke Now"
  },
  {
    icon: <ShieldAlert className="text-lime-400 w-10 h-10 md:w-12 md:h-12" />,
    title: "Detect Fake Tokens",
    description: "Identify scam tokens and avoid phishing attempts with real-time detection algorithms.",
    href: "/tools/detect-fake-tokens",
    button: "Detect Tokens"
  },
  {
    icon: <FileText className="text-purple-400 w-10 h-10 md:w-12 md:h-12" />,
    title: "Smart Contract Scanner",
    description: "Analyze smart contracts for vulnerabilities and get instant security insights before interacting.",
    href: "/tools/smart-contract-scanner",
    button: "Scan Contract"
  },
  {
    icon: <BookOpen className="text-orange-400 w-10 h-10 md:w-12 md:h-12" />,
    title: "Learn Web3 Security",
    description: "Access guides and resources to boost your knowledge and stay safe in the Web3 ecosystem.",
    href: "/learn",
    button: "Start Learning"
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 pb-12 text-center">
        <h1 className="font-orbitron text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-4 drop-shadow-lg">
          Security Tools
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl font-medium mb-8 max-w-2xl mx-auto">
          All-in-one suite to protect your Web3 assets. Analyze, detect, and act on risks in real time.
        </p>
      </section>
      {/* Tools Grid */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24">
        <div className="rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md px-4 md:px-12 py-12">
          <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-cyan-400/10">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-6 flex-1 md:flex-[1_1_20%] py-6 md:py-0 px-0 md:px-8"
                style={{ minWidth: 0 }}
              >
                <div>{tool.icon}</div>
                <div className="flex flex-col items-start md:items-center w-full">
                  <span className="font-orbitron text-lg md:text-xl font-extrabold uppercase tracking-widest text-white mb-1 md:mb-2 text-left md:text-center">
                    {tool.title}
                  </span>
                  <span className="text-gray-300 text-sm md:text-[15px] md:leading-tight font-medium leading-relaxed max-w-xs md:max-w-[220px] text-left md:text-center mb-3 md:mb-4">
                    {tool.description}
                  </span>
                  <Link
                    href={tool.href}
                    className="inline-block px-5 py-2 rounded-lg bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-semibold shadow-cyan-400/30 shadow-md hover:bg-cyan-400/40 hover:text-white hover:shadow-cyan-400/60 transition-all duration-300 ease-in-out backdrop-blur-md ring-1 ring-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 tracking-wide text-sm md:text-base mt-2 md:mt-3 text-left md:text-center"
                  >
                    {tool.button}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 