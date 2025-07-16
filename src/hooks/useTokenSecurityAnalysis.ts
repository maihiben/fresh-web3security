import { useState } from 'react';
import { ethers } from 'ethers';

export type TokenStatus = 'secure' | 'compromised' | 'loading';
export interface SecurityAnalysisResult {
  risks: number;
  message: string;
  status: 'secure' | 'compromised';
}

const ALCHEMY_RPC_URLS: Record<number, string> = {
  1: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ETH_MAINNET_KEY}`,
  137: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET_KEY}`,
  42161: `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_MAINNET_KEY}`,
  10: `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_MAINNET_KEY}`,
  43114: `https://avax-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_AVALANCHE_MAINNET_KEY}`,
  56: `https://bnb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_BNB_MAINNET_KEY}`,
  11155111: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ETH_SEPOLIA_KEY}`,
};
const INFURA_RPC_URLS: Record<number, string> = {
  1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ETH_MAINNET_KEY}`,
  137: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_POLYGON_MAINNET_KEY}`,
  42161: `https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ARBITRUM_MAINNET_KEY}`,
  10: `https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_OPTIMISM_MAINNET_KEY}`,
  43114: `https://avalanche-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_AVALANCHE_MAINNET_KEY}`,
  11155111: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ETH_SEPOLIA_KEY}`,
};
const MORALIS_RPC_URLS: Record<number, string> = {
  1: `https://ethereum.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  137: `https://polygon.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  42161: `https://arbitrum.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  10: `https://optimism.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  43114: `https://avalanche.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  56: `https://bsc.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  11155111: `https://sepolia.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
};

export function useTokenSecurityAnalysis({
  tokens,
  owner,
  chainId,
  isConnected,
  spender,
}: {
  tokens: Array<{ contractAddress: string; balance: string }>;
  owner: string | undefined;
  chainId: number | undefined;
  isConnected: boolean;
  spender: string;
}) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | SecurityAnalysisResult>(null);
  const [tokenStatuses, setTokenStatuses] = useState<Record<string, TokenStatus> | null>(null);

  const analyze = async () => {
    setAnalyzing(true);
    setResult(null);
    setTokenStatuses(null);
    try {
      if (!owner || !chainId || tokens.length === 0) {
        setResult({ risks: 0, message: 'Your tokens on this network are secure! No compromise or threats found. Make sure to check other networks and use our learning tools to stay updated on latest wallet security practices', status: 'secure' });
        setAnalyzing(false);
        return;
      }
      let provider;
      try {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
          provider = new ethers.BrowserProvider((window as any).ethereum);
        } else if (chainId && ALCHEMY_RPC_URLS[chainId]) {
          provider = new ethers.JsonRpcProvider(ALCHEMY_RPC_URLS[chainId]);
          try { await provider.getBlockNumber(); } catch (e) { provider = undefined; }
        }
        if (!provider && chainId && INFURA_RPC_URLS[chainId]) {
          provider = new ethers.JsonRpcProvider(INFURA_RPC_URLS[chainId]);
          try { await provider.getBlockNumber(); } catch (e) { provider = undefined; }
        }
        if (!provider && chainId && MORALIS_RPC_URLS[chainId]) {
          provider = new ethers.JsonRpcProvider(MORALIS_RPC_URLS[chainId]);
          try { await provider.getBlockNumber(); } catch (e) { provider = undefined; }
        }
        if (!provider) {
          provider = ethers.getDefaultProvider();
        }
      } catch (e) {
        setResult({ risks: 0, message: 'Could not connect to provider.', status: 'compromised' });
        setAnalyzing(false);
        return;
      }
      const ERC20_ABI = [
        'function allowance(address owner, address spender) view returns (uint256)'
      ];
      const statuses: Record<string, TokenStatus> = {};
      let compromisedCount = 0;
      await Promise.all(tokens.map(async (token) => {
        try {
          console.log('[SecurityAnalysis] Checking token:', {
            owner,
            spender,
            contractAddress: token.contractAddress,
            chainId,
            token
          });
          const contract = new ethers.Contract(token.contractAddress, ERC20_ABI, provider);
          const allowance = await contract.allowance(owner, spender);
          // console.log(`[SecurityAnalysis] Allowance for token ${token.contractAddress}:`, allowance?.toString?.());
          if (
            allowance &&
            (
              (typeof allowance === 'bigint' && allowance > 0n) ||
              (typeof allowance.gt === 'function' && allowance.gt(0))
            )
          ) {
            statuses[token.contractAddress] = 'secure';
          } else {
            statuses[token.contractAddress] = 'compromised';
            compromisedCount++;
          }
        } catch (e) {
          // console.error(`[SecurityAnalysis] Error checking allowance for token ${token.contractAddress}:`, e);
          statuses[token.contractAddress] = 'compromised';
          compromisedCount++;
        }
      }));
      setTokenStatuses(statuses);
      setResult(
        compromisedCount > 0
          ? { risks: compromisedCount, message: 'Warning: One or more tokens are compromised. Please review the technical analysis below and safeguard your assets from malicious contracts.', status: 'compromised' }
          : { risks: 0, message: 'Your tokens on this network are secure! No compromise or threats found. Make sure to check other networks and use our learning tools to stay updated on latest wallet security practices', status: 'secure' }
      );
      setAnalyzing(false);
    } catch (err: any) {
      setResult({ risks: 0, message: err?.message || 'Unknown error during analysis', status: 'compromised' });
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setResult(null);
    setTokenStatuses(null);
  };

  return { analyzing, result, tokenStatuses, analyze, reset };
} 