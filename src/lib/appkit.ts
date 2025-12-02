import {
  createWeb3Modal,
  defaultWagmiConfig,
} from "@reown/appkit-adapter-wagmi";
import { base } from "wagmi/chains";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

export const config = defaultWagmiConfig({
  projectId,
  chains: [base],
  metadata: {
    name: "Smart Session Demo",
    description: "Base Smart Session App",
  },
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains: [base],
});