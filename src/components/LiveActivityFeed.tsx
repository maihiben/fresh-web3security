'use client';
import React, { useEffect, useRef, useState } from "react";
import GlassCard from "./GlassCard";
import { Wallet, Ban, ShieldAlert, FileText, BookOpen, User } from "lucide-react";

const locations = [
  // North America
  "New York", "Los Angeles", "Chicago", "San Francisco", "Toronto", "Vancouver", "Montreal", "Mexico City", "Houston", "Miami", "Seattle", "Boston", "Atlanta", "Dallas", "Austin", "Denver", "Washington D.C.",
  // South America
  "Buenos Aires", "Sao Paulo", "Rio de Janeiro", "Lima", "Santiago", "Bogota", "Caracas", "Quito", "Montevideo", "La Paz", "Asuncion", "Brasilia", "Medellin", "Cali",
  // Europe
  "London", "Berlin", "Paris", "Madrid", "Barcelona", "Rome", "Milan", "Amsterdam", "Zurich", "Vienna", "Prague", "Warsaw", "Budapest", "Brussels", "Lisbon", "Athens", "Dublin", "Stockholm", "Oslo", "Helsinki", "Copenhagen", "Edinburgh", "Manchester", "Frankfurt", "Hamburg", "Munich", "Geneva", "Lyon", "Marseille", "Antwerp", "Rotterdam", "Krakow", "Sofia", "Bucharest", "Belgrade", "Tallinn", "Vilnius", "Riga", "Luxembourg", "Monaco", "San Marino", "Valletta", "Reykjavik",
  // Africa
  "Cape Town", "Johannesburg", "Lagos", "Nairobi", "Cairo", "Casablanca", "Accra", "Kampala", "Addis Ababa", "Algiers", "Tunis", "Dakar", "Abidjan", "Luanda", "Kinshasa", "Harare", "Gaborone", "Maputo", "Windhoek", "Tripoli", "Khartoum", "Marrakech", "Rabat", "Freetown", "Bamako", "Lusaka", "Libreville", "Port Louis",
  // Asia
  "Tokyo", "Osaka", "Seoul", "Beijing", "Shanghai", "Hong Kong", "Singapore", "Bangkok", "Kuala Lumpur", "Jakarta", "Manila", "Hanoi", "Ho Chi Minh City", "Taipei", "Shenzhen", "Guangzhou", "Chengdu", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Islamabad", "Karachi", "Dhaka", "Kathmandu", "Colombo", "Phnom Penh", "Vientiane", "Ulaanbaatar", "Tashkent", "Almaty", "Baku", "Yerevan", "Tbilisi", "Dubai", "Abu Dhabi", "Riyadh", "Jeddah", "Doha", "Kuwait City", "Muscat", "Amman", "Jerusalem", "Tel Aviv", "Istanbul", "Ankara", "Tehran", "Baghdad", "Beirut", "Damascus", "Sanaa", "Aden",
  // Oceania
  "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Auckland", "Wellington", "Christchurch", "Suva", "Port Moresby", "Honiara", "Apia", "Nuku'alofa", "Pago Pago", "Noumea", "Papeete",
  // Crypto/Tech Hubs
  "Zug", "Tallinn", "San Jose", "Palo Alto", "Mountain View", "Austin", "Miami", "Hong Kong", "Singapore", "Dubai", "Seoul", "Tel Aviv", "London", "Berlin", "Toronto", "Zurich", "San Francisco", "New York", "Tokyo", "Shanghai", "Shenzhen", "Bangalore", "Sydney", "Paris", "Amsterdam", "Dublin", "Stockholm", "Lisbon", "Cape Town", "Buenos Aires", "Sao Paulo", "Moscow", "Istanbul", "Abu Dhabi", "Doha", "Kuala Lumpur", "Jakarta", "Bangkok", "Manila", "Lagos", "Nairobi", "Cairo", "Johannesburg", "Accra", "Casablanca", "Rabat", "Marrakech", "Lima", "Santiago", "Bogota", "Caracas", "Quito", "Montevideo", "La Paz", "Asuncion", "Brasilia", "Medellin", "Cali"
];

const actions = [
  {
    icon: <Wallet className="text-cyan-400 w-7 h-7 sm:w-6 sm:h-6" />,
    getText: () => `Wallet ${randomAddress()} scanned for vulnerabilities`,
  },
  {
    icon: <Ban className="text-pink-500 w-7 h-7 sm:w-6 sm:h-6" />,
    getText: () => `User from ${randomLocation()} revoked ${randomInt(1, 5)} token approval${Math.random() > 0.5 ? 's' : ''}`,
  },
  {
    icon: <ShieldAlert className="text-lime-400 w-7 h-7 sm:w-6 sm:h-6" />,
    getText: () => `Token ${randomAddress()} flagged as suspicious`,
  },
  {
    icon: <FileText className="text-purple-400 w-7 h-7 sm:w-6 sm:h-6" />,
    getText: () => `Smart contract ${randomAddress()} scanned: ${randomInt(1, 4)} risk${Math.random() > 0.5 ? 's' : ''} found`,
  },
  {
    icon: <BookOpen className="text-orange-400 w-7 h-7 sm:w-6 sm:h-6" />,
    getText: () => `New security guide published: '${randomGuide()}'`,
  },
  {
    icon: <User className="text-cyan-400 w-7 h-7 sm:w-6 sm:h-6" />,
    getText: () => `User from ${randomLocation()} analyzed wallet ${randomAddress()}`,
  },
];

const guides = [
  "How to Spot Fake Tokens",
  "Protecting Your Wallet from Scams",
  "Understanding Token Approvals",
  "Smart Contract Security 101",
  "Staying Safe on EVM Chains",
  "Top 5 Web3 Security Tips",
  "Avoiding Phishing Attacks in Web3",
  "How to Use Token Approval Checkers",
  "Best Practices for Cold Wallet Storage",
  "Recognizing Malicious Smart Contracts",
  "How to Revoke Dangerous Token Approvals",
  "Multi-Sig Wallets: What, Why, and How",
  "How to Read a Smart Contract Before Signing",
  "Common Web3 Scams and How to Avoid Them",
  "How to Report a Scam Token",
  "What to Do If Your Wallet Is Compromised",
  "How to Use Block Explorers for Security",
  "The Importance of Private Key Management",
  "How to Stay Safe on DeFi Platforms",
  "How to Secure Your NFT Assets",
  "How to Detect Honeypot Tokens",
  "How to Use Hardware Wallets",
  "How to Spot Rug Pulls",
  "How to Use Security Audits",
  "How to Avoid Fake Airdrops",
  "How to Check Contract Source Code",
  "How to Use Web3Security Tools Effectively",
  "How to Avoid Social Engineering Attacks",
  "How to Protect Your Seed Phrase",
  "How to Identify Suspicious Transactions",
  "How to Use Multi-Chain Security Tools",
  "How to Recognize Pump and Dump Schemes",
  "How to Avoid Gas Fee Scams",
  "How to Use ENS for Safer Transactions",
  "How to Secure Your DAO Participation",
  "How to Avoid Fake NFT Drops",
  "How to Use Layer 2 Solutions Securely",
  "How to Avoid Front-Running Attacks",
  "How to Use Decentralized Exchanges Safely",
  "How to Spot Fake Wallet Apps",
  "How to Use Two-Factor Authentication in Web3",
  "How to Avoid SIM Swap Attacks",
  "How to Use Watch-Only Wallets",
  "How to Secure Your Browser for Web3",
  "How to Avoid Malicious Browser Extensions",
  "How to Use DeFi Lending Platforms Safely",
  "How to Avoid Ponzi Schemes in Crypto",
  "How to Use Flash Loans Responsibly",
  "How to Avoid Whale Manipulation",
  "How to Use Privacy Coins Safely",
  "How to Avoid Crypto Dusting Attacks",
  "How to Use Decentralized Identity Solutions",
  "How to Avoid Fake Staking Platforms",
  "How to Use Web3 Password Managers",
  "How to Avoid Crypto Pump Groups",
  "How to Use On-Chain Analytics for Security",
  "How to Avoid Malicious Telegram Bots",
  "How to Use Multi-Wallet Strategies for Safety",
  "How to Avoid Crypto Romance Scams",
  "How to Use Web3 Security Audits",
  "How to Avoid Discord Phishing Attacks",
  "How to Use Token Whitelists and Blacklists",
  "How to Avoid Crypto Lottery Scams",
  "How to Use Web3 Security Communities",
  "How to Avoid Crypto Investment Scams",
  "How to Use Open Source Security Tools",
  "How to Avoid Crypto Mining Malware",
  "How to Use Web3 Security Plugins",
  "How to Avoid Crypto Giveaway Scams",
  "How to Use Web3 Security News Sources",
  "How to Avoid Crypto Ponzi DApps",
  "How to Use Web3 Security Certifications",
  "How to Avoid Crypto Pump and Dump Discords",
  "How to Use Web3 Security Forums",
  "How to Avoid Crypto Trading Bots Scams",
  "How to Use Web3 Security Podcasts",
  "How to Avoid Crypto Influencer Scams",
  "How to Use Web3 Security Bug Bounties",
  "How to Avoid Crypto Social Media Scams",
  "How to Use Web3 Security Incident Reports",
  "How to Avoid Crypto Exchange Exit Scams",
  "How to Use Web3 Security Best Practices"
];

function randomAddress() {
  const chars = "ABCDEF0123456789";
  return (
    "0x" +
    Array.from({ length: 2 }, () => chars[Math.floor(Math.random() * chars.length)]).join("") +
    "..." +
    Array.from({ length: 2 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  );
}
function randomLocation() {
  return locations[Math.floor(Math.random() * locations.length)];
}
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomGuide() {
  return guides[Math.floor(Math.random() * guides.length)];
}

const FEED_SIZE = 5;
const INTERVAL = 2500;

function generateActivities() {
  // Shuffle actions and pick FEED_SIZE
  const shuffled = actions
    .map((a) => ({ ...a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, FEED_SIZE);
  return shuffled.map((a) => ({ icon: a.icon, text: a.getText() }));
}

const LiveActivityFeed: React.FC = () => {
  const [visible, setVisible] = useState(() => generateActivities());
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(generateActivities());
    }, INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 max-w-screen-md mx-auto px-2 sm:px-4 md:px-0 py-8 md:py-12">
      <GlassCard className="p-0 overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-[#181A20]/80 to-[#0D0D0D]/80 px-3 sm:px-8 py-6 md:py-10">
          <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-widest text-cyan-400 mb-4 sm:mb-6 text-center drop-shadow-lg">
            Live Security Activity
          </h3>
          <div ref={feedRef} className="flex flex-col gap-2 sm:gap-4 min-h-[180px] sm:min-h-[220px] md:min-h-[260px]">
            {visible.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 sm:gap-4 bg-white/5 rounded-xl px-2 sm:px-4 py-2 sm:py-3 shadow-md ring-1 ring-cyan-400/10 hover:ring-cyan-400/40 transition-all duration-300 ease-in-out animate-fade-in"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <span>{activity.icon}</span>
                <span className="text-white font-semibold tracking-wide text-sm sm:text-base md:text-lg">
                  {activity.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </section>
  );
};

export default LiveActivityFeed; 