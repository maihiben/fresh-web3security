'use client';
import React from "react";
import GlassCard from "./GlassCard";

const partners = [
  { name: "WalletConnect", img: "/images/partners/walletconnect.png" },
  { name: "MetaMask", img: "/images/partners/metamask.png" },
  { name: "Coinbase Wallet", img: "/images/partners/coinbase.png" },
  { name: "Trust Wallet", img: "/images/partners/trustwallet.png" },
  { name: "Rainbow", img: "/images/partners/rainbow.png" },
  { name: "Ledger", img: "/images/partners/ledger.png" },
  { name: "Safe (Gnosis)", img: "/images/partners/safe.png" },
  { name: "Argent", img: "/images/partners/argent.png" },
];

const Partners: React.FC = () => {
  return (
    <section className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 py-16">
      <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white text-center mb-12 drop-shadow-lg">
        Our Partners
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-10 items-center justify-items-center">
        {partners.map((partner) => (
          <GlassCard key={partner.name} className="flex flex-col items-center justify-center p-6 md:p-8 h-full w-full hover:ring-cyan-400/80 transition-all shadow-xl min-h-[120px]">
            <img
              src={partner.img}
              alt={partner.name}
              className="w-16 h-16 md:w-20 md:h-20 object-contain mb-3 drop-shadow-lg"
              loading="lazy"
            />
            <span className="text-white font-bold text-sm md:text-base text-center tracking-wide mt-1 opacity-80">
              {partner.name}
            </span>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default Partners; 