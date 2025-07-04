'use client';
import React from "react";
import GlassCard from "./GlassCard";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[70vh] pt-32 pb-12 px-4 md:px-12 bg-gradient-to-b from-[#0D0D0D] via-[#111111] to-[#181A20] overflow-hidden">
      {/* Left: Headline, Subheadline, CTA */}
      <div className="flex-1 flex flex-col items-start justify-center z-10 max-w-xl">
        <div className="mb-6">
          <span className="inline-flex items-center justify-center rounded-full bg-cyan-400/20 p-3 shadow-cyan-400/30 shadow-md mb-4">
            <ShieldCheck className="text-cyan-400 w-10 h-10" />
          </span>
          <h1 className="font-orbitron text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-4 leading-tight drop-shadow-lg">
            Secure Your <span className="text-cyan-400">Web3 Assets</span><br />with Confidence
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-8 max-w-lg">
            Analyze, Detect, and Revoke Risks in Real-Time.<br />
            <span className="text-cyan-400">Your security, our mission.</span>
          </p>
        </div>
        <motion.a
          href="#tools"
          whileHover={{ scale: 1.08, rotate: -2 }}
          className="inline-block px-10 py-4 rounded-xl bg-lime-400 text-black font-extrabold text-lg md:text-xl shadow-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 ease-in-out skew-x-[-8deg] tracking-wider uppercase border-4 border-lime-400 hover:border-cyan-400"
        >
          Launch Security Tools
        </motion.a>
      </div>
      {/* Right: Placeholder Image */}
      <div className="flex-1 flex items-center justify-center mt-12 md:mt-0 z-10 w-full md:w-auto">
        <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex items-center justify-center">
          <Image
            src="/images/furore.png"
            alt="3D Rocket Character"
            width={400}
            height={400}
            className="object-contain rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </div>
      {/* Futuristic SVG Glow Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#181A20" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#glow)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 