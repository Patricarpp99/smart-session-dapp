import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

import type { SupportedChainId } from "./config.js";

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Build path to artifact
const artifactPath = join(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "SmartSessionTarget.sol",
  "SmartSessionTarget.json"
);

// Load artifact if exists
export const smartSessionArtifact = fs.existsSync(artifactPath)
  ? JSON.parse(fs.readFileSync(artifactPath, "utf8"))
  : { abi: [] };

export const smartSessionAbi = smartSessionArtifact.abi;

// Contract addresses from .env
export const BASE_ADDRESS = process.env.VITE_BASE_CONTRACT_ADDRESS;
export const OPTIMISM_ADDRESS = process.env.VITE_OPTIMISM_CONTRACT_ADDRESS;
export const CELO_ADDRESS = process.env.VITE_CELO_CONTRACT_ADDRESS;

export function getTargetAddress(
  chainId: SupportedChainId
): `0x${string}` | null {
  switch (chainId) {
    case 8453:
      return BASE_ADDRESS as `0x${string}` | null;
    case 10:
      return OPTIMISM_ADDRESS as `0x${string}` | null;
    case 42220:
      return CELO_ADDRESS as `0x${string}` | null;
    default:
      return null;
  }
}
