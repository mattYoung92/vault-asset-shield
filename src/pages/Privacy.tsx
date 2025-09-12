import { WalletConnect } from "@/components/WalletConnect";
import { PrivacyStats } from "@/components/PrivacyStats";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vault, Shield, Lock, Eye, EyeOff, Code, Database, Server, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  const privacyFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All investment data is encrypted using AES-256 encryption before being stored on-chain.",
      technical: "Military-grade encryption protocols"
    },
    {
      icon: EyeOff,
      title: "Zero-Knowledge Proofs",
      description: "Verify your investment ownership without revealing the actual amounts to other parties.",
      technical: "zk-SNARKs implementation"
    },
    {
      icon: Database,
      title: "Confidential Transactions",
      description: "Transaction amounts are hidden from public view while maintaining blockchain transparency.",
      technical: "Ring signatures & commitments"
    },
    {
      icon: Server,
      title: "Secure Multi-Party Computation",
      description: "Computing functions over encrypted data without decrypting it first.",
      technical: "SMPC protocols"
    },
    {
      icon: Code,
      title: "Smart Contract Privacy",
      description: "Private smart contracts that execute without revealing sensitive business logic.",
      technical: "TEE & confidential computing"
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Meets all privacy requirements while ensuring full regulatory compliance.",
      technical: "GDPR, CCPA, SOX compliant"
    }
  ];

  const complianceStandards = [
    "SOC 2 Type II Certified",
    "ISO 27001 Compliant",
    "GDPR Privacy Framework",
    "CCPA Data Protection",
    "SEC Regulatory Standards",
    "FINRA Compliance"
  ];

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
              <Link to="/assets" className="text-muted-foreground hover:text-vault-primary transition-colors">Assets</Link>
              <Link to="/privacy" className="text-vault-primary font-medium">Privacy</Link>
              <Link to="/about" className="text-muted-foreground hover:text-vault-primary transition-colors">About</Link>
            </nav>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-vault-surface/30">
          <div className="container mx-auto px-6 text-center">
            <Badge className="mb-6 bg-vault-primary/20 text-vault-primary border-vault-primary/30">
              <Shield className="w-4 h-4 mr-2" />
              Privacy-First Architecture
            </Badge>
            
            <h1 className="text-5xl font-bold text-foreground mb-6">
              <span className="bg-gold-gradient bg-clip-text text-transparent">Confidential</span> by Design
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Advanced cryptographic protocols ensure your investment data remains private 
              while maintaining the transparency and security benefits of blockchain technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button variant="vault" size="lg">
                <Eye className="w-5 h-5 mr-2" />
                View Privacy Demo
              </Button>
              <Button variant="premium" size="lg">
                <Code className="w-5 h-5 mr-2" />
                Technical Documentation
              </Button>
            </div>

            <PrivacyStats />
          </div>
        </section>

        {/* Privacy Features */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Enterprise-Grade Privacy Protection
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our privacy infrastructure combines multiple cryptographic techniques 
                to ensure your sensitive financial data never leaves your control.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {privacyFeatures.map((feature, index) => (
                <Card key={index} className="bg-vault-surface border-vault-border p-8 group hover:shadow-glow transition-all duration-300">
                  <div className="w-12 h-12 bg-vault-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-vault-primary/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-vault-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <Badge variant="secondary" className="text-xs">
                    {feature.technical}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="py-20 bg-vault-surface/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground text-center mb-12">
                Privacy <span className="bg-gold-gradient bg-clip-text text-transparent">Architecture</span>
              </h2>

              <Card className="bg-vault-surface border-vault-border p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-6">
                      Data Protection Layers
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-vault-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-vault-dark">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Client-Side Encryption</h4>
                          <p className="text-sm text-muted-foreground">Data encrypted before leaving your device</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-vault-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-vault-dark">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Zero-Knowledge Validation</h4>
                          <p className="text-sm text-muted-foreground">Prove ownership without revealing amounts</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-vault-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-vault-dark">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Confidential Storage</h4>
                          <p className="text-sm text-muted-foreground">Encrypted data storage with access controls</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-vault-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-vault-dark">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Secure Computation</h4>
                          <p className="text-sm text-muted-foreground">Process data without decryption</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-6">
                      Compliance Standards
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {complianceStandards.map((standard, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-vault-border">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-sm font-medium text-foreground">{standard}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <Card className="bg-vault-gradient border-vault-border p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Invest with Complete Privacy?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Experience the future of confidential asset investment with institutional-grade privacy protection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="vault" size="lg" asChild>
                  <Link to="/assets">
                    <Shield className="w-5 h-5 mr-2" />
                    Explore Private Assets
                  </Link>
                </Button>
                <Button variant="premium" size="lg">
                  <Code className="w-5 h-5 mr-2" />
                  API Documentation
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Privacy;