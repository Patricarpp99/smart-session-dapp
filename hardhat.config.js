import "dotenv/config";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-viem";

const PRIVATE_KEY = process.env.APPLICATION_PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

export default {
  solidity: "0.8.24",

  networks: {
    base: {
      type: "http",
      url: "https://mainnet.base.org",
      chainId: 8453,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainType: "generic",
    },
    optimism: {
      type: "http",
      url: "https://mainnet.optimism.io",
      chainId: 10,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainType: "op",
    },
    celo: {
      type: "http",
      url: "https://forno.celo.org",
      chainId: 42220,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainType: "generic",
    },
  },

  verify: {
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
      customChains: [
        {
          network: "celo",
          chainId: 42220,
          urls: {
            apiURL: "https://api.celoscan.io/api",
            browserURL: "https://celoscan.io",
          },
        },
      ],
    },
  },
};
