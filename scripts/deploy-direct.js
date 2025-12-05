import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JsonRpcProvider, Wallet, ContractFactory } from "ethers";

// ESM-safe __dirname / __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supported networks and RPCs
const NETWORKS = {
  base: {
    chainId: 8453,
    rpcUrl: "https://mainnet.base.org",
  },
  optimism: {
    chainId: 10,
    rpcUrl: "https://mainnet.optimism.io",
  },
  celo: {
    chainId: 42220,
    rpcUrl: "https://forno.celo.org",
  },
};

async function main() {
  const networkName = process.argv[2];

  if (!networkName || !NETWORKS[networkName]) {
    console.error(
      `Usage: node scripts/deploy-direct.js <network>\n` +
        `Supported networks: ${Object.keys(NETWORKS).join(", ")}`
    );
    process.exit(1);
  }

  const { rpcUrl, chainId } = NETWORKS[networkName];

  const privateKey =
    process.env.DEPLOYER_PRIVATE_KEY || process.env.APPLICATION_PRIVATE_KEY;

  if (!privateKey) {
    console.error(
      "❌ Missing DEPLOYER_PRIVATE_KEY or APPLICATION_PRIVATE_KEY in .env"
    );
    process.exit(1);
  }

  const provider = new JsonRpcProvider(rpcUrl, chainId);
  const wallet = new Wallet(privateKey, provider);

  console.log(`📡 Deploying SmartSessionTarget to ${networkName}`);
  console.log(`   RPC:      ${rpcUrl}`);
  console.log(`   Chain ID: ${chainId}`);
  console.log(`   Deployer: ${wallet.address}`);

  // Load Hardhat artifact
  const artifactPath = path.join(
    __dirname,
    "..",
    "artifacts",
    "contracts",
    "SmartSessionTarget.sol",
    "SmartSessionTarget.json"
  );

  if (!fs.existsSync(artifactPath)) {
    console.error(
      `❌ Artifact not found at ${artifactPath}. Did you run "npx hardhat compile"?`
    );
    process.exit(1);
  }

  const artifactRaw = fs.readFileSync(artifactPath, "utf8");
  const artifact = JSON.parse(artifactRaw);

  const factory = new ContractFactory(artifact.abi, artifact.bytecode, wallet);

  console.log("⏳ Sending deploy transaction…");
  const contract = await factory.deploy();

  const deployTx = contract.deploymentTransaction();
  console.log("   ⛽ Deploy tx hash:", deployTx?.hash);

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`✅ SmartSessionTarget deployed on ${networkName} at: ${address}`);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
