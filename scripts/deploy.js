import hre from "hardhat";

async function main() {
  console.log(`📡 Deploying SmartSessionTarget on ${hre.network.name}…`);

  const publicClient = await hre.viem.getPublicClient();
  const [wallet] = await hre.viem.getWalletClients();

  console.log("Deployer:", wallet.account.address);

  const hash = await hre.viem.deployContract("SmartSessionTarget", [], {
    client: wallet,
  });

  console.log("🧾 Deployment tx:", hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("✅ Contract deployed at:", receipt.contractAddress);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
