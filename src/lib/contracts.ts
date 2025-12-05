// -------------------------------------------------------------
// Smart Session DApp — Contract Registry + ABI
// Chains: Base, Optimism, Celo (Mainnets)
// -------------------------------------------------------------

import type { Abi } from "viem";

// -------------------------------------------------------------
// 1. MAINNET CONTRACT ADDRESSES
// -------------------------------------------------------------

export const CONTRACT_ADDRESSES: Record<
  "base" | "optimism" | "celo",
  `0x${string}`
> = {
  base: "0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644",
  optimism: "0xC19c0602d25e26f496037c42E6A103074d2CBd85",
  celo: "0xC19c0602d25e26f496037c42E6A103074d2CBd85",
};

// -------------------------------------------------------------
// 2. CONTRACT ABI (SmartSessionTarget)
// -------------------------------------------------------------

export const SMART_SESSION_ABI: Abi = [
  {
    type: "function",
    name: "store",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "newNumber",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "get",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "event",
    name: "NumberUpdated",
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "newValue",
        type: "uint256",
        internalType: "uint256",
      },
      {
        indexed: false,
        name: "executor",
        type: "address",
        internalType: "address",
      },
    ],
  },
];

// -------------------------------------------------------------
// 3. CHAIN CONFIG METADATA (optional but very helpful for UI)
// -------------------------------------------------------------

export const CHAIN_METADATA = {
  base: {
    id: 8453,
    name: "Base Mainnet",
    explorer: "https://basescan.org/address/",
  },
  optimism: {
    id: 10,
    name: "Optimism",
    explorer: "https://optimistic.etherscan.io/address/",
  },
  celo: {
    id: 42220,
    name: "Celo",
    explorer: "https://celoscan.io/address/",
  },
};

// -------------------------------------------------------------
// 4. HELPERS
// -------------------------------------------------------------

/** Get contract address by chainId */
export function getContractAddressByChainId(
  chainId: number
): `0x${string}` | null {
  switch (chainId) {
    case 8453:
      return CONTRACT_ADDRESSES.base;
    case 10:
      return CONTRACT_ADDRESSES.optimism;
    case 42220:
      return CONTRACT_ADDRESSES.celo;
    default:
      return null;
  }
}

/** Get metadata (name, explorer URL) by chainId */
export function getChainMetadata(chainId: number) {
  switch (chainId) {
    case 8453:
      return CHAIN_METADATA.base;
    case 10:
      return CHAIN_METADATA.optimism;
    case 42220:
      return CHAIN_METADATA.celo;
    default:
      return null;
  }
}

// -------------------------------------------------------------
// 5. EXPORT DEFAULT (Optional convenience)
// -------------------------------------------------------------

export default {
  CONTRACT_ADDRESSES,
  SMART_SESSION_ABI,
  CHAIN_METADATA,
  getContractAddressByChainId,
  getChainMetadata,
};