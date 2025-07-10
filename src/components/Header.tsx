'use client';
import React, { useState } from "react";
import GlassCard from "./GlassCard";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import LiveActivityNotice from "./LiveActivityNotice";
import CustomConnectButton from "@/components/CustomConnectButton";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Learn", href: "/tools/learn" },
  { name: "About", href: "/about" },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-transparent">
      <LiveActivityNotice />
      <GlassCard className="max-w-screen-xl mx-auto mt-6 flex items-center justify-between px-6 py-4 md:py-5 md:px-12 shadow-2xl backdrop-blur-2xl border-white/15 rounded-none md:rounded-2xl">
        {/* Logo */}
        <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-2xl md:text-3xl tracking-widest uppercase drop-shadow-lg select-none">
          <span className="font-orbitron">Web3<span className="text-lime-400">Security</span></span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-lg font-bold uppercase tracking-wider px-2 py-1 hover:text-cyan-400 transition-colors drop-shadow-md"
            >
              {link.name}
            </a>
          ))}
          <CustomConnectButton />
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-cyan-400 hover:text-cyan-200 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open navigation menu"
        >
          {mobileOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </GlassCard>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex flex-col items-end md:hidden transition-all">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-full h-full p-8 bg-[#181A20]/90 border-l-2 border-cyan-400/20 shadow-2xl flex flex-col gap-10 animate-slide-in-right"
          >
            <button
              className="self-end mb-4 text-cyan-400 hover:text-cyan-200"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white text-xl font-extrabold uppercase tracking-wider px-2 py-2 hover:text-cyan-400 transition-colors drop-shadow-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <CustomConnectButton />
          </motion.div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </header>
  );
};

export default Header; 