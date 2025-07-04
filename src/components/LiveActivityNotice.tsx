'use client';
import React, { useEffect, useState } from "react";
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

const actions = [
  {
    icon: <Wallet className="text-cyan-400 w-5 h-5" />,
    getText: () => `Wallet ${randomAddress()} scanned for vulnerabilities`,
  },
  {
    icon: <Ban className="text-pink-500 w-5 h-5" />,
    getText: () => `User from ${randomLocation()} revoked ${randomInt(1, 5)} token approval${Math.random() > 0.5 ? 's' : ''}`,
  },
  {
    icon: <ShieldAlert className="text-lime-400 w-5 h-5" />,
    getText: () => `Token ${randomAddress()} flagged as suspicious`,
  },
  {
    icon: <FileText className="text-purple-400 w-5 h-5" />,
    getText: () => `Smart contract ${randomAddress()} scanned: ${randomInt(1, 4)} risk${Math.random() > 0.5 ? 's' : ''} found`,
  },
  {
    icon: <BookOpen className="text-orange-400 w-5 h-5" />,
    getText: () => `New security guide: '${randomGuide()}'`,
  },
  {
    icon: <User className="text-cyan-400 w-5 h-5" />,
    getText: () => `User from ${randomLocation()} analyzed wallet ${randomAddress()}`,
  },
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

const INTERVAL = 3500;

function getRandomActivity() {
  const a = actions[Math.floor(Math.random() * actions.length)];
  return { icon: a.icon, text: a.getText() };
}

const LiveActivityNotice: React.FC = () => {
  const [activity, setActivity] = useState(getRandomActivity());
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setActivity(getRandomActivity());
        setShow(true);
      }, 400);
    }, INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-xs w-[90vw] sm:w-80 pointer-events-none select-none">
      <div
        className={`transition-all duration-500 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex items-center gap-3 rounded-xl bg-white/10 border border-cyan-400/20 shadow-lg backdrop-blur-md px-4 py-3 ring-1 ring-cyan-400/30 animate-glow`}
      >
        <span>{activity.icon}</span>
        <span className="text-white font-semibold tracking-wide text-sm leading-tight">
          {activity.text}
        </span>
      </div>
      <style jsx global>{`
        .animate-glow {
          box-shadow: 0 0 12px #00ffff44, 0 0 2px #39ff1444;
        }
      `}</style>
    </div>
  );
};

export default LiveActivityNotice; 