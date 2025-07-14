import { useEffect, useState } from 'react';
import { GoldRushClient } from '@covalenthq/client-sdk';
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

// Map EVM chainId to Alchemy endpoint and env key
const ALCHEMY_CONFIG: Record<number, { url: string; key: string }> = {
  1: { url: 'https://eth-mainnet.g.alchemy.com/v2/', key: process.env.NEXT_PUBLIC_ALCHEMY_ETH_MAINNET_KEY || '' },
  137: { url: 'https://polygon-mainnet.g.alchemy.com/v2/', key: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET_KEY || '' },
  42161: { url: 'https://arb-mainnet.g.alchemy.com/v2/', key: process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_MAINNET_KEY || '' },
  10: { url: 'https://opt-mainnet.g.alchemy.com/v2/', key: process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_MAINNET_KEY || '' },
  43114: { url: 'https://avax-mainnet.g.alchemy.com/v2/', key: process.env.NEXT_PUBLIC_ALCHEMY_AVALANCHE_MAINNET_KEY || '' },
  56: { url: 'https://bnb-mainnet.g.alchemy.com/v2/', key: process.env.NEXT_PUBLIC_ALCHEMY_BNB_MAINNET_KEY || '' },
  11155111: { url: 'https://eth-sepolia.g.alchemy.com/v2/', key: process.env.NEXT_PUBLIC_ALCHEMY_ETH_SEPOLIA_KEY || '' },
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
        const client = new GoldRushClient(COVALENT_API_KEY);
        let items: any[] = [];
        try {
          const resp = await client.BalanceService.getTokenBalancesForWalletAddress(
            chain as any,
            address
          );
          items = resp.data?.items || [];
        } catch (covalentErr: any) {
          // Covalent failed, try Alchemy fallback if supported
          const alchemy = ALCHEMY_CONFIG[chainId];
          if (!alchemy || !alchemy.key) throw new Error('Covalent and Alchemy not supported or missing API key for this chain');
          try {
            const alchemyUrl = `${alchemy.url}${alchemy.key}`;
            const alchemyResp = await axios.post(alchemyUrl, {
              jsonrpc: '2.0',
              id: 1,
              method: 'alchemy_getTokenBalances',
              params: [address],
            });
            const tokenBalances = alchemyResp.data?.result?.tokenBalances || [];
            // For each token, fetch metadata (symbol, name, decimals, logo) using alchemy_getTokenMetadata
            const tokensWithMeta: TokenBalance[] = await Promise.all(
              tokenBalances
                .filter((t: any) => t.tokenBalance !== '0x0')
                .map(async (t: any) => {
                  let meta = { symbol: '', name: '', decimals: 18, logo: '' };
                  try {
                    const metaResp = await axios.post(alchemyUrl, {
                      jsonrpc: '2.0',
                      id: 1,
                      method: 'alchemy_getTokenMetadata',
                      params: [t.contractAddress],
                    });
                    meta = metaResp.data?.result || meta;
                  } catch {}
                  return {
                    contractAddress: t.contractAddress,
                    name: meta.name,
                    symbol: meta.symbol,
                    logoUrl: meta.logo,
                    balance: parseInt(t.tokenBalance, 16).toString(),
                    decimals: meta.decimals,
                  };
                })
            );
            setTokens(tokensWithMeta);
            setLoading(false);
            return;
          } catch (alchemyErr: any) {
            throw new Error('Covalent and Alchemy both failed: ' + (alchemyErr.message || 'Unknown error'));
          }
        }
        // Covalent success: filter and map
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