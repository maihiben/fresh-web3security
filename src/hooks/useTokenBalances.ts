import { useEffect, useState } from 'react';
import axios from 'axios';

export interface TokenBalance {
  contractAddress: string;
  name: string;
  symbol: string;
  logoUrl: string;
  balance: string;
  decimals: number;
}

interface UseTokenBalancesResult {
  tokens: TokenBalance[];
  loading: boolean;
  error: string | null;
}

const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;

// Map EVM chainId to Covalent chain name/id
const COVALENT_CHAIN_MAP: Record<number, string> = {
  1: 'eth-mainnet',
  56: 'bsc-mainnet',
  137: 'polygon-mainnet',
  42161: 'arbitrum-mainnet',
  10: 'optimism-mainnet',
  43114: 'avalanche-mainnet',
  11155111: 'eth-sepolia', // Sepolia
  97: 'bsc-testnet',      // BSC Testnet
};

export function useTokenBalances(address: string | undefined, chainId: number | undefined): UseTokenBalancesResult {
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address || !chainId || !COVALENT_API_KEY) {
      setTokens([]);
      setError(null);
      return;
    }
    const fetchTokens = async () => {
      setLoading(true);
      setError(null);
      try {
        const chain = COVALENT_CHAIN_MAP[chainId];
        if (!chain) throw new Error('Unsupported chain');
        const url = `https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?key=${COVALENT_API_KEY}`;
        const { data } = await axios.get(url);
        const items = data?.data?.items || [];
        const filtered = items.filter((item: any) => {
          // Only ERC-20 tokens with non-zero balance
          return (
            item.type === 'cryptocurrency' &&
            item.contract_address &&
            item.balance &&
            item.supports_erc?.includes('erc20') &&
            item.balance !== '0'
          );
        });
        setTokens(
          filtered.map((item: any) => ({
            contractAddress: item.contract_address,
            name: item.contract_name,
            symbol: item.contract_ticker_symbol,
            logoUrl: item.logo_url,
            balance: item.balance,
            decimals: item.contract_decimals,
          }))
        );
      } catch (err: any) {
        setError(err.message || 'Failed to fetch token balances');
        setTokens([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, [address, chainId]);

  return { tokens, loading, error };
} 