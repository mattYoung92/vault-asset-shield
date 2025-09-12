# Vault Asset Shield

A secure asset management platform built with FHE (Fully Homomorphic Encryption) technology for privacy-preserving financial operations.

## Features

- **Privacy-First Design**: All sensitive financial data is encrypted using FHE technology
- **Multi-Asset Support**: Manage various asset types including bonds, real estate, and cryptocurrencies
- **Secure Wallet Integration**: Connect with popular Web3 wallets for seamless transactions
- **Real-time Analytics**: Monitor your portfolio performance with encrypted data processing
- **Decentralized Architecture**: Built on blockchain for transparency and security

## Technologies

This project is built with:

- **Frontend**: Vite, TypeScript, React, shadcn-ui, Tailwind CSS
- **Blockchain**: Solidity, FHEVM (Fully Homomorphic Encryption Virtual Machine)
- **Wallet Integration**: Wagmi, Viem, Web3Modal
- **Styling**: Tailwind CSS with custom vault-themed design system

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```sh
# Clone the repository
git clone https://github.com/mattYoung92/vault-asset-shield.git

# Navigate to the project directory
cd vault-asset-shield

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```sh
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Smart Contract

The project includes FHE-enabled smart contracts for secure asset management:

- **VaultAssetShield.sol**: Main contract with FHE encryption for sensitive data
- **Asset Management**: Create, update, and manage encrypted asset portfolios
- **Privacy Protection**: All financial data remains encrypted during computation

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic builds on push

### Manual Deployment

```sh
# Build the project
npm run build

# Deploy the dist folder to your hosting provider
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
