import { WalletConnect } from "@/components/WalletConnect";
import AssetCard from "@/components/AssetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Vault, Search, Filter, TrendingUp, Shield, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useContractStats, useUserAssets } from "@/hooks/useContract";
import realEstate1 from "@/assets/real-estate-1.jpg";
import bonds1 from "@/assets/bonds-1.jpg";

const Assets = () => {
  const { address, isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userAssetIds, setUserAssetIds] = useState<number[]>([]);
  
  const { assetCount, portfolioCount, isLoading: statsLoading } = useContractStats();
  const { userAssets, isLoading: userAssetsLoading } = useUserAssets(address || "");

  // Update user asset IDs when userAssets changes
  useEffect(() => {
    if (userAssets) {
      setUserAssetIds(userAssets.map(id => Number(id)));
    }
  }, [userAssets]);

  // Generate asset cards based on contract data
  const generateAssetCards = () => {
    const assets = [];
    const assetCountNum = assetCount ? Number(assetCount) : 0;
    
    // Real-world asset data with realistic values and lower minimum investments
    const realWorldAssets = [
      {
        title: "Manhattan Office Tower",
        type: "real-estate" as const,
        value: "$350,000",
        apy: "8.5%",
        minInvestment: "$100",
        image: realEstate1
      },
      {
        title: "US Treasury Bonds 2024",
        type: "bonds" as const,
        value: "$175,000",
        apy: "3.5%",
        minInvestment: "$100",
        image: bonds1
      },
      {
        title: "Tech Startup Equity",
        type: "stock" as const,
        value: "$262,500",
        apy: "15.0%",
        minInvestment: "$100",
        image: realEstate1
      },
      {
        title: "Gold Commodity Fund",
        type: "commodity" as const,
        value: "$700,000",
        apy: "6.2%",
        minInvestment: "$100",
        image: bonds1
      },
      {
        title: "Bitcoin ETF",
        type: "crypto" as const,
        value: "$525,000",
        apy: "12.8%",
        minInvestment: "$100",
        image: realEstate1
      },
      {
        title: "European Real Estate Fund",
        type: "real-estate" as const,
        value: "$1,050,000",
        apy: "7.3%",
        minInvestment: "$100",
        image: bonds1
      }
    ];
    
    for (let i = 0; i < Math.max(assetCountNum, 6); i++) {
      const assetId = i;
      const isUserAsset = userAssetIds.includes(assetId);
      const assetData = realWorldAssets[i] || realWorldAssets[0];
      
      assets.push({
        assetId,
        title: assetData.title,
        type: assetData.type,
        value: assetData.value,
        apy: assetData.apy,
        minInvestment: assetData.minInvestment,
        image: assetData.image,
        isUserAsset
      });
    }
    
    return assets;
  };

  const allAssets = generateAssetCards();

  const filteredAssets = allAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || asset.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-vault-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
                <Vault className="w-6 h-6 text-vault-dark" />
              </div>
              <span className="text-xl font-bold text-foreground">VaultRWA</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/assets" className="text-vault-primary font-medium">Assets</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-vault-primary transition-colors">Privacy</Link>
              <Link to="/about" className="text-muted-foreground hover:text-vault-primary transition-colors">About</Link>
            </nav>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-vault-primary/20 text-vault-primary border-vault-primary/30">
            <Shield className="w-4 h-4 mr-2" />
            Encrypted Asset Portfolio
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Premium <span className="bg-gold-gradient bg-clip-text text-transparent">RWA Assets</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover tokenized real-world assets with encrypted ownership stakes. 
            Each investment is protected by institutional-grade privacy protocols.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-vault-surface border border-vault-border rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-vault-border"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === "all" ? "vault" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Assets
                </Button>
                <Button
                  variant={selectedCategory === "real-estate" ? "vault" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("real-estate")}
                >
                  Real Estate
                </Button>
                <Button
                  variant={selectedCategory === "bonds" ? "vault" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("bonds")}
                >
                  Bonds
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-vault-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Average APY: 8.2%</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-vault-primary" />
                <span>All assets encrypted</span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {filteredAssets.length} assets found
            </span>
          </div>
        </div>

        {/* Wallet Connection Notice */}
        {!isConnected && (
          <div className="bg-vault-primary/10 border border-vault-primary/30 rounded-lg p-6 mb-8 text-center">
            <Shield className="w-8 h-8 text-vault-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Connect Wallet to Access Assets
            </h3>
            <p className="text-muted-foreground mb-4">
              Wallet connection is required to view detailed asset information and make investments.
            </p>
            <WalletConnect />
          </div>
        )}

        {/* Assets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredAssets.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-vault-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No assets found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Assets;