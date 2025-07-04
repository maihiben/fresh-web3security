"use client";
import React from "react";
import ToolsShowcase from "../../components/ToolsShowcase";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-44 pb-8">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg flex items-center gap-3">
            <ShieldAlert className="w-10 h-10 text-cyan-400" />
            Security Tools
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-2 max-w-2xl">
            All-in-one suite to protect your Web3 assets. Analyze, detect, and act on risks in real time.
          </p>
        </div>
      </section>
      <div className="mb-16" />
      <ToolsShowcase />
    </div>
  );
} 