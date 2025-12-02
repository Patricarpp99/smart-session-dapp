require("dotenv/config");
require("@nomicfoundation/hardhat-verify");

const PRIVATE_KEY = process.env.APPLICATION_PRIVATE_KEY;
const BASESCAN_KEY = process.env.BASESCAN_API_KEY;

module.exports = {
  solidity: "0.8.24",
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    }
  },
  etherscan: {
    apiKey: {
      base: BASESCAN_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      }
    ]
  }
};