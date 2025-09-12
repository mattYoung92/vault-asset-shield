import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InvestModal } from "@/components/InvestModal";
import { Shield, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AssetCardProps {
  title: string;
  type: "real-estate" | "bonds";
  value: string;
  apy: string;
  minInvestment: string;
  image: string;
  isPrivate?: boolean;
}

export const AssetCard = ({ 
  title, 
  type, 
  value, 
  apy, 
  minInvestment, 
  image, 
  isPrivate = true 
}: AssetCardProps) => {
  const [showValue, setShowValue] = useState(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);

  return (
    <Card className="bg-vault-surface border-vault-border hover:border-vault-primary transition-all duration-300 group hover:shadow-glow">
      <div className="relative h-48 rounded-t-lg overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vault-dark/80 to-transparent" />
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-vault-primary/20 text-vault-primary border-vault-primary/30"
        >
          {type === "real-estate" ? "Real Estate" : "Bonds"}
        </Badge>
        <div className="absolute top-4 right-4">
          <Shield className="w-5 h-5 text-vault-secondary animate-pulse" />
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total Value:</span>
            {isPrivate && !showValue ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono">••••••</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowValue(true)}
                  className="p-1 h-auto"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono text-vault-primary">{value}</span>
                {isPrivate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowValue(false)}
                    className="p-1 h-auto"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span>{apy} APY</span>
          </div>
          <span className="text-muted-foreground">Min: {minInvestment}</span>
        </div>

        <Button variant="vault" className="w-full" onClick={() => setIsInvestModalOpen(true)}>
          Invest Now
        </Button>
      </div>

      <InvestModal 
        open={isInvestModalOpen}
        onOpenChange={setIsInvestModalOpen}
        asset={{ title, type, value, apy, minInvestment }}
      />
    </Card>
  );
};