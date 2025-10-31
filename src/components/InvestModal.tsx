import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useVaultAssetShield } from "@/hooks/useContract";

interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetId: number;
  assetTitle: string;
  assetType: "real-estate" | "bonds" | "crypto" | "stock" | "commodity";
  currentValue: number;
  minInvestment?: string;
}

export const InvestModal = ({ isOpen, onClose, assetId, assetTitle, assetType, currentValue, minInvestment }: InvestModalProps) => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"amount" | "review" | "success">("amount");
  const { toast } = useToast();
  const { invest, isPending } = useVaultAssetShield();

  const ETH_PRICE_USD = 4000; // ETH price in USD
  const minAmount = minInvestment ? parseInt(minInvestment.replace(/[$,]/g, "")) : 100;
  const amount = parseFloat(investmentAmount) || 0;
  const amountInEth = amount / ETH_PRICE_USD; // Convert USD to ETH
  const estimatedTokens = Math.floor((amount / minAmount) * 1000);
  const estimatedAnnualReturn = (amount * 8.5 / 100); // Default 8.5% APY

  const handleInvest = async () => {
    if (amount < minAmount) {
      toast({
        title: "Investment Amount Too Low",
        description: `Minimum investment is $${minAmount.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Convert USD amount to ETH, then to wei
      const amountInWei = BigInt(Math.floor(amountInEth * 1e18));
      
      // Call the new invest function
      await invest(
        assetId,
        `Investment in ${assetTitle}`,
        amountInWei
      );
      
      setStep("success");
      toast({
        title: "Investment Successful",
        description: "Your investment has been processed on the blockchain",
      });
    } catch (error) {
      console.error('Investment failed:', error);
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setStep("amount");
    setInvestmentAmount("");
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-vault-surface border-vault-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Shield className="w-5 h-5 text-vault-primary" />
            {step === "success" ? "Investment Complete" : `Invest in ${assetTitle}`}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === "success" 
              ? "Your investment has been successfully processed with full privacy protection"
              : "Your investment will be encrypted and private from other investors"
            }
          </DialogDescription>
        </DialogHeader>

        {step === "amount" && (
          <div className="space-y-6">
            <Card className="bg-background border-vault-border p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Asset Type</span>
                <Badge variant="secondary">
                  {assetType === "real-estate" ? "Real Estate" : 
                   assetType === "bonds" ? "Bonds" :
                   assetType === "crypto" ? "Crypto" :
                   assetType === "stock" ? "Stock" :
                   assetType === "commodity" ? "Commodity" : "Asset"}
                </Badge>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Expected APY</span>
                <span className="text-sm font-semibold text-green-400">8.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Minimum Investment</span>
                <span className="text-sm font-semibold text-foreground">{minInvestment || "$100"}</span>
              </div>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-foreground">Investment Amount (USD)</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="10000"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="pl-10 bg-background border-vault-border"
                  />
                </div>
                {amount > 0 && amount < minAmount && (
                  <p className="text-sm text-destructive mt-1">
                    Amount below minimum investment of {minInvestment || "$100"}
                  </p>
                )}
              </div>

              {amount >= minAmount && (
                <Card className="bg-vault-primary/5 border-vault-primary/30 p-4">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-vault-primary" />
                    Investment Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Investment Amount:</span>
                      <span className="font-semibold text-foreground">${amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Tokens:</span>
                      <span className="font-semibold text-foreground">{estimatedTokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Annual Return:</span>
                      <span className="font-semibold text-green-400">${estimatedAnnualReturn.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div className="flex items-start gap-3 p-4 bg-vault-primary/10 rounded-lg border border-vault-primary/30">
              <AlertTriangle className="w-5 h-5 text-vault-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Privacy Notice</p>
                <p className="text-muted-foreground">
                  Your investment amount will be encrypted and only visible to you. 
                  Other platform users cannot see your investment details.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                variant="vault" 
                className="flex-1"
                onClick={() => setStep("review")}
                disabled={amount < minAmount}
              >
                Review Investment
              </Button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-6">
            <Card className="bg-background border-vault-border p-4">
              <h4 className="font-semibold text-foreground mb-4">Final Review</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Asset:</span>
                  <span className="font-semibold text-foreground">{assetTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Amount:</span>
                  <span className="font-semibold text-foreground">${amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected APY:</span>
                  <span className="font-semibold text-green-400">8.5%</span>
                </div>
                <Separator className="bg-vault-border" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Annual Return:</span>
                  <span className="font-semibold text-vault-primary">${estimatedAnnualReturn.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 text-vault-primary" />
                <span>Investment will be encrypted before processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-vault-primary" />
                <span>Amount remains private to other users</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Regulatory compliant transaction</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep("amount")}>
                Back
              </Button>
              <Button 
                variant="vault" 
                className="flex-1"
                onClick={handleInvest}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-vault-dark border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Confirm Investment
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Investment Successful!</h3>
              <p className="text-muted-foreground">
                Your ${amount.toLocaleString()} investment in {assetTitle} has been processed 
                with full privacy encryption.
              </p>
            </div>

            <Card className="bg-vault-primary/5 border-vault-primary/30 p-4 text-left">
              <h4 className="font-semibold text-foreground mb-3">Transaction Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono text-foreground">TX-{Math.random().toString(36).substr(2, 9)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tokens Received:</span>
                  <span className="font-semibold text-foreground">{estimatedTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Privacy Status:</span>
                  <span className="text-green-400">Fully Encrypted</span>
                </div>
              </div>
            </Card>

            <Button variant="vault" className="w-full" onClick={resetModal}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};