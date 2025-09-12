import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Vault, ChevronDown, TrendingUp, Users, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import vaultBg from "@/assets/vault-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Military-Grade Encryption",
      description: "Your investment amounts are encrypted with AES-256 and remain completely private from competitors."
    },
    {
      icon: TrendingUp,
      title: "Institutional Returns",
      description: "Access premium real-world assets with yields typically reserved for large institutional investors."
    },
    {
      icon: Users,
      title: "Selective Access",
      description: "Curated portfolio of high-quality assets with proper due diligence and regulatory compliance."
    }
  ];

  const stats = [
    { value: "$2.8B+", label: "Assets Under Management" },
    { value: "8.5%", label: "Average APY" },
    { value: "10K+", label: "Private Investors" },
    { value: "99.9%", label: "Privacy Protection" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-vault-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
                <Vault className="w-6 h-6 text-vault-dark" />
              </div>
              <span className="text-xl font-bold text-foreground">VaultRWA</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/assets" className="text-muted-foreground hover:text-vault-primary transition-colors">Assets</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-vault-primary transition-colors">Privacy</Link>
              <Link to="/about" className="text-muted-foreground hover:text-vault-primary transition-colors">About</Link>
            </nav>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${vaultBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-vault-dark/90 via-vault-dark/70 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-vault-primary/20 text-vault-primary border-vault-primary/30">
              <Shield className="w-4 h-4 mr-2" />
              Confidential Investment Platform
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Invest in RWAs<br />
              <span className="bg-gold-gradient bg-clip-text text-transparent">
                with Privacy
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Real-world assets tokenized with encrypted ownership stakes. 
              Your investment amounts remain confidential from competitors while 
              earning institutional-grade returns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="vault" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/assets">
                  <Lock className="w-5 h-5 mr-2" />
                  Explore Private Assets
                </Link>
              </Button>
              <Button variant="premium" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/privacy">
                  <Eye className="w-5 h-5 mr-2" />
                  Learn About Privacy
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-vault-primary rounded-full animate-pulse" />
                <span>Institutional grade</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-vault-secondary rounded-full animate-pulse" />
                <span>Regulatory compliant</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-vault-primary" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-vault-surface/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-vault-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose <span className="bg-gold-gradient bg-clip-text text-transparent">VaultRWA</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced privacy technology meets institutional-grade asset management 
              to create the ultimate confidential investment platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-vault-surface border-vault-border p-8 text-center group hover:shadow-glow transition-all duration-300">
                <div className="w-16 h-16 bg-vault-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-vault-primary/30 transition-colors">
                  <feature.icon className="w-8 h-8 text-vault-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-vault-surface/30">
        <div className="container mx-auto px-6">
          <Card className="bg-vault-gradient border-vault-border p-12 text-center max-w-4xl mx-auto">
            <Globe className="w-16 h-16 text-vault-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Start Private Investing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of investors who trust VaultRWA for confidential access 
              to premium real-world assets with institutional-grade returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="vault" size="lg" asChild>
                <Link to="/assets">
                  <Vault className="w-5 h-5 mr-2" />
                  View Available Assets
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="premium" size="lg" asChild>
                <Link to="/about">
                  <Users className="w-5 h-5 mr-2" />
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-vault-dark border-t border-vault-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold-gradient rounded-lg flex items-center justify-center">
                <Vault className="w-5 h-5 text-vault-dark" />
              </div>
              <span className="text-lg font-bold text-foreground">VaultRWA</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/assets" className="hover:text-vault-primary transition-colors">Assets</Link>
              <Link to="/privacy" className="hover:text-vault-primary transition-colors">Privacy</Link>
              <Link to="/about" className="hover:text-vault-primary transition-colors">About</Link>
            </nav>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>© 2024 VaultRWA. Privacy Protected.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;