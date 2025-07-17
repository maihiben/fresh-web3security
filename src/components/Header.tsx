'use client';
import React, { useState } from "react";
import GlassCard from "./GlassCard";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import LiveActivityNotice from "./LiveActivityNotice";
import CustomConnectButton from "@/components/CustomConnectButton";

const navLinks = [
  { name: "Home", href: "/" },
  // Tools will be handled as a special case and rendered after Home
  { name: "Learn", href: "/tools/learn" },
  { name: "About", href: "/about" },
];

const toolsSubmenu = [
  { name: "Explore Tools", href: "/tools" },
  { name: "Wallet Analyzer", href: "/tools/wallet-analyzer" },
  { name: "Phishing Site Detector", href: "/tools/phishing-site-detector" },
  { name: "Smart Contract Scanner", href: "/tools/smart-contract-scanner" },
  { name: "Fake Token Detector", href: "/tools/detect-fake-tokens" },
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
        <nav className="hidden md:flex gap-10 items-center relative">
          {/* Home link first */}
          <a
            key={navLinks[0].name}
            href={navLinks[0].href}
            className="text-white text-lg font-bold uppercase tracking-wider px-2 py-1 hover:text-cyan-400 transition-colors drop-shadow-md"
          >
            {navLinks[0].name}
          </a>
          {/* Tools Dropdown second */}
          <div className="relative group">
            <button
              className="text-white text-lg font-bold uppercase tracking-wider px-2 py-1 hover:text-cyan-400 transition-colors drop-shadow-md flex items-center gap-1 focus:outline-none"
              tabIndex={0}
            >
              Tools
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-[#181A20] border border-cyan-400/20 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all z-30">
              <ul className="py-2">
                {toolsSubmenu.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="block px-5 py-2 text-white hover:text-cyan-400 hover:bg-cyan-400/10 font-semibold transition-colors text-base rounded-lg"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Render the rest of the navLinks except Home (0) and Tools (handled above) */}
          {navLinks.slice(1).map((link) => (
            link.name !== "Tools" ? (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-lg font-bold uppercase tracking-wider px-2 py-1 hover:text-cyan-400 transition-colors drop-shadow-md"
            >
              {link.name}
            </a>
            ) : null
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
            className="w-full max-w-full h-full p-8 bg-[#181A20]/90 border-l-2 border-cyan-400/20 shadow-2xl flex flex-col animate-slide-in-right"
          >
            <button
              className="self-end mb-4 text-cyan-400 hover:text-cyan-200"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={32} />
            </button>
            {/* Mobile Nav Links: Home first */}
            <a
              key={navLinks[0].name}
              href={navLinks[0].href}
              className="text-white text-xl font-extrabold uppercase tracking-wider px-2 py-4 hover:text-cyan-400 transition-colors drop-shadow-md"
              onClick={() => setMobileOpen(false)}
            >
              {navLinks[0].name}
            </a>
            {/* Tools Collapsible second */}
            <MobileToolsMenu />
            {/* Render the rest of the navLinks except Home (0) and Tools (handled above) */}
            {navLinks.slice(1).map((link) => (
              link.name !== "Tools" ? (
              <a
                key={link.name}
                href={link.href}
                  className="text-white text-xl font-extrabold uppercase tracking-wider px-2 py-4 hover:text-cyan-400 transition-colors drop-shadow-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
              ) : null
            ))}
            {/* Spacer to push connect button to bottom */}
            <div className="flex-1" />
            <div className="w-full flex-shrink-0">
            <CustomConnectButton />
            </div>
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

function MobileToolsMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full">
      <button
        className="flex items-center justify-between w-full text-white text-xl font-extrabold uppercase tracking-wider px-2 py-2 hover:text-cyan-400 transition-colors drop-shadow-md focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-tools-menu"
      >
        <span>Tools</span>
        <svg className={`w-5 h-5 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <ul id="mobile-tools-menu" className="pl-4 mt-1 border-l-2 border-cyan-400/20">
          {toolsSubmenu.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="block px-3 py-3 text-lg font-extrabold text-white hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors rounded-lg"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 