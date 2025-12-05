import "dotenv/config";
import { JsonRpcProvider, Wallet } from "ethers";

export type SupportedChainId = 8453 | 10 | 42220; // Base, Optimism, Celo

const APPLICATION_PRIVATE_KEY = process.env.APPLICATION_PRIVATE_KEY;

if (!APPLICATION_PRIVATE_KEY) {
  console.warn(
    "[config] WARNING: APPLICATION_PRIVATE_KEY not set — backend cannot sign transactions"
  );
}

export const CHAIN_CONFIG = {
  8453: {
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    explorerUrl: "https://basescan.org",
  },
  10: {
    name: "Optimism",
    rpcUrl: "https://mainnet.optimism.io",
    explorerUrl: "https://optimistic.etherscan.io",
  },
  42220: {
    name: "Celo",
    rpcUrl: "https://forno.celo.org",
    explorerUrl: "https://celoscan.io",
  },
} as const;

export function getProvider(chainId: SupportedChainId) {
  const cfg = CHAIN_CONFIG[chainId];
  return new JsonRpcProvider(cfg.rpcUrl, chainId);
}

export function getBackendWallet(chainId: SupportedChainId) {
  const provider = getProvider(chainId);

  if (!APPLICATION_PRIVATE_KEY)
    throw new Error("Missing APPLICATION_PRIVATE_KEY");

  return new Wallet(APPLICATION_PRIVATE_KEY, provider);
}
