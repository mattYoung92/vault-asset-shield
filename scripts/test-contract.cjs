const { ethers } = require("hardhat");

async function main() {
  console.log("Testing VaultAssetShield contract...");

  // Get the contract
  const [deployer, user1, user2] = await ethers.getSigners();
  const VaultAssetShield = await ethers.getContractFactory("VaultAssetShield");
  
  // Deploy contract
  const vaultAssetShield = await VaultAssetShield.deploy(
    deployer.address, // verifier
    deployer.address  // riskAssessor
  );
  await vaultAssetShield.waitForDeployment();
  
  const contractAddress = await vaultAssetShield.getAddress();
  console.log("Contract deployed at:", contractAddress);

  // Test 1: Create Asset
  console.log("\n=== Test 1: Create Asset ===");
  const createAssetTx = await vaultAssetShield.createAsset(
    "Test Asset",
    "A test asset for demonstration",
    ethers.parseEther("1000000"), // 1M value
    ethers.parseEther("1000"),    // 1000 quantity
    0, // AssetType.BOND
    "0x1234567890abcdef"
  );
  await createAssetTx.wait();
  console.log("✅ Asset created successfully");

  // Test 2: Create Portfolio
  console.log("\n=== Test 2: Create Portfolio ===");
  const createPortfolioTx = await vaultAssetShield.createPortfolio(
    "Test Portfolio",
    "A test portfolio for demonstration",
    true // isPublic
  );
  await createPortfolioTx.wait();
  console.log("✅ Portfolio created successfully");

  // Test 3: Add Asset to Portfolio
  console.log("\n=== Test 3: Add Asset to Portfolio ===");
  const addAssetTx = await vaultAssetShield.addAssetToPortfolio(
    0, // portfolioId
    0, // assetId
    ethers.parseEther("100") // quantity
  );
  await addAssetTx.wait();
  console.log("✅ Asset added to portfolio successfully");

  // Test 4: Execute Transaction
  console.log("\n=== Test 4: Execute Transaction ===");
  const executeTx = await vaultAssetShield.executeTransaction(
    0, // fromAssetId
    0, // toAssetId (0 for deposit)
    ethers.parseEther("10000"), // amount
    0, // transactionType (deposit)
    "Test deposit transaction"
  );
  await executeTx.wait();
  console.log("✅ Transaction executed successfully");

  // Test 5: Get Asset Info
  console.log("\n=== Test 5: Get Asset Info ===");
  const assetInfo = await vaultAssetShield.getAssetInfo(0);
  console.log("Asset Info:", {
    name: assetInfo[0],
    description: assetInfo[1],
    assetType: assetInfo[2],
    isActive: assetInfo[3],
    isVerified: assetInfo[4],
    owner: assetInfo[6]
  });

  // Test 6: Get Portfolio Info
  console.log("\n=== Test 6: Get Portfolio Info ===");
  const portfolioInfo = await vaultAssetShield.getPortfolioInfo(0);
  console.log("Portfolio Info:", {
    name: portfolioInfo[0],
    description: portfolioInfo[1],
    isPublic: portfolioInfo[2],
    isVerified: portfolioInfo[3],
    owner: portfolioInfo[4]
  });

  // Test 7: Get Contract Stats
  console.log("\n=== Test 7: Get Contract Stats ===");
  const assetCount = await vaultAssetShield.getAssetCount();
  const portfolioCount = await vaultAssetShield.getPortfolioCount();
  console.log("Contract Stats:", {
    assetCount: assetCount.toString(),
    portfolioCount: portfolioCount.toString()
  });

  // Test 8: Get Asset Value
  console.log("\n=== Test 8: Get Asset Value ===");
  const assetValue = await vaultAssetShield.getAssetValue(0);
  console.log("Asset Value:", ethers.formatEther(assetValue), "ETH");

  // Test 9: Get Portfolio Total Value
  console.log("\n=== Test 9: Get Portfolio Total Value ===");
  const portfolioValue = await vaultAssetShield.getPortfolioTotalValue(0);
  console.log("Portfolio Total Value:", ethers.formatEther(portfolioValue), "ETH");

  console.log("\n🎉 All tests passed successfully!");
  console.log("\nContract is ready for frontend integration!");
  console.log("Contract Address:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });
