const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
  console.log("Deploying VaultAssetShield contract with investment features...");

  const VaultAssetShield = await ethers.getContractFactory("VaultAssetShield");
  const [deployer] = await ethers.getSigners();

  if (!deployer) {
    throw new Error("No deployer account found. Please check your private key configuration.");
  }

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

  const vaultAssetShield = await VaultAssetShield.deploy(
    deployer.address, // verifier
    deployer.address  // riskAssessor
  );

  await vaultAssetShield.waitForDeployment();
  const contractAddress = await vaultAssetShield.getAddress();

  console.log("VaultAssetShield deployed to:", contractAddress);

  // Save contract address
  const fs = require('fs');
  const contractData = {
    address: contractAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString()
  };
  fs.writeFileSync('contract-address.json', JSON.stringify(contractData, null, 2));
  console.log("Contract address saved to contract-address.json");

  // Create assets with APY
  console.log("\n=== Creating Assets with APY ===");
  
  // ETH Price: $4,000
  const realWorldAssets = [
    {
      name: "Manhattan Office Tower",
      description: "Premium commercial real estate in Manhattan with 95% occupancy rate",
      value: ethers.parseEther("87.5"),  // $350,000 / 4000
      quantity: ethers.parseEther("1000000"),
      assetType: 1, // Real Estate
      metadataHash: "QmHash0",
      apy: 850 // 8.5%
    },
    {
      name: "US Treasury Bonds 2024",
      description: "Secure US Treasury Bonds with guaranteed returns",
      value: ethers.parseEther("43.75"),  // $175,000 / 4000
      quantity: ethers.parseEther("500000"),
      assetType: 0, // Bonds
      metadataHash: "QmHash1",
      apy: 350 // 3.5%
    },
    {
      name: "Tech Startup Equity",
      description: "High-growth tech startup equity with strong fundamentals",
      value: ethers.parseEther("65.625"),  // $262,500 / 4000
      quantity: ethers.parseEther("750000"),
      assetType: 3, // Stock
      metadataHash: "QmHash2",
      apy: 1500 // 15.0%
    },
    {
      name: "Gold Commodity Fund",
      description: "Physical gold-backed investment fund",
      value: ethers.parseEther("175"),  // $700,000 / 4000
      quantity: ethers.parseEther("2000000"),
      assetType: 4, // Commodity
      metadataHash: "QmHash3",
      apy: 620 // 6.2%
    },
    {
      name: "Bitcoin ETF",
      description: "Cryptocurrency ETF tracking Bitcoin price",
      value: ethers.parseEther("131.25"),  // $525,000 / 4000
      quantity: ethers.parseEther("1500000"),
      assetType: 2, // Crypto
      metadataHash: "QmHash4",
      apy: 1280 // 12.8%
    },
    {
      name: "European Real Estate Fund",
      description: "Diversified European real estate portfolio",
      value: ethers.parseEther("262.5"),  // $1,050,000 / 4000
      quantity: ethers.parseEther("3000000"),
      assetType: 1, // Real Estate
      metadataHash: "QmHash5",
      apy: 730 // 7.3%
    }
  ];

  for (let i = 0; i < realWorldAssets.length; i++) {
    const asset = realWorldAssets[i];
    try {
      console.log(`\nCreating Asset ${i}: ${asset.name}`);
      const tx = await vaultAssetShield.createAsset(
        asset.name,
        asset.description,
        asset.value,
        asset.quantity,
        asset.assetType,
        asset.metadataHash
      );
      await tx.wait();
      
      // Set APY for the asset
      const apyTx = await vaultAssetShield.setAssetAPY(i, asset.apy);
      await apyTx.wait();
      
      console.log(`✅ Asset ${i}: ${asset.name} created with APY ${asset.apy / 100}%`);
    } catch (error) {
      console.error(`❌ Failed to create Asset ${i}: ${asset.name}:`, error.message);
    }
  }

  console.log("\n=== Deployment Summary ===");
  console.log("Contract Address:", contractAddress);
  console.log("Network: Sepolia Testnet");
  console.log("Assets Created: 6");
  console.log("Assets with APY: 6");
  console.log("\nView on Etherscan:");
  console.log(`https://sepolia.etherscan.io/address/${contractAddress}`);
  
  console.log("\n=== Next Steps ===");
  console.log("1. Update .env file with new contract address");
  console.log("2. Update frontend with new ABI");
  console.log("3. Test investment functionality");
  console.log("4. Deploy frontend to Vercel");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


