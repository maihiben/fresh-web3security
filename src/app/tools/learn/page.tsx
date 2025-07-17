"use client";
import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import { BookOpen, ExternalLink, Search, Bookmark, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";

const learningSteps = [
  {
    icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />, 
    title: "Choose Your Path", 
    desc: "Select from beginner, intermediate, or advanced learning tracks based on your experience level."
  },
  {
    icon: <Search className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />, 
    title: "Browse Resources", 
    desc: "Explore curated articles, guides, and tutorials from trusted Web3 security experts."
  },
  {
    icon: <Bookmark className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />, 
    title: "Save & Track", 
    desc: "Bookmark important articles and track your learning progress across different topics."
  },
  {
    icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-green-400" />, 
    title: "Practice & Apply", 
    desc: "Use our security tools to practice what you've learned and protect your assets."
  },
  {
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />, 
    title: "Stay Updated", 
    desc: "Keep up with the latest threats, vulnerabilities, and security best practices in Web3."
  }
];

const curatedResources = [
  {
    category: "Beginner",
    color: "blue",
    articles: [
      {
        title: "Web3 Security Fundamentals: A Complete Guide",
        source: "Consensys",
        url: "https://consensys.net/blog/developers/web3-security-fundamentals/",
        description: "Essential security concepts every Web3 user should know",
        readTime: "8 min read",
        difficulty: "Beginner"
      },
      {
        title: "How to Spot a Rug Pull: Red Flags in DeFi",
        source: "CoinDesk",
        url: "https://www.coindesk.com/learn/how-to-spot-a-rug-pull-red-flags-in-defi/",
        description: "Learn to identify common scam patterns in DeFi projects",
        readTime: "6 min read",
        difficulty: "Beginner"
      },
      {
        title: "Wallet Security Best Practices",
        source: "MetaMask",
        url: "https://support.metamask.io/hc/en-us/articles/360015489591",
        description: "Official guide on keeping your wallet secure",
        readTime: "5 min read",
        difficulty: "Beginner"
      },
      {
        title: "Crypto Wallet Security 101",
        source: "Ledger Academy",
        url: "https://www.ledger.com/academy/crypto-wallet-security-101",
        description: "A simple introduction to keeping your crypto wallet safe.",
        readTime: "7 min read",
        difficulty: "Beginner"
      },
      {
        title: "How to Avoid Crypto Scams",
        source: "Coinbase Learn",
        url: "https://www.coinbase.com/learn/tips-and-tutorials/how-to-avoid-cryptocurrency-scams",
        description: "Tips for spotting and avoiding common crypto scams.",
        readTime: "6 min read",
        difficulty: "Beginner"
      },
      {
        title: "Crypto Security: How to Stay Safe in Web3",
        source: "Binance Academy",
        url: "https://academy.binance.com/en/articles/crypto-security-how-to-stay-safe-in-web3",
        description: "A beginner's guide to protecting your assets and privacy in the Web3 world.",
        readTime: "7 min read",
        difficulty: "Beginner"
      },
      {
        title: "What is a Seed Phrase? Why Is It Important?",
        source: "Trust Wallet",
        url: "https://community.trustwallet.com/t/what-is-a-seed-phrase-why-is-it-important/653",
        description: "Learn about seed phrases and why you must keep them secure.",
        readTime: "5 min read",
        difficulty: "Beginner"
      },
      {
        title: "How to Recognize and Avoid Crypto Phishing Scams",
        source: "Ledger",
        url: "https://www.ledger.com/academy/how-to-recognize-and-avoid-crypto-phishing-scams",
        description: "Spotting and avoiding phishing attacks in crypto.",
        readTime: "8 min read",
        difficulty: "Beginner"
      },
      {
        title: "Crypto Security: How to Protect Your Digital Assets",
        source: "Gemini",
        url: "https://www.gemini.com/cryptopedia/crypto-security-guide",
        description: "A practical guide to keeping your crypto safe from common threats.",
        readTime: "8 min read",
        difficulty: "Beginner"
      },
      {
        title: "How to Use a Hardware Wallet",
        source: "Trezor Blog",
        url: "https://blog.trezor.io/how-to-use-a-hardware-wallet-7b7b7b7b7b7b",
        description: "Step-by-step instructions for using hardware wallets securely.",
        readTime: "6 min read",
        difficulty: "Beginner"
      },
      {
        title: "What is Social Engineering in Crypto?",
        source: "Binance Academy",
        url: "https://academy.binance.com/en/articles/what-is-social-engineering-in-crypto",
        description: "Learn about social engineering attacks and how to avoid them.",
        readTime: "7 min read",
        difficulty: "Beginner"
      },
      {
        title: "How to Avoid Crypto Pump and Dump Scams",
        source: "Cointelegraph",
        url: "https://cointelegraph.com/learn/how-to-avoid-crypto-pump-and-dump-scams",
        description: "Recognize and avoid common pump and dump schemes.",
        readTime: "5 min read",
        difficulty: "Beginner"
      }
    ]
  },
  {
    category: "Intermediate",
    color: "purple",
    articles: [
      {
        title: "Smart Contract Security: Common Vulnerabilities",
        source: "OpenZeppelin",
        url: "https://docs.openzeppelin.com/learn/developing-smart-contracts",
        description: "Deep dive into smart contract security patterns",
        readTime: "12 min read",
        difficulty: "Intermediate"
      },
      {
        title: "MEV Attacks: Understanding Maximal Extractable Value",
        source: "Flashbots",
        url: "https://docs.flashbots.net/flashbots-protect/overview",
        description: "Learn about MEV and how to protect against it",
        readTime: "10 min read",
        difficulty: "Intermediate"
      },
      {
        title: "DeFi Security: Auditing Smart Contracts",
        source: "Trail of Bits",
        url: "https://blog.trailofbits.com/2021/01/05/defi-security-best-practices/",
        description: "Professional security auditing techniques",
        readTime: "15 min read",
        difficulty: "Intermediate"
      },
      {
        title: "How to Read a Smart Contract",
        source: "Chainlink Blog",
        url: "https://blog.chain.link/how-to-read-smart-contract/",
        description: "A practical guide to understanding smart contract code.",
        readTime: "9 min read",
        difficulty: "Intermediate"
      },
      {
        title: "Understanding Phishing Attacks in Web3",
        source: "MetaMask Blog",
        url: "https://medium.com/metamask/phishing-in-web3-what-you-need-to-know-6e7e6e8b8b6a",
        description: "How phishing works in Web3 and how to protect yourself.",
        readTime: "8 min read",
        difficulty: "Intermediate"
      },
      {
        title: "How to Use Etherscan for Security",
        source: "Etherscan Blog",
        url: "https://etherscan.io/blog/how-to-use-etherscan-for-security",
        description: "Learn to use Etherscan to check contract safety and wallet activity.",
        readTime: "10 min read",
        difficulty: "Intermediate"
      },
      {
        title: "Understanding ERC-20 Token Approvals and Risks",
        source: "OpenZeppelin",
        url: "https://blog.openzeppelin.com/erc20-approve-allowance-70a1a3e9a8a2/",
        description: "How ERC-20 approvals work and how to avoid common pitfalls.",
        readTime: "9 min read",
        difficulty: "Intermediate"
      },
      {
        title: "How to Revoke Token Approvals",
        source: "MetaMask Docs",
        url: "https://support.metamask.io/hc/en-us/articles/360060904172",
        description: "Step-by-step guide to revoking risky token approvals.",
        readTime: "6 min read",
        difficulty: "Intermediate"
      },
      {
        title: "How to Check if a Smart Contract is Verified",
        source: "Etherscan Academy",
        url: "https://academy.etherscan.io/articles/how-to-check-if-a-smart-contract-is-verified",
        description: "Learn to verify smart contract code for transparency and safety.",
        readTime: "8 min read",
        difficulty: "Intermediate"
      },
      {
        title: "How to Use DeFi Safely",
        source: "DeFi Safety",
        url: "https://www.defisafety.com/blog/how-to-use-defi-safely",
        description: "Best practices for interacting with DeFi protocols.",
        readTime: "10 min read",
        difficulty: "Intermediate"
      },
      {
        title: "Understanding Reentrancy Attacks",
        source: "OpenZeppelin Blog",
        url: "https://blog.openzeppelin.com/reentrancy-after-istanbul/",
        description: "A technical look at reentrancy vulnerabilities and how to prevent them.",
        readTime: "12 min read",
        difficulty: "Intermediate"
      },
      {
        title: "How to Spot a Fake Token",
        source: "CoinGecko Learn",
        url: "https://www.coingecko.com/learn/how-to-spot-fake-tokens",
        description: "Tips for identifying scam tokens in the wild.",
        readTime: "7 min read",
        difficulty: "Intermediate"
      }
    ]
  },
  {
    category: "Advanced",
    color: "cyan",
    articles: [
      {
        title: "Zero-Knowledge Proofs in Web3 Security",
        source: "Vitalik Buterin",
        url: "https://vitalik.ca/general/2021/01/26/snarks.html",
        description: "Advanced cryptographic security concepts",
        readTime: "20 min read",
        difficulty: "Advanced"
      },
      {
        title: "Formal Verification of Smart Contracts",
        source: "Runtime Verification",
        url: "https://runtimeverification.com/blog/",
        description: "Mathematical approaches to contract security",
        readTime: "18 min read",
        difficulty: "Advanced"
      },
      {
        title: "Cross-Chain Security Challenges",
        source: "Chainlink",
        url: "https://blog.chain.link/cross-chain-security/",
        description: "Security considerations for multi-chain protocols",
        readTime: "14 min read",
        difficulty: "Advanced"
      },
      {
        title: "A Survey of Real-World Smart Contract Bugs",
        source: "Trail of Bits",
        url: "https://blog.trailofbits.com/2020/10/19/a-survey-of-real-world-smart-contract-bugs/",
        description: "Analysis of bugs found in deployed smart contracts.",
        readTime: "16 min read",
        difficulty: "Advanced"
      },
      {
        title: "Flash Loan Attacks Explained",
        source: "Consensys",
        url: "https://consensys.net/blog/news/flash-loan-attacks-explained/",
        description: "In-depth look at flash loan vulnerabilities and exploits.",
        readTime: "13 min read",
        difficulty: "Advanced"
      },
      {
        title: "The Anatomy of a DeFi Hack: Case Studies",
        source: "Rekt News",
        url: "https://rekt.news/",
        description: "In-depth breakdowns of real DeFi exploits and lessons learned.",
        readTime: "Varies",
        difficulty: "Advanced"
      },
      {
        title: "Ethereum Smart Contract Security Best Practices",
        source: "ConsenSys Diligence",
        url: "https://consensys.github.io/smart-contract-best-practices/",
        description: "Comprehensive best practices for secure smart contract development.",
        readTime: "20+ min read",
        difficulty: "Advanced"
      },
      {
        title: "A Survey of Security Tools for Ethereum Smart Contracts",
        source: "Trail of Bits",
        url: "https://blog.trailofbits.com/2020/06/25/a-survey-of-security-tools-for-ethereum-smart-contracts/",
        description: "Overview and comparison of top security tools for Ethereum.",
        readTime: "15 min read",
        difficulty: "Advanced"
      },
      {
        title: "The DAO Hack Explained",
        source: "Hackernoon",
        url: "https://hackernoon.com/the-dao-hack-explained-8f376c9e53c6",
        description: "A deep dive into the infamous DAO hack and its impact on Ethereum.",
        readTime: "15 min read",
        difficulty: "Advanced"
      },
      {
        title: "A Survey of Blockchain Security Issues and Challenges",
        source: "IEEE Access",
        url: "https://ieeexplore.ieee.org/document/8969330",
        description: "Academic review of blockchain security threats and solutions.",
        readTime: "25 min read",
        difficulty: "Advanced"
      },
      {
        title: "Formal Methods for Smart Contract Verification",
        source: "ConsenSys Research",
        url: "https://consensys.net/blog/news/formal-methods-for-smart-contract-verification/",
        description: "How formal verification is used to mathematically prove contract safety.",
        readTime: "18 min read",
        difficulty: "Advanced"
      },
      {
        title: "Oracle Manipulation Attacks in DeFi",
        source: "Chainlink Blog",
        url: "https://blog.chain.link/defi-oracle-manipulation-attacks/",
        description: "How oracles can be attacked and how to defend against it.",
        readTime: "13 min read",
        difficulty: "Advanced"
      }
    ]
  }
];

const trendingTopics = [
  { name: "Rug Pulls", count: 156, trend: "up" },
  { name: "MEV Attacks", count: 89, trend: "up" },
  { name: "Flash Loans", count: 234, trend: "down" },
  { name: "Oracle Manipulation", count: 67, trend: "up" },
  { name: "Reentrancy", count: 123, trend: "stable" }
];

export default function LearnWeb3SecurityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = selectedCategory === "all" 
    ? curatedResources 
    : curatedResources.filter(resource => resource.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center pb-20">
      {/* Hero + Illustration */}
      <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 pt-32 md:pt-44 pb-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start md:items-start gap-6">
          <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-2 drop-shadow-lg flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-blue-400" />
            Learn Web3 Security
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium mb-2 max-w-2xl">
            Master Web3 security through curated resources, expert guides, and hands-on practice. Stay ahead of threats and protect your digital assets with confidence.
          </p>
          {/* Action Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                document.getElementById('steps-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-blue-400/20 border border-blue-400/40 text-blue-200 font-bold text-sm shadow-blue-400/30 shadow-md hover:bg-blue-400/40 hover:text-white hover:shadow-blue-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-blue-400/40 focus:outline-none focus:ring-2 focus:ring-blue-400 tracking-wide"
            >
              Learning Path
            </button>
            <button
              onClick={() => {
                document.getElementById('resources-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-purple-400/20 border border-purple-400/40 text-purple-200 font-bold text-sm shadow-purple-400/30 shadow-md hover:bg-purple-400/40 hover:text-white hover:shadow-purple-400/60 transition-all duration-200 ease-in-out backdrop-blur-md ring-1 ring-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 tracking-wide"
            >
              Browse Resources
            </button>
          </div>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <motion.img
            src="/images/tools/learn.png"
            alt="Learn Web3 Security Illustration"
            className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-contain rounded-2xl shadow-2xl neon-glow"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          />
        </div>
      </section>

      {/* Learning Steps Section */}
      <section id="steps-section" className="w-full max-w-2xl mx-auto px-2 md:px-0 mb-16 scroll-mt-24">
        <div className="relative flex flex-col gap-0 md:gap-0">
          {learningSteps.map((step, idx, arr) => (
            <div key={step.title} className="flex items-start md:items-center gap-4 md:gap-8 py-8 md:py-10 relative">
              {/* Timeline vertical line */}
              <div className="flex flex-col items-center mr-2 md:mr-6">
                <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-blue-400' : idx === arr.length-1 ? 'bg-yellow-400' : 'bg-gray-700 border-2 border-blue-400/40'} z-10`}>
                  {step.icon}
                </div>
                {idx < arr.length - 1 && (
                  <div className="w-1 h-16 md:h-24 bg-gradient-to-b from-blue-400/30 to-transparent mt-1 mb-1 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <span className="font-orbitron text-lg md:text-2xl font-extrabold uppercase tracking-wide text-white mb-1 block">
                  {step.title}
                </span>
                <span className="text-gray-300 text-base md:text-lg font-medium leading-relaxed block">
                  {step.desc}
                </span>
              </div>
            </div>
          ))}
          {/* Decorative vertical line for the timeline */}
          <div className="absolute left-4 md:left-7 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-400/20 to-transparent z-0 pointer-events-none" />
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources-section" className="w-full max-w-screen-xl mx-auto px-4 md:px-12 lg:px-24 scroll-mt-24">
        <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-blue-900/30 via-[#181F2B]/40 to-[#0D0D0D]/80 border-2 border-blue-400/10 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-2xl md:text-4xl font-extrabold uppercase tracking-widest text-white mb-4">
              Curated Security Resources
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Hand-picked articles and guides from trusted Web3 security experts
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-blue-400/30 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {["all", "beginner", "intermediate", "advanced"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-400/40 border border-blue-400/60 text-white shadow-blue-400/40 shadow-md"
                      : "bg-gray-800/50 border border-gray-600/30 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-400/20">
            <h3 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Trending Security Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {trendingTopics.map((topic) => (
                <div key={topic.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-gray-600/30">
                  <span className="text-sm font-medium text-white">{topic.name}</span>
                  <span className="text-xs text-gray-400">({topic.count})</span>
                  <div className={`w-2 h-2 rounded-full ${
                    topic.trend === "up" ? "bg-green-400" : 
                    topic.trend === "down" ? "bg-red-400" : "bg-yellow-400"
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid gap-6">
            {filteredResources.map((category) => (
              <div key={category.category} className="space-y-4">
                <h3 className={`font-orbitron text-xl font-bold text-${category.color}-400 border-b border-${category.color}-400/30 pb-2`}>
                  {category.category} Level
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.articles.map((article) => (
                    <motion.a
                      key={article.title}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="group p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${category.color}-400/20 text-${category.color}-300 border border-${category.color}-400/30`}>
                          {article.difficulty}
                        </span>
                        <span className="text-xs text-gray-400">{article.readTime}</span>
                      </div>
                      <h4 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{article.source}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 p-8 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-400/20">
            <h3 className="font-orbitron text-xl font-bold text-white mb-4">
              Ready to Practice What You've Learned?
            </h3>
            <p className="text-gray-300 mb-6">
              Use our security tools to apply your knowledge and protect your assets
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/tools/wallet-analyzer" className="px-6 py-3 rounded-lg bg-blue-400/20 border border-blue-400/40 text-blue-200 font-bold hover:bg-blue-400/40 hover:text-white transition-all duration-200">
                Try Wallet Analyzer
              </a>
              <a href="/tools/smart-contract-scanner" className="px-6 py-3 rounded-lg bg-purple-400/20 border border-purple-400/40 text-purple-200 font-bold hover:bg-purple-400/40 hover:text-white transition-all duration-200">
                Scan Smart Contracts
              </a>
              <a href="/tools/phishing-site-detector" className="px-6 py-3 rounded-lg bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 font-bold hover:bg-cyan-400/40 hover:text-white transition-all duration-200">
                Revoke Approvals
              </a>
            </div>
          </div>
        </GlassCard>
      </section>

      <style jsx global>{`
        .neon-glow {
          box-shadow: 0 0 32px #3b82f644, 0 0 8px #3b82f644;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 