'use client';
import React from "react";
import { Wallet, Ban, ShieldAlert, FileText, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import Link from "next/link";

const tools = [
  {
    icon: <Wallet className="text-cyan-400 w-12 h-12 md:w-16 md:h-16" />,
    title: "Wallet Analyzer",
    description: "Scan your wallet for vulnerabilities, suspicious activity, and risky assets across EVM chains.",
    href: "/tools/wallet-analyzer",
    button: "Launch Analyzer",
    image: "/images/tools/wallet-analyzer.png"
  },
  {
    icon: <Ban className="text-pink-500 w-12 h-12 md:w-16 md:h-16" />,
    title: "Revoke Token Approvals",
    description: "Find and revoke dangerous or unnecessary token approvals to protect your assets.",
    href: "/tools/revoke-token-approvals",
    button: "Revoke Now",
    image: "/images/tools/revoke-approvals.png"
  },
  {
    icon: <ShieldAlert className="text-lime-400 w-12 h-12 md:w-16 md:h-16" />,
    title: "Detect Fake Tokens",
    description: "Identify scam tokens and avoid phishing attempts with real-time detection algorithms.",
    href: "/tools/detect-fake-tokens",
    button: "Detect Tokens",
    image: "/images/tools/detect-tokens.png"
  },
  {
    icon: <FileText className="text-purple-400 w-12 h-12 md:w-16 md:h-16" />,
    title: "Smart Contract Scanner",
    description: "Analyze smart contracts for vulnerabilities and get instant security insights before interacting.",
    href: "/tools/smart-contract-scanner",
    button: "Scan Contract",
    image: "/images/tools/contract-scanner.png"
  },
  {
    icon: <BookOpen className="text-orange-400 w-12 h-12 md:w-16 md:h-16" />,
    title: "Learn Web3 Security",
    description: "Access guides and resources to boost your knowledge and stay safe in the Web3 ecosystem.",
    href: "/learn",
    button: "Start Learning",
    image: "/images/tools/learn.png"
  },
];

const sectionVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ToolsShowcase: React.FC = () => {
  return (
    <div className="flex flex-col gap-20 md:gap-32">
      {tools.map((tool, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <motion.section
            key={tool.title}
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24"
          >
            {/* Left (or Right) - Text */}
            <div className={`flex-1 flex flex-col items-${isEven ? 'start' : 'end'} md:items-start gap-6 z-10 order-2 md:order-${isEven ? '1' : '2'}`}> 
              <GlassCard className="w-full max-w-xl p-8 md:p-12 shadow-2xl hover:ring-2 hover:ring-cyan-400/60 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  {tool.icon}
                  <span className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white drop-shadow-lg">
                    {tool.title}
                  </span>
                </div>
                <p className="text-gray-300 text-base md:text-lg font-medium mb-6">
                  {tool.description}
                </p>
                <Link
                  href={tool.href}
                  className="inline-block px-8 py-3 rounded-xl bg-lime-400 text-black font-extrabold text-lg shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] border-4 border-lime-400 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 drop-shadow-lg mt-2 md:mt-3 animate-pulse-on-hover"
                >
                  {tool.button}
                </Link>
              </GlassCard>
            </div>
            {/* Right (or Left) - 3D Image */}
            <div className={`flex-1 flex items-center justify-center order-1 md:order-${isEven ? '2' : '1'} mb-8 md:mb-0`}>
              <motion.img
                src={tool.image}
                alt={tool.title + " illustration"}
                className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-contain rounded-2xl shadow-2xl neon-glow"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              />
            </div>
            <style jsx global>{`
              .neon-glow {
                box-shadow: 0 0 32px #00ffff44, 0 0 8px #39ff1444;
              }
              .animate-pulse-on-hover:hover {
                animation: pulse 0.7s cubic-bezier(0.4,0,0.2,1);
              }
              @keyframes pulse {
                0% { box-shadow: 0 0 0 0 #39ff1444; }
                70% { box-shadow: 0 0 32px 8px #00ffff44; }
                100% { box-shadow: 0 0 0 0 #39ff1444; }
              }
            `}</style>
          </motion.section>
        );
      })}
    </div>
  );
};

export default ToolsShowcase; 