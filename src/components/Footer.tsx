'use client';
import React from "react";
import GlassCard from "./GlassCard";
import { Github, Twitter, BookOpen } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent pb-10 pt-16">
      <GlassCard className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-8 py-10 md:py-8 shadow-2xl border-white/15 rounded-none md:rounded-2xl">
        {/* Left: Links */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <a
            href="https://github.com/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 text-white text-lg font-extrabold uppercase tracking-wider px-3 py-2 hover:text-cyan-400 transition-colors drop-shadow-lg"
          >
            <Github className="w-7 h-7" /> GitHub
          </a>
          <a
            href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 text-white text-lg font-extrabold uppercase tracking-wider px-3 py-2 hover:text-cyan-400 transition-colors drop-shadow-lg"
          >
            <Twitter className="w-7 h-7" /> Twitter
          </a>
          <a
            href="#" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 text-white text-lg font-extrabold uppercase tracking-wider px-3 py-2 hover:text-cyan-400 transition-colors drop-shadow-lg"
          >
            <BookOpen className="w-7 h-7" /> Documentation
          </a>
        </div>
        {/* Center: Contact */}
        <div className="text-gray-300 text-base md:text-lg font-medium text-center">
          Contact: <a href="mailto:security@web3security.io" className="text-cyan-400 hover:underline font-bold">security@web3security.io</a>
        </div>
        {/* Right: Disclaimer */}
        <div className="text-gray-500 text-xs md:text-sm text-center md:text-right max-w-xs">
          <span className="block">Web3Security does <span className="text-cyan-400 font-bold">not</span> store your wallet data. All analysis is performed client-side for your privacy and safety.</span>
        </div>
      </GlassCard>
    </footer>
  );
};

export default Footer; 