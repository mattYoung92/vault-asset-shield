const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying VaultAssetShield contract...");

  // Get the contract factory
  const VaultAssetShield = await ethers.getContractFactory("VaultAssetShield");

  // Deploy the contract with verifier and risk assessor addresses
  // For now, we'll use the deployer as both verifier and risk assessor
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const vaultAssetShield = await VaultAssetShield.deploy(
    deployer.address, // verifier
    deployer.address  // riskAssessor
  );

  await vaultAssetShield.waitForDeployment();

  const contractAddress = await vaultAssetShield.getAddress();
  console.log("VaultAssetShield deployed to:", contractAddress);

  // Save contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    network: "sepolia", // or your target network
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './contract-address.json',
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract address saved to contract-address.json");
  console.log("Please update your frontend .env file with:");
  console.log(`VITE_CONTRACT_ADDRESS=${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
