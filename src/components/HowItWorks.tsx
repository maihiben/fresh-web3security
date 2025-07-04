'use client';
import React from "react";
import GlassCard from "./GlassCard";
import { LogIn, Search, Ban, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: <LogIn className="w-12 h-12 text-cyan-400 mb-4" />,
    title: "Connect Wallet",
    description: "Securely connect your wallet using WalletConnect or top crypto wallets.",
  },
  {
    icon: <Search className="w-12 h-12 text-lime-400 mb-4" />,
    title: "Analyze",
    description: "Scan your wallet, tokens, and contracts for risks in real time.",
  },
  {
    icon: <Ban className="w-12 h-12 text-pink-500 mb-4" />,
    title: "Revoke/Act",
    description: "Easily revoke dangerous approvals or take action on threats.",
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-purple-400 mb-4" />,
    title: "Stay Safe",
    description: "Enjoy peace of mind with ongoing monitoring and security tips.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 py-20">
      <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white text-center mb-16 drop-shadow-lg">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {steps.map((step) => (
          <GlassCard key={step.title} className="flex flex-col items-center text-center py-12 px-6 h-full hover:ring-cyan-400/80 transition-all shadow-2xl">
            {step.icon}
            <h3 className="font-orbitron text-xl md:text-2xl font-extrabold uppercase tracking-widest text-white mb-4 drop-shadow-lg">
              {step.title}
            </h3>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-xs">
              {step.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks; 