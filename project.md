# Web3Security Project Overview

## Purpose & Vision
Web3Security is a modern, user-friendly platform designed to help users analyze, monitor, and secure their crypto wallets and tokens across EVM-compatible blockchains. The platform aims to make blockchain security accessible, transparent, and easy to use for everyone, from beginners to advanced users. It provides a suite of tools and educational resources to empower users to protect their digital assets and stay safe in the rapidly evolving Web3 ecosystem.

## Key Features
- **Wallet Analyzer:** Scan your wallet for vulnerabilities, suspicious activity, and risky assets across EVM chains.
- **Revoke Token Approvals:** Find and revoke dangerous or unnecessary token approvals to protect your assets.
- **Detect Fake Tokens:** Identify scam tokens and avoid phishing attempts with real-time detection algorithms.
- **Smart Contract Scanner:** Analyze smart contracts for vulnerabilities and get instant security insights before interacting.
- **Learn Web3 Security:** Access curated guides, articles, and resources to boost your knowledge and stay safe in Web3.

## Project Structure

```
web3-security/
├── public/
│   └── images/           # Static assets and tool illustrations
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Main layout (header/footer)
│   │   ├── globals.css   # Global styles
│   │   ├── page.tsx      # Home page
│   │   ├── about/
│   │   │   └── page.tsx  # About page
│   │   ├── tools/
│   │   │   ├── page.tsx  # Tools landing page (hero + showcase)
│   │   │   ├── wallet-analyzer/
│   │   │   │   └── page.tsx
│   │   │   ├── revoke-token-approvals/
│   │   │   │   └── page.tsx
│   │   │   ├── detect-fake-tokens/
│   │   │   │   └── page.tsx
│   │   │   ├── smart-contract-scanner/
│   │   │   │   └── page.tsx
│   │   │   └── learn/
│   │   │       └── page.tsx
│   └── components/
│       ├── Header.tsx         # Site header/navigation
│       ├── Footer.tsx         # Site footer
│       ├── HeroSection.tsx    # Home page hero section
│       ├── ToolsShowcase.tsx  # Tools grid for /tools
│       ├── FeaturesGrid.tsx   # Home page tools grid
│       ├── FeatureCard.tsx    # Card for each tool in grid
│       ├── FAQ.tsx            # Frequently Asked Questions section
│       ├── GlassCard.tsx      # Glassmorphism card wrapper
│       ├── LiveActivityFeed.tsx, LiveActivityNotice.tsx # Live feed components
│       ├── Partners.tsx, WhyWeb3Security.tsx, etc.      # Other home/landing sections
├── package.json, tsconfig.json, etc.
```

## Page & Component Breakdown

### Home Page (`src/app/page.tsx`)
- Features a bold hero section with a left-aligned headline, subheadline, and CTA, plus a right-side illustration.
- "Explore Our Security Tools" grid links to each tool.
- Additional sections: Live Activity Feed, Partners, Why Web3Security, FAQ, and more.

### Tools Page (`src/app/tools/page.tsx`)
- Hero section styled like individual tool pages, with icon, left-aligned text, and clear description.
- ToolsShowcase grid displays all available tools with launch buttons.

### Individual Tool Pages
- **Wallet Analyzer, Revoke Token Approvals, Detect Fake Tokens, Smart Contract Scanner**
  - Each has a hero section with icon, left-aligned text, and illustration.
  - Step-by-step instructions in a vertical timeline.
  - Interactive tool card for user input and results.

### Learn Web3 Security (`src/app/tools/learn/page.tsx`)
- Hero section with icon, left-aligned text, and illustration.
- Vertical timeline for learning path.
- Curated, filterable resource grid (beginner/intermediate/advanced).
- Trending topics and call-to-action.

### About Page (`src/app/about/page.tsx`)
- Hero section with icon, left-aligned text, and right-side illustration.
- Mission & Vision, What We Do, Why Choose Us, and CTA sections.
- No individual team member profiles, but strong focus on platform values and capabilities.

### Shared Components
- **Header/Footer:** Consistent, modern navigation and footer with responsive design and glassmorphism.
- **GlassCard:** Reusable glassy card wrapper for all major sections and tool cards.
- **FAQ:** Compact, interactive FAQ section.
- **LiveActivityFeed/Notice:** Real-time activity and alerts.
- **FeatureCard/FeaturesGrid:** Used for tool showcases and home page grids.

## Design System
- **Modern, dark, glassmorphic UI** with bold typography and vibrant accent colors.
- **Consistent hero sections** across all pages for a unified look.
- **Responsive design** for mobile and desktop.
- **Accessible, left-aligned layouts** for clarity and ease of use.

## Summary
Web3Security is a comprehensive, user-focused platform for Web3 safety. It combines powerful security tools, educational resources, and a modern design system to help users protect their assets and learn best practices in the decentralized world.
