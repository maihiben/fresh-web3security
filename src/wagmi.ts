import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  bsc,
  avalanche,
  fantom,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Web3Security',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, optimism, arbitrum, bsc, avalanche, fantom, sepolia],
  ssr: true,
}); 