import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base, optimism, celo } from "wagmi/chains";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID as string | undefined;
const appName = import.meta.env.VITE_APP_NAME || "Smart Session Playground";
const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:5173";
const appIcon = import.meta.env.VITE_APP_ICON_URL || appUrl + "/favicon.ico";

if (!projectId) {
  throw new Error(
    "VITE_REOWN_PROJECT_ID is not set. Configure it in your .env file.",
  );
}

export const networks = [base, optimism, celo];

// Create Wagmi adapter from AppKit
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

// Initialize AppKit (WalletConnect / Reown UI)
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: appName,
    description:
      "Multichain smart-session playground on Base, Optimism, and Celo.",
    url: appUrl,
    icons: [appIcon],
  },
  features: {
    email: true,
    socials: ["google", "x", "github"],
    // Smart Sessions are enabled at the wallet UX level,
    // but this demo executes via a backend signer.
    smartSessions: true,
  },
  themeVariables: {
    "--w3m-accent": "#4f46e5",
    "--w3m-border-radius-master": "16px",
    "--w3m-font-size-master": "14px",
  },
});
