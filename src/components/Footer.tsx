import React from "react";
import GlassCard from "./GlassCard";
import { Github, Twitter, BookOpen } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent pb-6 pt-8">
      <GlassCard className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 md:py-6">
        {/* Left: Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <a
            href="https://github.com/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors font-medium"
          >
            <Github className="w-5 h-5" /> GitHub
          </a>
          <a
            href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors font-medium"
          >
            <Twitter className="w-5 h-5" /> Twitter
          </a>
          <a
            href="#" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors font-medium"
          >
            <BookOpen className="w-5 h-5" /> Documentation
          </a>
        </div>
        {/* Center: Contact */}
        <div className="text-gray-400 text-sm text-center">
          Contact: <a href="mailto:security@web3security.io" className="text-cyan-400 hover:underline">security@web3security.io</a>
        </div>
        {/* Right: Disclaimer */}
        <div className="text-gray-500 text-xs text-center md:text-right max-w-xs">
          <span className="block">Web3Security does <span className="text-cyan-400">not</span> store your wallet data. All analysis is performed client-side for your privacy and safety.</span>
        </div>
      </GlassCard>
    </footer>
  );
};

export default Footer; 