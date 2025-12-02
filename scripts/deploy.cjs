const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const Contract = await hre.ethers.getContractFactory("SmartSessionTarget");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("SmartSessionTarget deployed to:", address);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});