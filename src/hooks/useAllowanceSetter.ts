import { useState } from 'react';
import { erc20Abi } from '../lib/erc20Abi';
import { createPublicClient, createWalletClient, custom, http, isAddress, parseAbi, parseUnits } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';

const MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

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
      const client = createPublicClient({ chain: undefined, transport: http() });
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
      const client = createPublicClient({ chain: undefined, transport: http() });
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