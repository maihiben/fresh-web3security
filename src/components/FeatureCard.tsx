'use client';
import React from "react";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08, boxShadow: "0 0 32px #39FF14, 0 0 8px #00FFFF" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <GlassCard className="flex flex-col items-center text-center h-full min-h-[260px] group cursor-pointer hover:ring-lime-400/80 p-8 md:p-10 shadow-2xl">
        <div className="mb-6 text-5xl group-hover:animate-pulse drop-shadow-lg">{icon}</div>
        <h3 className="font-orbitron text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white mb-4 drop-shadow-lg">
          {title}
        </h3>
        <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-xs">
          {description}
        </p>
      </GlassCard>
    </motion.div>
  );
};

export default FeatureCard; 