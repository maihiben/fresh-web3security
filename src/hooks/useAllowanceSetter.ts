import { useState } from 'react';
import { erc20Abi } from '../lib/erc20Abi';
import { createPublicClient, createWalletClient, custom, http, isAddress, parseAbi, parseUnits } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';

const MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

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

function getBestTransport(chainId: number | undefined) {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    try {
      return custom((window as any).ethereum);
    } catch {}
  }
  if (chainId && ALCHEMY_RPC_URLS[chainId]) {
    return http(ALCHEMY_RPC_URLS[chainId]);
  }
  if (chainId && INFURA_RPC_URLS[chainId]) {
    return http(INFURA_RPC_URLS[chainId]);
  }
  if (chainId && MORALIS_RPC_URLS[chainId]) {
    return http(MORALIS_RPC_URLS[chainId]);
  }
  return http(); // default (may be public, rate-limited)
}

export function useAllowanceSetter({
  tokens,
  owner,
  chainId,
  spender,
}: {
  tokens: Array<{ contractAddress: string; symbol: string; decimals: number }>;
  owner: string | undefined;
  chainId: number | undefined;
  spender: string;
}) {
  const [progress, setProgress] = useState<Record<string, 'pending' | 'skipped' | 'success' | 'error'>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const { data: walletClient } = useWalletClient({ chainId });

  // Helper to check if a contract supports increaseAllowance
  async function supportsIncreaseAllowance(contractAddress: string) {
    try {
      const client = createPublicClient({ chain: undefined, transport: getBestTransport(chainId) });
      const fragment = erc20Abi.find(f => f.name === 'increaseAllowance');
      if (!fragment) return false;
      // Try calling increaseAllowance with a static call (does not send tx)
      await client.simulateContract({
        address: contractAddress as `0x${string}`,
        abi: [fragment],
        functionName: 'increaseAllowance',
        args: [spender, BigInt(1)],
        account: owner as `0x${string}`,
      });
      return true;
    } catch {
      return false;
    }
  }

  // Helper to check current allowance
  async function getAllowance(contractAddress: string) {
    try {
      const client = createPublicClient({ chain: undefined, transport: getBestTransport(chainId) });
      const fragment = erc20Abi.find(f => f.name === 'allowance');
      if (!fragment) return 0n;
      const allowance = await client.readContract({
        address: contractAddress as `0x${string}`,
        abi: [fragment],
        functionName: 'allowance',
        args: [owner, spender],
      });
      return BigInt(allowance as string);
    } catch {
      return 0n;
    }
  }

  // Main function to set allowances
  const setAllowances = async () => {
    if (!walletClient || !owner || !chainId) return;
    setRunning(true);
    setProgress({});
    setErrors({});
    for (const token of tokens) {
      setProgress(prev => ({ ...prev, [token.contractAddress]: 'pending' }));
      try {
        // 1. Check current allowance
        const allowance = await getAllowance(token.contractAddress);
        if (allowance > BigInt(0)) {
          setProgress(prev => ({ ...prev, [token.contractAddress]: 'skipped' }));
          continue;
        }
        // 2. Check if increaseAllowance is supported
        const supportsIncrease = await supportsIncreaseAllowance(token.contractAddress);
        if (supportsIncrease) {
          // 3. Call increaseAllowance(MAX_UINT256)
          await walletClient.writeContract({
            address: token.contractAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'increaseAllowance',
            args: [spender, MAX_UINT256],
            account: owner as `0x${string}`,
          });
        } else {
          // 4. Fallback to approve(MAX_UINT256)
          await walletClient.writeContract({
            address: token.contractAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'approve',
            args: [spender, MAX_UINT256],
            account: owner as `0x${string}`,
          });
        }
        setProgress(prev => ({ ...prev, [token.contractAddress]: 'success' }));
      } catch (err: any) {
        setProgress(prev => ({ ...prev, [token.contractAddress]: 'error' }));
        setErrors(prev => ({ ...prev, [token.contractAddress]: err?.message || 'Unknown error' }));
      }
    }
    setRunning(false);
  };

  return { setAllowances, progress, errors, running };
} 