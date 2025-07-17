'use client';
import React from "react";
import { Wallet, Ban, ShieldAlert, FileText, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Wallet className="text-cyan-400 w-10 h-10 md:w-12 md:h-12" />,
    title: "Wallet Analyzer",
    description: "Scan your wallet for vulnerabilities, suspicious activity, and risky assets across EVM chains.",
    href: "/tools/wallet-analyzer",
    button: "Analyze Wallet"
  },
  {
    icon: <ShieldAlert className="text-yellow-400 w-10 h-10 md:w-12 md:h-12" />,
    title: "Phishing Site Detector",
    description: "Check if a website is a known phishing site or scam before connecting your wallet. Stay safe from web3 scams.",
    href: "/tools/phishing-site-detector",
    button: "Scan Website"
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
    href: "/tools/learn",
    button: "Start Learning"
  },
];

const FeaturesGrid: React.FC = () => {
  return (
    <section id="tools" className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 py-20">
      <div className="rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md px-4 md:px-12 py-12">
        <h2 className="font-orbitron text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white text-center mb-12 drop-shadow-lg">
          Explore Our Security Tools
        </h2>
        <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-cyan-400/10">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-6 flex-1 md:flex-[1_1_20%] py-6 md:py-0 px-0 md:px-8"
              style={{ minWidth: 0 }}
            >
              <div>{feature.icon}</div>
              <div className="flex flex-col items-start md:items-center w-full">
                <span className="font-orbitron text-lg md:text-xl font-extrabold uppercase tracking-widest text-white mb-1 md:mb-2 text-left md:text-center">
                  {feature.title}
                </span>
                <span className="text-gray-300 text-sm md:text-[15px] md:leading-tight font-medium leading-relaxed max-w-xs md:max-w-[220px] text-left md:text-center mb-3 md:mb-4">
                  {feature.description}
                </span>
                <a
                  href={feature.href}
                  className="inline-block px-5 py-2 rounded-lg bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-semibold shadow-cyan-400/30 shadow-md hover:bg-cyan-400/40 hover:text-white hover:shadow-cyan-400/60 transition-all duration-300 ease-in-out backdrop-blur-md ring-1 ring-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 tracking-wide text-sm md:text-base mt-2 md:mt-3 text-left md:text-center"
                >
                  {feature.button}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid; 