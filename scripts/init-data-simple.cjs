const { ethers } = require("ethers");

async function main() {
  console.log("Initializing contract with realistic data...");

  // Use the existing contract address
  const contractAddress = "0xa68cc631b5081D41c48f51b7e5771470a75c21df";
  
  // Connect to Sepolia
  const provider = new ethers.JsonRpcProvider("https://1rpc.io/sepolia");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  // Contract ABI (simplified)
  const abi = [
    "function createAsset(string memory name, string memory description, uint8 assetType, uint256 value, uint256 quantity, string memory metadataHash) external",
    "function createPortfolio(string memory name, string memory description, bool isPublic) external",
    "function addAssetToPortfolio(uint32 portfolioId, uint32 assetId) external",
    "function getContractStats() external view returns (uint256 assetCount, uint256 portfolioCount)"
  ];
  
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  
  console.log("Connected to contract:", contractAddress);
  console.log("Using account:", wallet.address);
  
  // ETH price: $3500
  const ETH_PRICE = 3500;
  
  // Real-world asset data with lower minimum investments
  const assets = [
    {
      name: "Manhattan Office Tower",
      description: "Premium commercial real estate in Manhattan with 95% occupancy rate",
      assetType: 0, // Real Estate
      value: ethers.parseEther("100"), // 100 ETH = $350,000
      quantity: ethers.parseEther("1000"), // 1000 shares
    },
    {
      name: "US Treasury Bonds 2024",
      description: "AAA-rated US Treasury bonds with 3.5% annual yield",
      assetType: 1, // Bonds
      value: ethers.parseEther("50"), // 50 ETH = $175,000
      quantity: ethers.parseEther("500"), // 500 shares
    },
    {
      name: "Tech Startup Equity",
      description: "Early-stage tech startup with 15% projected annual growth",
      assetType: 3, // Stock
      value: ethers.parseEther("75"), // 75 ETH = $262,500
      quantity: ethers.parseEther("750"), // 750 shares
    },
    {
      name: "Gold Commodity Fund",
      description: "Diversified gold commodity fund with physical backing",
      assetType: 4, // Commodity
      value: ethers.parseEther("200"), // 200 ETH = $700,000
      quantity: ethers.parseEther("2000"), // 2000 shares
    },
    {
      name: "Bitcoin ETF",
      description: "Institutional Bitcoin ETF with 0.25% management fee",
      assetType: 2, // Crypto
      value: ethers.parseEther("150"), // 150 ETH = $525,000
      quantity: ethers.parseEther("1500"), // 1500 shares
    },
    {
      name: "European Real Estate Fund",
      description: "Diversified European commercial real estate portfolio",
      assetType: 0, // Real Estate
      value: ethers.parseEther("300"), // 300 ETH = $1,050,000
      quantity: ethers.parseEther("3000"), // 3000 shares
    }
  ];

  console.log("\n=== Creating Real-World Assets ===");
  
  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    console.log(`\nCreating Asset ${i + 1}: ${asset.name}`);
    
    try {
      const tx = await contract.createAsset(
        asset.name,
        asset.description,
        asset.assetType,
        asset.value,
        asset.quantity,
        "QmHash" + i // Mock metadata hash
      );
      
      await tx.wait();
      console.log(`✅ Asset ${i + 1} created successfully`);
      console.log(`   Value: ${ethers.formatEther(asset.value)} ETH ($${(Number(ethers.formatEther(asset.value)) * ETH_PRICE).toLocaleString()})`);
      console.log(`   Quantity: ${ethers.formatEther(asset.quantity)} shares`);
      console.log(`   Min Investment: ~$100 (0.0286 ETH)`);
      
    } catch (error) {
      console.error(`❌ Failed to create Asset ${i + 1}:`, error.message);
    }
  }

  console.log("\n=== Creating Investment Portfolios ===");
  
  const portfolios = [
    {
      name: "Conservative Growth Portfolio",
      description: "Low-risk portfolio focusing on bonds and stable real estate",
      isPublic: true
    },
    {
      name: "Aggressive Growth Portfolio", 
      description: "High-risk portfolio with tech stocks and crypto assets",
      isPublic: true
    },
    {
      name: "Balanced Portfolio",
      description: "Mixed portfolio with 60% stocks, 30% bonds, 10% commodities",
      isPublic: true
    }
  ];

  for (let i = 0; i < portfolios.length; i++) {
    const portfolio = portfolios[i];
    console.log(`\nCreating Portfolio ${i + 1}: ${portfolio.name}`);
    
    try {
      const tx = await contract.createPortfolio(
        portfolio.name,
        portfolio.description,
        portfolio.isPublic
      );
      
      await tx.wait();
      console.log(`✅ Portfolio ${i + 1} created successfully`);
      
    } catch (error) {
      console.error(`❌ Failed to create Portfolio ${i + 1}:`, error.message);
    }
  }

  console.log("\n=== Adding Assets to Portfolios ===");
  
  try {
    // Add assets 1,2 to Conservative portfolio (portfolio 1)
    await contract.addAssetToPortfolio(1, 1); // Asset 1 to Portfolio 1
    await contract.addAssetToPortfolio(1, 2); // Asset 2 to Portfolio 1
    console.log("✅ Added assets to Conservative Portfolio");
    
    // Add assets 3,5 to Aggressive portfolio (portfolio 2) 
    await contract.addAssetToPortfolio(2, 3); // Asset 3 to Portfolio 2
    await contract.addAssetToPortfolio(2, 5); // Asset 5 to Portfolio 2
    console.log("✅ Added assets to Aggressive Portfolio");
    
    // Add assets 4,6 to Balanced portfolio (portfolio 3)
    await contract.addAssetToPortfolio(3, 4); // Asset 4 to Portfolio 3
    await contract.addAssetToPortfolio(3, 6); // Asset 6 to Portfolio 3
    console.log("✅ Added assets to Balanced Portfolio");
    
  } catch (error) {
    console.error("❌ Failed to add assets to portfolios:", error.message);
  }

  console.log("\n=== Final Statistics ===");
  
  try {
    const stats = await contract.getContractStats();
    console.log(`Total Assets: ${stats.assetCount}`);
    console.log(`Total Portfolios: ${stats.portfolioCount}`);
  } catch (error) {
    console.error("❌ Failed to get contract statistics:", error.message);
  }

  console.log("\n🎉 Real-world data initialization completed!");
  console.log("Contract now has realistic assets with $100 minimum investments.");
  console.log("Frontend should now display real data from the blockchain.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
