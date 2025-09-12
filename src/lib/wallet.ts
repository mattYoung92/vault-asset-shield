import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'
import { getDefaultConfig } from '@coinbase/wallet-sdk'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id'

// Create Coinbase Wallet SDK instance
const coinbaseWalletSDK = getDefaultConfig({
  appName: 'Vault Asset Shield',
  appLogoUrl: '/favicon.ico',
  darkMode: false,
})

// Create wagmi config
export const config = createConfig({
  chains: [sepolia],
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Vault Asset Shield',
        url: 'https://vault-asset-shield.vercel.app',
        iconUrl: '/favicon.ico',
      },
    }),
    coinbaseWallet({
      appName: 'Vault Asset Shield',
      appLogoUrl: '/favicon.ico',
      darkMode: false,
    }),
    walletConnect({
      projectId,
      metadata: {
        name: 'Vault Asset Shield',
        description: 'Secure asset management with FHE technology',
        url: 'https://vault-asset-shield.vercel.app',
        icons: ['/favicon.ico'],
      },
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

export const chains = [sepolia]
