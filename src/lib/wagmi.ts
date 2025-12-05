import { createConfig, http } from "wagmi";
import { base, celo, optimism } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [base, celo, optimism],

  transports: {
    [base.id]: http(),
    [celo.id]: http(),
    [optimism.id]: http(),
  },
});
