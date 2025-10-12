import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InvestModal } from "./InvestModal";
import { useState } from "react";
import { useAssetInfo, useAssetValue, useAssetQuantity } from "@/hooks/useContract";
import { TrendingUp, Shield, Lock, Eye } from "lucide-react";

interface AssetCardProps {
  assetId: number;
  title: string;
  type: "real-estate" | "bonds" | "crypto" | "stock" | "commodity";
  value?: string;
  apy?: string;
  minInvestment?: string;
  image: string;
}

const AssetCard = ({ assetId, title, type, value, apy, minInvestment, image }: AssetCardProps) => {
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const { assetInfo, isLoading: assetInfoLoading } = useAssetInfo(assetId);
  const { value: contractValue, isLoading: valueLoading } = useAssetValue(assetId);
  const { quantity: contractQuantity, isLoading: quantityLoading } = useAssetQuantity(assetId);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "real-estate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "bonds":
        return "bg-green-100 text-green-800 border-green-200";
      case "crypto":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "stock":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "commodity":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "real-estate":
        return "Real Estate";
      case "bonds":
        return "Bonds";
      case "crypto":
        return "Crypto";
      case "stock":
        return "Stock";
      case "commodity":
        return "Commodity";
      default:
        return "Asset";
    }
  };

  const formatValue = (value: bigint | undefined) => {
    if (!value) return "Loading...";
    return `$${(Number(value) / 1e18).toLocaleString()}`;
  };

  const formatQuantity = (quantity: bigint | undefined) => {
    if (!quantity) return "Loading...";
    return Number(quantity).toLocaleString();
  };

  return (
    <>
      <Card className="bg-vault-surface border-vault-border overflow-hidden group hover:shadow-glow transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vault-dark/80 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge className={`${getTypeColor(type)} border`}>
              {getTypeLabel(type)}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Encrypted Asset</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-vault-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {assetInfo?.description || "Premium real-world asset with encrypted ownership stakes"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Current Value</div>
              <div className="text-lg font-semibold text-foreground">
                {valueLoading ? "Loading..." : formatValue(contractValue)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Quantity</div>
              <div className="text-lg font-semibold text-foreground">
                {quantityLoading ? "Loading..." : formatQuantity(contractQuantity)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Expected APY</div>
              <div className="text-lg font-semibold text-green-400 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {apy || "8.5%"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Min Investment</div>
              <div className="text-lg font-semibold text-foreground">
                {minInvestment || "$10,000"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4 text-vault-primary" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-vault-secondary" />
              <span>Institutional Grade</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <Button
            variant="vault"
            className="w-full"
            onClick={() => setIsInvestModalOpen(true)}
            disabled={assetInfoLoading || valueLoading || quantityLoading}
          >
            <Lock className="w-4 h-4 mr-2" />
            Invest Privately
          </Button>
        </CardFooter>
      </Card>

      <InvestModal
        isOpen={isInvestModalOpen}
        onClose={() => setIsInvestModalOpen(false)}
        assetId={assetId}
        assetTitle={title}
        assetType={type}
        currentValue={contractValue ? Number(contractValue) / 1e18 : 0}
        minInvestment={minInvestment}
      />
    </>
  );
};

export default AssetCard;