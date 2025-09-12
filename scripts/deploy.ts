import { ethers } from "hardhat";

async function main() {
  console.log("Deploying VaultAssetShield contract...");

  // Get the contract factory
  const VaultAssetShield = await ethers.getContractFactory("VaultAssetShield");

  // Deploy the contract with verifier and risk assessor addresses
  // In production, these should be actual addresses of trusted entities
  const verifier = "0x742d35Cc6639C0532fCd738f5b1394c6F6AEeA3e"; // Replace with actual verifier address
  const riskAssessor = "0x8ba1f109551bD432803012645Hac136c"; // Replace with actual risk assessor address

  const vaultAssetShield = await VaultAssetShield.deploy(verifier, riskAssessor);

  await vaultAssetShield.waitForDeployment();

  const contractAddress = await vaultAssetShield.getAddress();
  console.log("VaultAssetShield deployed to:", contractAddress);

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifier,
    riskAssessor,
    deployer: await ethers.provider.getSigner().getAddress(),
    network: "sepolia",
    timestamp: new Date().toISOString(),
  };

  console.log("Deployment completed successfully!");
  console.log("Contract Address:", contractAddress);
  console.log("Verifier:", verifier);
  console.log("Risk Assessor:", riskAssessor);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
