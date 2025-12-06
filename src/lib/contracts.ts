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
// 2. CONTRACT ABI (SmartSessionTarget - with session management)
// -------------------------------------------------------------

export const SMART_SESSION_ABI: Abi = [
  // Store function for session creation proof
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
  // Get current value
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
  // Event for tracking
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

// Session creation data encoded as uint256 for on-chain proof
export function encodeSessionData(
  targetAddress: string,
  permissions: string[],
  expiryTimestamp: number
): bigint {
  // Simple encoding: first 20 bytes = target address, last 12 bytes = expiry
  const targetBn = BigInt(targetAddress);
  const expiryBn = BigInt(expiryTimestamp);
  // Combine: shift target by 96 bits (12 bytes) and add expiry
  return (targetBn << BigInt(96)) | expiryBn;
}

// Decode session data from uint256
export function decodeSessionData(encoded: bigint): {
  targetAddress: string;
  expiryTimestamp: number;
} {
  const expiryMask = (BigInt(1) << BigInt(96)) - BigInt(1);
  const expiry = Number(encoded & expiryMask);
  const target = encoded >> BigInt(96);
  return {
    targetAddress: "0x" + target.toString(16).padStart(40, "0") as `0x${string}`,
    expiryTimestamp: expiry,
  };
}

// Revocation data - use a special prefix to indicate revocation
export function encodeRevocationData(sessionId: string): bigint {
  // Use hash of sessionId as the revocation marker
  const hash = sessionId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  // Add revocation prefix (0xDEAD)
  return BigInt(0xDEAD) << BigInt(240) | BigInt(Math.abs(hash));
}

// -------------------------------------------------------------
// 3. CHAIN CONFIG METADATA
// -------------------------------------------------------------

export const CHAIN_METADATA = {
  base: {
    id: 8453,
    name: "Base Mainnet",
    explorer: "https://basescan.org",
    txExplorer: "https://basescan.org/tx/",
    addressExplorer: "https://basescan.org/address/",
  },
  optimism: {
    id: 10,
    name: "Optimism",
    explorer: "https://optimistic.etherscan.io",
    txExplorer: "https://optimistic.etherscan.io/tx/",
    addressExplorer: "https://optimistic.etherscan.io/address/",
  },
  celo: {
    id: 42220,
    name: "Celo",
    explorer: "https://celoscan.io",
    txExplorer: "https://celoscan.io/tx/",
    addressExplorer: "https://celoscan.io/address/",
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
// 5. EXPORT DEFAULT
// -------------------------------------------------------------

export default {
  CONTRACT_ADDRESSES,
  SMART_SESSION_ABI,
  CHAIN_METADATA,
  getContractAddressByChainId,
  getChainMetadata,
  encodeSessionData,
  decodeSessionData,
  encodeRevocationData,
};