'use client';
import React, { useState } from "react";
import GlassCard from "./GlassCard";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "What is Web3Security?",
    a: "Web3Security is a platform that helps you analyze, monitor, and secure your crypto wallets and tokens across EVM-compatible blockchains.",
  },
  {
    q: "Do you store my wallet data?",
    a: "No. All analysis is performed client-side in your browser. We never store or access your wallet data.",
  },
  {
    q: "Which wallets are supported?",
    a: "You can connect using WalletConnect, MetaMask, Coinbase Wallet, Trust Wallet, Rainbow, Ledger, and more.",
  },
  {
    q: "What chains are supported?",
    a: "We support Ethereum, BNB Chain, Polygon, Avalanche, Arbitrum, Optimism, and other EVM-compatible networks.",
  },
  {
    q: "Is Web3Security free to use?",
    a: "Yes! All core security tools are free to use. Premium features may be added in the future.",
  },
  {
    q: "How do you detect fake tokens or scams?",
    a: "We use a combination of on-chain analysis, open-source threat intelligence, and community reporting to flag suspicious tokens and contracts.",
  },
  {
    q: "How can I learn more about Web3 security?",
    a: "Check out our Learn section for guides, tips, and best practices to stay safe in Web3.",
  },
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative z-10 max-w-screen-md mx-auto px-4 md:px-0 py-16">
      <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white text-center mb-12 drop-shadow-lg">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-6">
        {faqs.map((faq, idx) => (
          <GlassCard key={faq.q} className="p-0 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-6 py-5 md:py-6 text-left focus:outline-none group"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              <span className="font-orbitron text-lg md:text-xl font-bold uppercase tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                {faq.q}
              </span>
              {openIdx === idx ? (
                <ChevronUp className="w-6 h-6 text-cyan-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-cyan-400" />
              )}
            </button>
            <div
              id={`faq-answer-${idx}`}
              className={`px-6 pb-5 md:pb-6 text-gray-300 text-base md:text-lg transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              aria-hidden={openIdx !== idx}
            >
              {faq.a}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default FAQ; 