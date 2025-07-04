"use client";
import React from "react";
import { Users, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-44 pb-8">
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg flex items-center gap-3">
            <Users className="w-10 h-10 text-lime-400" />
            About Web3Security
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-2 max-w-2xl">
            Empowering the next generation of Web3 users to stay safe, informed, and in control. Our mission is to make blockchain security accessible, transparent, and user-friendly for everyone.
          </p>
        </div>
      </section>
      <div className="mb-16" />
      {/* Team & Vision Section */}
      <section className="w-full max-w-screen-lg mx-auto px-4 md:px-0 mb-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
              Our Vision
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-medium max-w-xl">
              We believe security is a right, not a privilege. Web3Security was founded by a team of blockchain enthusiasts, security researchers, and developers passionate about building a safer decentralized future. We combine cutting-edge technology, open-source intelligence, and community-driven insights to help you protect your assets and privacy.
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white mb-2 flex items-center gap-2">
              <Users className="w-7 h-7 text-lime-400" />
              Meet the Team
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-medium max-w-xl">
              Our team is global, diverse, and united by a shared commitment to Web3 safety. We work with leading security experts, auditors, and the open-source community to deliver trusted tools and resources for everyone.
            </p>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="w-full max-w-screen-md mx-auto px-4 md:px-0 mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-cyan-900/30 to-lime-900/30 border border-cyan-400/20 p-8 md:p-12 shadow-xl backdrop-blur-xl flex flex-col items-start gap-6">
          <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
            Want to collaborate or learn more?
          </h3>
          <p className="text-gray-300 text-base md:text-lg font-medium">
            Reach out to us at <a href="mailto:security@web3security.io" className="text-cyan-400 hover:underline font-bold">security@web3security.io</a> or explore our <a href="/tools/learn" className="text-lime-400 hover:underline font-bold">Learn</a> section for more resources.
          </p>
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