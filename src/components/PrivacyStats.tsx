import { Card } from "@/components/ui/card";
import { Shield, Users, Lock, Zap } from "lucide-react";

export const PrivacyStats = () => {
  const stats = [
    {
      icon: Shield,
      label: "Encrypted Assets",
      value: "1,247",
      description: "Confidential RWA tokens"
    },
    {
      icon: Users,
      label: "Private Investors",
      value: "8,934",
      description: "Anonymous participants"
    },
    {
      icon: Lock,
      label: "Secured Value",
      value: "$2.8B",
      description: "Protected investments"
    },
    {
      icon: Zap,
      label: "Privacy Score",
      value: "99.9%",
      description: "Encryption accuracy"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index}
          className="bg-vault-surface border-vault-border p-6 text-center group hover:shadow-glow transition-all duration-300"
        >
          <div className="mx-auto w-12 h-12 bg-vault-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-vault-primary/30 transition-colors">
            <stat.icon className="w-6 h-6 text-vault-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
          <div className="text-sm font-medium text-vault-primary mb-1">{stat.label}</div>
          <div className="text-xs text-muted-foreground">{stat.description}</div>
        </Card>
      ))}
    </div>
  );
};