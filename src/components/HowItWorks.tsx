'use client';
import React from "react";
import { LogIn, Search, Ban, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <LogIn className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />,
    title: "Connect Wallet",
    description: "Securely connect your wallet using WalletConnect or top crypto wallets.",
  },
  {
    icon: <Search className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />,
    title: "Analyze",
    description: "Scan your wallet, tokens, and contracts for risks in real time.",
  },
  {
    icon: <Ban className="w-8 h-8 md:w-10 md:h-10 text-pink-500" />,
    title: "Revoke/Act",
    description: "Easily revoke dangerous approvals or take action on threats.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />,
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative">
        {/* Glowing timeline line */}
        <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 -z-10">
          <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 blur-[2px] opacity-70 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col md:flex-row w-full items-center justify-between gap-12 md:gap-0">
          {steps.map((step, idx) => (
            <div key={step.title} className="flex flex-col items-center text-center w-full max-w-xs relative">
              {/* Connector for mobile */}
              {idx > 0 && (
                <div className="block md:hidden w-1 h-8 bg-gradient-to-b from-cyan-400 via-lime-400 to-purple-400 opacity-60 mb-2" />
              )}
              {/* Step circle with icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className={`flex items-center justify-center rounded-full border-4 border-cyan-400 bg-[#181A20] shadow-xl mb-4 md:mb-6 w-16 h-16 md:w-20 md:h-20 ring-2 ring-lime-400/40 hover:scale-105 hover:ring-purple-400/60 transition-all duration-300`}
              >
                {step.icon}
              </motion.div>
              <h3 className="font-orbitron text-lg md:text-xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg">
                {step.title}
              </h3>
              <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 