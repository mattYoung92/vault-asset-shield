# Vercel Deployment Guide for Vault Asset Shield

This guide provides step-by-step instructions for deploying the Vault Asset Shield application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step 1: Connect GitHub Repository

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" on the dashboard
   - Select "Import Git Repository"
   - Choose `mattYoung92/vault-asset-shield` from the list
   - Click "Import"

## Step 2: Configure Project Settings

1. **Project Name**
   - Set project name: `vault-asset-shield`
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)

2. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

### Required Variables

```bash
# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Contract Address (update after deployment)
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# RPC URLs
VITE_SEPOLIA_RPC_URL=https://sepolia.gateway.tenderly.co
```

### How to Add Environment Variables

1. In your Vercel project dashboard
2. Go to "Settings" tab
3. Click "Environment Variables" in the sidebar
4. Add each variable:
   - **Name**: `VITE_WALLETCONNECT_PROJECT_ID`
   - **Value**: Your WalletConnect project ID
   - **Environment**: Production, Preview, Development
   - Click "Save"

5. Repeat for all variables

## Step 4: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for the build process to complete
   - Vercel will automatically assign a domain

2. **Custom Domain (Optional)**
   - Go to "Settings" → "Domains"
   - Add your custom domain
   - Configure DNS settings as instructed

## Step 5: Post-Deployment Configuration

### Update Contract Address

After deploying your smart contract:

1. **Deploy Smart Contract**
   ```bash
   # Install dependencies
   npm install

   # Deploy to Sepolia testnet
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

2. **Update Environment Variable**
   - Copy the deployed contract address
   - Update `VITE_CONTRACT_ADDRESS` in Vercel environment variables
   - Redeploy the application

### WalletConnect Configuration

1. **Get Project ID**
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Create a new project
   - Copy the Project ID

2. **Update Environment Variable**
   - Update `VITE_WALLETCONNECT_PROJECT_ID` in Vercel
   - Redeploy the application

## Step 6: Domain Configuration

### Automatic Domain
- Vercel provides: `vault-asset-shield-xxx.vercel.app`
- This works immediately after deployment

### Custom Domain
1. **Add Domain**
   - Go to "Settings" → "Domains"
   - Enter your domain: `yourdomain.com`
   - Click "Add"

2. **DNS Configuration**
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.61`

3. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - Wait for DNS propagation (up to 24 hours)

## Step 7: Monitoring and Updates

### Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests

### Manual Deployments
- Go to "Deployments" tab
- Click "Redeploy" for any deployment

### Monitoring
- View deployment logs in "Functions" tab
- Monitor performance in "Analytics" tab

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify environment variables are set

2. **Environment Variables Not Loading**
   - Ensure variables start with `VITE_` for client-side access
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check network configuration in wallet

4. **Contract Interaction Failures**
   - Ensure contract address is correct
   - Verify contract is deployed on the correct network
   - Check RPC URL configuration

### Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **Wagmi Documentation**: [wagmi.sh](https://wagmi.sh)

## Production Checklist

- [ ] Environment variables configured
- [ ] Smart contract deployed and address updated
- [ ] WalletConnect Project ID configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] All wallet connections working
- [ ] Contract interactions functional
- [ ] Performance monitoring enabled

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Smart Contract**
   - Deploy to testnet first
   - Conduct thorough testing
   - Consider audit before mainnet deployment

3. **Wallet Integration**
   - Validate all user inputs
   - Implement proper error handling
   - Use secure RPC endpoints

## Performance Optimization

1. **Build Optimization**
   - Enable Vite's build optimizations
   - Use code splitting
   - Optimize images and assets

2. **Runtime Performance**
   - Implement lazy loading
   - Use React.memo for expensive components
   - Optimize re-renders

3. **CDN and Caching**
   - Vercel automatically provides global CDN
   - Configure appropriate cache headers
   - Use Vercel's Edge Functions for dynamic content

---

**Note**: This deployment guide assumes you have already completed the smart contract deployment and have the necessary API keys and configuration ready.
