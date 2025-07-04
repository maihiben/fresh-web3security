"use client";
import React from "react";
import { Users, ShieldCheck, Globe, Zap, Lock, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-44 pb-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg flex items-center gap-3">
            <Users className="w-10 h-10 text-lime-400" />
            About Web3Security
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-2 max-w-2xl">
            Empowering the next generation of Web3 users to stay safe, informed, and in control. Our mission is to make blockchain security accessible, transparent, and user-friendly for everyone.
          </p>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <motion.img
            src="/images/about.png"
            alt="Web3Security Team Illustration"
            className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-contain rounded-2xl shadow-2xl neon-glow"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          />
        </div>
      </section>
      <div className="mb-16" />

      {/* Mission & Values Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 mb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white mb-4 flex items-center gap-3">
              <Target className="w-8 h-8 text-cyan-400" />
              Our Mission
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">
              Web3Security was born from a simple belief: security should be accessible to everyone, not just technical experts. We're building the most comprehensive suite of security tools for the decentralized web, combining cutting-edge blockchain analysis with intuitive user experiences.
            </p>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">
              Our platform serves as a bridge between complex blockchain security concepts and everyday users, providing real-time protection against scams, vulnerabilities, and malicious actors in the Web3 ecosystem.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white mb-4 flex items-center gap-3">
              <Globe className="w-8 h-8 text-lime-400" />
              Our Vision
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">
              We envision a future where Web3 security is as intuitive as checking your email. Where users can confidently explore DeFi, NFTs, and blockchain applications without fear of losing their assets to sophisticated attacks.
            </p>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">
              By democratizing security tools and knowledge, we're helping build a more trustworthy and resilient decentralized ecosystem that can scale to serve billions of users worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 mb-16">
        <h2 className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white mb-8 text-center">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-400/20">
            <ShieldCheck className="w-12 h-12 text-cyan-400" />
            <h3 className="font-orbitron text-lg font-bold uppercase tracking-wide text-white">
              Wallet Protection
            </h3>
            <p className="text-gray-300 text-sm font-medium">
              Advanced wallet analysis to detect vulnerabilities, suspicious activities, and potential threats across all EVM chains.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-gradient-to-br from-lime-900/20 to-transparent border border-lime-400/20">
            <Zap className="w-12 h-12 text-lime-400" />
            <h3 className="font-orbitron text-lg font-bold uppercase tracking-wide text-white">
              Real-Time Detection
            </h3>
            <p className="text-gray-300 text-sm font-medium">
              Instant identification of fake tokens, malicious contracts, and phishing attempts using our proprietary algorithms.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-400/20">
            <Lock className="w-12 h-12 text-purple-400" />
            <h3 className="font-orbitron text-lg font-bold uppercase tracking-wide text-white">
              Smart Contract Security
            </h3>
            <p className="text-gray-300 text-sm font-medium">
              Comprehensive smart contract analysis to identify vulnerabilities before you interact with potentially dangerous protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 mb-16">
        <h2 className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white mb-8 text-center">
          Why Choose Web3Security
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-white mb-2">Client-Side Security</h4>
                <p className="text-gray-300 text-sm">All analysis happens in your browser. We never store or access your private data.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-lime-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-white mb-2">Multi-Chain Support</h4>
                <p className="text-gray-300 text-sm">Protect your assets across Ethereum, BSC, Polygon, and all major EVM chains.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-white mb-2">Real-Time Updates</h4>
                <p className="text-gray-300 text-sm">Our threat database updates continuously to protect against the latest attacks.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-pink-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-white mb-2">Open Source Intelligence</h4>
                <p className="text-gray-300 text-sm">Leveraging community-driven insights and verified security research.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-white mb-2">Educational Resources</h4>
                <p className="text-gray-300 text-sm">Comprehensive guides and tutorials to help you understand Web3 security.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-white mb-2">Always Free Core Features</h4>
                <p className="text-gray-300 text-sm">Essential security tools remain free to ensure everyone can stay protected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-screen-md mx-auto px-4 md:px-0 mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-cyan-900/30 to-lime-900/30 border border-cyan-400/20 p-8 md:p-12 shadow-xl backdrop-blur-xl flex flex-col items-center text-center gap-6">
          <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white mb-2">
            Ready to Secure Your Web3 Journey?
          </h3>
          <p className="text-gray-300 text-base md:text-lg font-medium mb-4">
            Start protecting your assets today with our comprehensive security suite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/tools" className="px-6 py-3 rounded-lg bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-bold hover:bg-cyan-400/40 hover:text-white transition-all duration-200">
              Explore Tools
            </a>
            <a href="/tools/learn" className="px-6 py-3 rounded-lg bg-lime-400/20 border border-lime-400/40 text-lime-200 font-bold hover:bg-lime-400/40 hover:text-white transition-all duration-200">
              Learn Security
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .neon-glow {
          box-shadow: 0 0 32px #3b82f644, 0 0 8px #3b82f644;
        }
      `}</style>
    </div>
  );
} 