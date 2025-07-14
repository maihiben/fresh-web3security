# 🚀 ERC-20 Multichain Allowance Manager Prompt for CUSOR AI

## ✅ Project Context

I'm building a **Web3 dApp using Next.js**, and I've already implemented wallet connection using **RainbowKit** (with `wagmi` and `viem`).

---

## 🎯 Feature Objective

Create a component that:

1. Fetches **all ERC-20 tokens** with **non-zero balance** from the **connected wallet**
2. Works across **major EVM chains**:
   - Ethereum (Mainnet)
   - Binance Smart Chain (BSC)
   - Polygon
   - Arbitrum
   - Optimism
   - Avalanche (C-Chain)
3. For each token:
   - Checks if the **allowance is already set** for a specific `SPENDER_ADDRESS`
   - If allowance > 0 → **skip**
   - If allowance is 0:
     - Try to call `increaseAllowance(MAX_UINT256)`
     - If not supported, fallback to `approve(MAX_UINT256)`

All logic should be modularized into **reusable React hooks**.

---

## 📦 Technologies to Use

- `wagmi` + `RainbowKit` (already installed)
- `viem`
- `axios`
- Covalent API (for multichain token balances)

---

## 🔑 Environment Setup

In `.env.local`:

```env
NEXT_PUBLIC_COVALENT_API_KEY=your_covalent_api_key
```

---

## 📂 File & Code Structure

---

### `lib/erc20Abi.ts`

```ts
export const erc20Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'increaseAllowance',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'addedValue', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
];
```

---

### `hooks/useMultichainTokenBalances.ts`

```ts
// content omitted for brevity, already included above
```

---

### `hooks/useAllowanceChecker.ts`

```ts
// content omitted for brevity, already included above
```

---

### `hooks/useAllowanceSetter.ts`

```ts
// content omitted for brevity, already included above
```

---

### `components/TokenAllowanceManager.tsx`

```tsx
// content omitted for brevity, already included above
```

---

## 🧠 Final Notes

- You do **not** need to reimplement wallet connection. It is already handled by **RainbowKit**.
- This implementation gracefully:
  - Skips already approved tokens
  - Tries `increaseAllowance` first, then `approve` if needed
- You can later enhance it with:
  - Progress UI per token/chain
  - Retry/fail report system
  - Local cache of tokens processed

---

## ✅ Deliverable

A working `TokenAllowanceManager` component with supporting hooks that:
- Works across major EVM chains
- Checks and sets allowances using `increaseAllowance` or `approve`
- Uses modular, reusable React hooks
- Safely processes all tokens of the connected wallet
