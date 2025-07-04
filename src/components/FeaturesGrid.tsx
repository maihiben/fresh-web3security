'use client';
import React from "react";
import FeatureCard from "./FeatureCard";
import { Wallet, Ban, ShieldAlert, FileText, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Wallet className="text-cyan-400 w-14 h-14" />,
    title: "Wallet Analyzer",
    description: "Scan your wallet for vulnerabilities, suspicious activity, and risky assets across EVM chains.",
  },
  {
    icon: <Ban className="text-pink-500 w-14 h-14" />,
    title: "Revoke Token Approvals",
    description: "Easily find and revoke dangerous or unnecessary token approvals to protect your assets.",
  },
  {
    icon: <ShieldAlert className="text-lime-400 w-14 h-14" />,
    title: "Detect Fake Tokens",
    description: "Identify scam tokens and avoid phishing attempts with real-time detection algorithms.",
  },
  {
    icon: <FileText className="text-purple-400 w-14 h-14" />,
    title: "Smart Contract Scanner",
    description: "Analyze smart contracts for vulnerabilities and get instant security insights before interacting.",
  },
  {
    icon: <BookOpen className="text-orange-400 w-14 h-14" />,
    title: "Learn Web3 Security",
    description: "Access guides and resources to boost your knowledge and stay safe in the Web3 ecosystem.",
  },
];

const FeaturesGrid: React.FC = () => {
  return (
    <section id="tools" className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 py-20">
      <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white text-center mb-14 drop-shadow-lg">
        Explore Our Security Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid; 