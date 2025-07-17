export const ALCHEMY_RPC_URLS: Record<number, string> = {
  1: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ETH_MAINNET_KEY}`,
  137: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET_KEY}`,
  42161: `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_MAINNET_KEY}`,
  10: `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_MAINNET_KEY}`,
  43114: `https://avax-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_AVALANCHE_MAINNET_KEY}`,
  56: `https://bnb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_BNB_MAINNET_KEY}`,
  11155111: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ETH_SEPOLIA_KEY}`,
};

export const INFURA_RPC_URLS: Record<number, string> = {
  1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ETH_MAINNET_KEY}`,
  137: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_POLYGON_MAINNET_KEY}`,
  42161: `https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ARBITRUM_MAINNET_KEY}`,
  10: `https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_OPTIMISM_MAINNET_KEY}`,
  43114: `https://avalanche-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_AVALANCHE_MAINNET_KEY}`,
  11155111: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ETH_SEPOLIA_KEY}`,
};

export const MORALIS_RPC_URLS: Record<number, string> = {
  1: `https://ethereum.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  137: `https://polygon.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  42161: `https://arbitrum.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  10: `https://optimism.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  43114: `https://avalanche.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  56: `https://bsc.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
  11155111: `https://sepolia.public-node.moralis.io:8545` + (process.env.NEXT_PUBLIC_MORALIS_API_KEY ? `?api_key=${process.env.NEXT_PUBLIC_MORALIS_API_KEY}` : ''),
};

export function getBestRpcUrl(chainId: number): string | undefined {
  if (ALCHEMY_RPC_URLS[chainId]) return ALCHEMY_RPC_URLS[chainId];
  if (INFURA_RPC_URLS[chainId]) return INFURA_RPC_URLS[chainId];
  if (MORALIS_RPC_URLS[chainId]) return MORALIS_RPC_URLS[chainId];
  return undefined;
} 