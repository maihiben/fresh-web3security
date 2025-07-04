'use client';
import React from "react";
import GlassCard from "./GlassCard";
import { BadgeCheck, Network, Activity } from "lucide-react";

const benefits = [
  {
    icon: <BadgeCheck className="text-cyan-400 w-14 h-14 mb-4" />,
    title: "Trusted Tech",
    description: "Built with industry-leading security standards and transparent, open-source code.",
  },
  {
    icon: <Network className="text-purple-400 w-14 h-14 mb-4" />,
    title: "Multi-chain Support",
    description: "Works seamlessly across Ethereum, BNB Chain, Polygon, and other EVM-compatible networks.",
  },
  {
    icon: <Activity className="text-lime-400 w-14 h-14 mb-4" />,
    title: "Real-time Monitoring",
    description: "Get instant alerts and up-to-date risk analysis for your wallets and tokens.",
  },
];

const WhyWeb3Security: React.FC = () => {
  return (
    <section id="about" className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 py-20">
      <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white text-center mb-16 drop-shadow-lg">
        Why Choose Web3Security?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {benefits.map((benefit) => (
          <GlassCard key={benefit.title} className="flex flex-col items-center text-center py-12 px-6 h-full hover:ring-cyan-400/80 transition-all shadow-2xl">
            {benefit.icon}
            <h3 className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white mb-4 drop-shadow-lg">
              {benefit.title}
            </h3>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-xs">
              {benefit.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default WhyWeb3Security; 