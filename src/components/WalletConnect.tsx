import { Button } from "@/components/ui/button";
import { Wallet, Copy, ExternalLink } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { useState } from "react";
import { toast } from "sonner";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const [copied, setCopied] = useState(false)

  const handleConnect = async (connector: any) => {
    try {
      await connect({ connector })
      if (address) {
        onConnect?.(address)
        toast.success("Wallet connected successfully!")
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      toast.error("Failed to connect wallet")
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast.success("Wallet disconnected")
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      toast.success("Address copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openExplorer = () => {
    if (address) {
      window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank')
    }
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-vault-surface border border-vault-border rounded-lg">
          <Wallet className="w-4 h-4 text-vault-primary" />
          <span className="text-sm font-mono text-foreground">
            {ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyAddress}
            className="gap-1"
          >
            <Copy className="w-3 h-3" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={openExplorer}
            className="gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Explorer
          </Button>
          <Button variant="outline" size="sm" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          variant="connect"
          onClick={() => handleConnect(connector)}
          className="gap-2"
          disabled={isPending}
        >
          <Wallet className="w-4 h-4" />
          {isPending ? "Connecting..." : `Connect ${connector.name}`}
        </Button>
      ))}
    </div>
  );
};