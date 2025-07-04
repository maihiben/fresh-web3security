"use client";
import React from "react";
import ToolsShowcase from "../../components/ToolsShowcase";

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-48 pb-12 text-center">
        <h1 className="font-orbitron text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-4 drop-shadow-lg">
          Security Tools
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl font-medium mb-8 max-w-2xl mx-auto">
          All-in-one suite to protect your Web3 assets. Analyze, detect, and act on risks in real time.
        </p>
      </section>
      <ToolsShowcase />
    </div>
  );
} 