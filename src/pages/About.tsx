import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vault, Users, TrendingUp, Shield, Globe, Award, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      background: "Former Goldman Sachs VP, 15 years in institutional finance",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder", 
      background: "Ex-Google Security, Blockchain cryptography expert",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Compliance",
      background: "Former SEC advisor, regulatory technology specialist",
    },
    {
      name: "James Liu",
      role: "Lead Blockchain Engineer",
      background: "Ethereum core contributor, privacy protocol researcher",
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description: "VaultRWA established with mission to democratize institutional-grade investments"
    },
    {
      year: "2023",
      title: "Privacy Protocol Launch",
      description: "Launched proprietary encryption technology for confidential asset tokenization"
    },
    {
      year: "2024",
      title: "Regulatory Approval",
      description: "Received compliance certification for operating in major financial jurisdictions"
    },
    {
      year: "2024",
      title: "Platform Beta",
      description: "Public launch of VaultRWA platform with initial asset portfolio"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "We believe financial privacy is a fundamental right in the digital age."
    },
    {
      icon: Users,
      title: "Democratization",
      description: "Making institutional-grade investments accessible to qualified individual investors."
    },
    {
      icon: Target,
      title: "Transparency",
      description: "Clear, honest communication about risks, returns, and our technology."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing the boundaries of what's possible with blockchain and cryptography."
    }
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
              <Link to="/privacy" className="text-muted-foreground hover:text-vault-primary transition-colors">Privacy</Link>
              <Link to="/about" className="text-vault-primary font-medium">About</Link>
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
              <Globe className="w-4 h-4 mr-2" />
              About VaultRWA
            </Badge>
            
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Redefining <span className="bg-gold-gradient bg-clip-text text-transparent">Asset Investment</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              We're building the future of confidential asset investment, where privacy meets 
              institutional-grade returns through advanced blockchain technology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-vault-primary mb-2">$2.8B+</div>
                <div className="text-muted-foreground">Assets Under Management</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-vault-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Active Investors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-vault-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Privacy Protection</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To democratize access to institutional-grade real-world asset investments while 
                preserving the confidentiality that sophisticated investors demand. We believe 
                that privacy and transparency can coexist through advanced cryptographic protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Why VaultRWA Exists
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-vault-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-vault-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Limited Access</h4>
                      <p className="text-muted-foreground">Premium real-world assets traditionally require minimum investments of millions, excluding most qualified investors.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-vault-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-vault-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Privacy Concerns</h4>
                      <p className="text-muted-foreground">Traditional investment platforms expose sensitive financial information to competitors and bad actors.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-vault-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Vault className="w-5 h-5 text-vault-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Lack of Innovation</h4>
                      <p className="text-muted-foreground">The asset management industry has been slow to adopt privacy-preserving technologies that protect investor interests.</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-vault-surface border-vault-border p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Solution</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-vault-border">
                    <Award className="w-6 h-6 text-vault-primary" />
                    <span className="font-medium text-foreground">Fractional ownership of premium assets</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-vault-border">
                    <Shield className="w-6 h-6 text-vault-primary" />
                    <span className="font-medium text-foreground">Military-grade encryption for all transactions</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-vault-border">
                    <Zap className="w-6 h-6 text-vault-primary" />
                    <span className="font-medium text-foreground">Cutting-edge blockchain infrastructure</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-vault-border">
                    <Users className="w-6 h-6 text-vault-primary" />
                    <span className="font-medium text-foreground">Institutional-grade due diligence</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-vault-surface/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide every decision we make and every feature we build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="bg-vault-surface border-vault-border p-6 text-center group hover:shadow-glow transition-all duration-300">
                  <div className="w-12 h-12 bg-vault-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-vault-primary/30 transition-colors">
                    <value.icon className="w-6 h-6 text-vault-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Leadership Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Industry veterans combining decades of experience in finance, technology, and regulatory compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-vault-surface border-vault-border p-6 text-center">
                  <div className="w-20 h-20 bg-vault-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-vault-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-sm font-medium text-vault-primary mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.background}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-vault-surface/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Journey</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Key milestones in building the world's most advanced privacy-preserving investment platform.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-vault-primary rounded-full flex items-center justify-center text-vault-dark font-bold">
                        {milestone.year}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-16 bg-vault-border mt-4" />
                      )}
                    </div>
                    <Card className="bg-vault-surface border-vault-border p-6 flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <Card className="bg-vault-gradient border-vault-border p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Join the Future of Private Investing
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Be part of a community that values both returns and privacy in equal measure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="vault" size="lg" asChild>
                  <Link to="/assets">
                    <Vault className="w-5 h-5 mr-2" />
                    Start Investing
                  </Link>
                </Button>
                <Button variant="premium" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Contact Our Team
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;