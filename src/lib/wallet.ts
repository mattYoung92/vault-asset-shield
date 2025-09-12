import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id'

// Create wagmi config with RainbowKit
export const config = getDefaultConfig({
  appName: 'Vault Asset Shield',
  projectId,
  chains: [sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
})

export const chains = [sepolia]
