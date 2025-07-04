import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GlassCard: Glassmorphism card with neon glow and rounded corners.
 * Use for feature cards, modals, panels, etc.
 */
const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-2xl
        bg-white/5
        border border-white/10
        shadow-lg
        backdrop-blur-md
        ring-1 ring-cyan-400/30
        hover:ring-2 hover:ring-cyan-400/60
        transition-all duration-300 ease-in-out
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard; 