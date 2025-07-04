import React from "react";
import GlassCard from "./GlassCard";
import { BadgeCheck, Network, Activity } from "lucide-react";

const benefits = [
  {
    icon: <BadgeCheck className="text-cyan-400 w-8 h-8 mb-2" />,
    title: "Trusted Tech",
    description: "Built with industry-leading security standards and transparent, open-source code.",
  },
  {
    icon: <Network className="text-purple-400 w-8 h-8 mb-2" />,
    title: "Multi-chain Support",
    description: "Works seamlessly across Ethereum, BNB Chain, Polygon, and other EVM-compatible networks.",
  },
  {
    icon: <Activity className="text-lime-400 w-8 h-8 mb-2" />,
    title: "Real-time Monitoring",
    description: "Get instant alerts and up-to-date risk analysis for your wallets and tokens.",
  },
];

const WhyWeb3Security: React.FC = () => {
  return (
    <section id="about" className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 py-16">
      <h2 className="font-orbitron text-2xl md:text-3xl font-bold uppercase tracking-widest text-white text-center mb-10 drop-shadow-lg">
        Why Web3Security?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit) => (
          <GlassCard key={benefit.title} className="flex flex-col items-center text-center py-8 px-4 h-full hover:ring-cyan-400/60 transition-all">
            {benefit.icon}
            <h3 className="font-orbitron text-lg md:text-xl font-bold uppercase tracking-wide text-white mb-2 drop-shadow">
              {benefit.title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {benefit.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default WhyWeb3Security; 