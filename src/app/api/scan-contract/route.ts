import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { getBestRpcUrl } from '@/lib/rpcUrls';

const ENGINE_NAME = 'Web3Security Contract Scanner';

const ETHERSCAN_API: Record<number, { url: string; key: string | undefined }> = {
  1: { url: 'https://api.etherscan.io/api', key: process.env.ETHERSCAN_API_KEY },
  137: { url: 'https://api.polygonscan.com/api', key: process.env.POLYGONSCAN_API_KEY },
  56: { url: 'https://api.bscscan.com/api', key: process.env.BSCSCAN_API_KEY },
  10: { url: 'https://api-optimistic.etherscan.io/api', key: process.env.OPTIMISTIC_ETHERSCAN_API_KEY },
  42161: { url: 'https://api.arbiscan.io/api', key: process.env.ARBISCAN_API_KEY },
  43114: { url: 'https://api.snowtrace.io/api', key: process.env.SNOWTRACE_API_KEY },
  11155111: { url: 'https://api-sepolia.etherscan.io/api', key: process.env.ETHERSCAN_API_KEY },
};

const DANGEROUS_FUNCTIONS = [
  { name: 'selfdestruct', description: 'This function can destroy the contract and remove its code and state from the blockchain.' },
  { name: 'mint', description: 'This function can create new tokens, which may affect the token supply and value.' },
  { name: 'pause', description: 'This function can pause contract operations, potentially freezing user funds.' },
  { name: 'blacklist', description: 'This function can block certain addresses from interacting with the contract.' },
  { name: 'upgradeTo', description: 'This function can upgrade the contract logic, potentially changing its behavior.' },
  { name: 'setOwner', description: 'This function can change the contract owner/admin.' },
  { name: 'transferOwnership', description: 'This function can transfer contract ownership to another address.' },
];

function isEIP1967Proxy(bytecode: string): boolean {
  return /363d3d373d3d3d363d73/i.test(bytecode) || /delegatecall/i.test(bytecode);
}

function isEIP1167MinimalProxy(bytecode: string): boolean {
  return /363d3d373d3d3d363d73[a-fA-F0-9]{40}5af43d82803e903d91602b57fd5bf3/i.test(bytecode);
}

async function getOwnerAddress(contract: string, provider: ethers.JsonRpcProvider) {
  const ownerAbi = [
    'function owner() view returns (address)',
    'function getOwner() view returns (address)'
  ];
  for (const abi of ownerAbi) {
    try {
      const contractObj = new ethers.Contract(contract, [abi], provider);
      const owner = await contractObj[abi.includes('getOwner') ? 'getOwner' : 'owner']();
      if (ethers.isAddress(owner)) return owner;
    } catch {}
  }
  return null;
}

async function checkEtherscanVerified(contract: string, chainId: number): Promise<{ verified: boolean | null, abi: any[] | null }> {
  const api = ETHERSCAN_API[chainId];
  if (!api || !api.key) return { verified: null, abi: null };
  try {
    const url = `${api.url}?module=contract&action=getsourcecode&address=${contract}&apikey=${api.key}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === '1' && data.result && data.result[0]) {
      const sourceCode = data.result[0].SourceCode;
      const abiRaw = data.result[0].ABI;
      if (sourceCode && abiRaw && abiRaw !== 'Contract source code not verified') {
        let abi: any[] = [];
        try { abi = JSON.parse(abiRaw); } catch {}
        return { verified: true, abi };
      }
      return { verified: false, abi: null };
    }
    return { verified: false, abi: null };
  } catch {
    return { verified: null, abi: null };
  }
}

function findDangerousFunctions(abi: any[]): { found: string[], issues: any[] } {
  const found: string[] = [];
  const issues: any[] = [];
  if (!Array.isArray(abi)) return { found, issues };
  for (const fn of DANGEROUS_FUNCTIONS) {
    const match = abi.find((item: any) => item.type === 'function' && item.name && item.name.toLowerCase().includes(fn.name));
    if (match) {
      found.push(fn.name);
      issues.push({
        type: `Dangerous Function: ${fn.name}`,
        description: `${fn.description} Function signature: ${match.name}(${(match.inputs || []).map((i: any) => i.type).join(', ')})`,
      });
    }
  }
  return { found, issues };
}

export async function POST(req: NextRequest) {
  try {
    const { contract, chainId } = await req.json();
    if (!contract || !chainId) {
      return NextResponse.json({ status: 'error', message: 'No contract address or chainId provided.' }, { status: 400 });
    }
    const rpcUrl = getBestRpcUrl(Number(chainId));
    if (!rpcUrl) {
      return NextResponse.json({ status: 'error', message: 'Unsupported chain.' }, { status: 400 });
    }
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    let riskLevel = 'unknown';
    let issues: any[] = [];
    let isProxy = false;
    let verified: boolean | null = null;
    let owner: string | null = null;
    let abi: any[] | null = null;
    let dangerousFunctions: string[] = [];
    // 1. Fetch bytecode
    let bytecode = '';
    let bytecodeLength = 0;
    try {
      bytecode = await provider.getCode(contract);
      bytecodeLength = bytecode.length;
    } catch (e) {
      return NextResponse.json({ status: 'error', message: 'Could not fetch contract bytecode.', details: e }, { status: 500 });
    }
    if (!bytecode || bytecode === '0x') {
      issues.push({ type: 'Not a Contract', description: 'No contract found at this address.' });
      riskLevel = 'high';
      return NextResponse.json({
        status: 'risky',
        message: `${ENGINE_NAME}: No contract found at this address. This may happen if you are scanning on the wrong chain. Please double-check the address and network. If you are sure the network is correct, this address is considered high risk and may be a scam, a typo, or not a contract address.`,
        riskLevel,
        details: {
          contract,
          chainId,
          bytecodeLength,
          isProxy: false,
          verified: null,
          owner: null,
          abi: null,
          dangerousFunctions: [],
          issues
        },
        engine: ENGINE_NAME,
      });
    }
    // 2. Proxy detection
    if (isEIP1967Proxy(bytecode) || isEIP1167MinimalProxy(bytecode)) {
      isProxy = true;
      issues.push({ type: 'Proxy', description: 'Contract appears to be a proxy (EIP-1967 or EIP-1167).' });
      riskLevel = 'medium';
    }
    // 3. Owner detection
    owner = await getOwnerAddress(contract, provider);
    if (owner) {
      issues.push({
        type: 'Owner Detected',
        description:
          `Owner address: ${owner}.\n\nThis is common for many legitimate tokens (such as USDC, USDT, etc.) to allow for upgrades, compliance, or emergency controls. The presence of an owner does not necessarily mean the contract is unsafe, but it means the owner may have special permissions (e.g., pausing, blacklisting, minting). Always review the project’s documentation and reputation.`
      });
      riskLevel = riskLevel === 'unknown' ? 'medium' : riskLevel;
    }
    // 4. Etherscan verification & dangerous function detection
    const verifyResult = await checkEtherscanVerified(contract, Number(chainId));
    verified = verifyResult.verified;
    abi = verifyResult.abi;
    if (verified === false) {
      issues.push({ type: 'Not Verified', description: 'Contract is not verified on Etherscan.' });
      riskLevel = riskLevel === 'unknown' ? 'medium' : riskLevel;
    }
    if (verified && abi) {
      const danger = findDangerousFunctions(abi);
      dangerousFunctions = danger.found;
      if (danger.issues.length > 0) {
        issues.push(...danger.issues);
        riskLevel = 'medium';
      }
    }
    // 5. Finalize details
    const details = {
      contract,
      chainId,
      bytecodeLength,
      isProxy,
      verified,
      owner,
      abi: abi ? abi.map((item: any) => ({ name: item.name, type: item.type, stateMutability: item.stateMutability })) : null,
      dangerousFunctions,
      issues
    };
    if (issues.length > 0) {
      return NextResponse.json({
        status: 'risky',
        message: `${ENGINE_NAME}: Issues detected in this contract.`,
        riskLevel,
        details,
        engine: ENGINE_NAME,
      });
    } else {
      return NextResponse.json({
        status: 'safe',
        message: `${ENGINE_NAME}: No major issues found in this contract (basic heuristics).`,
        riskLevel: 'low',
        details,
        engine: ENGINE_NAME,
      });
    }
  } catch (e) {
    return NextResponse.json({ status: 'error', message: 'Error analyzing contract.', details: e }, { status: 500 });
  }
} 