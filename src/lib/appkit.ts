import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base, optimism, celo } from "wagmi/chains";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID as string | undefined;
const appName = import.meta.env.VITE_APP_NAME || "Smart Session Dapp";
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
      "Secure, temporary, revocable on-chain session permissions for Web3.",
    url: appUrl,
    icons: [appIcon],
  },
  features: {
    email: true,
    socials: ["google", "x", "github"],
    smartSessions: true,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#00F0FF',
    '--w3m-color-mix': '#0B0C15',
    '--w3m-color-mix-strength': 40,
    '--w3m-border-radius-master': '1px',
    '--w3m-font-size-master': '10px',
  },
});
