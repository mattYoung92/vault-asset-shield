import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { toast } from 'sonner'

// Contract ABI - Updated for non-encrypted version
const VAULT_ASSET_SHIELD_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_value", "type": "uint256"},
      {"internalType": "uint256", "name": "_quantity", "type": "uint256"},
      {"internalType": "uint8", "name": "_assetType", "type": "uint8"},
      {"internalType": "string", "name": "_metadataHash", "type": "string"}
    ],
    "name": "createAsset",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "bool", "name": "_isPublic", "type": "bool"}
    ],
    "name": "createPortfolio",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_portfolioId", "type": "uint256"},
      {"internalType": "uint256", "name": "_assetId", "type": "uint256"},
      {"internalType": "uint256", "name": "quantity", "type": "uint256"}
    ],
    "name": "addAssetToPortfolio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_fromAssetId", "type": "uint256"},
      {"internalType": "uint256", "name": "_toAssetId", "type": "uint256"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "uint8", "name": "_transactionType", "type": "uint8"},
      {"internalType": "string", "name": "_description", "type": "string"}
    ],
    "name": "executeTransaction",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_assetId", "type": "uint256"}],
    "name": "getAssetInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "assetType", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "string", "name": "metadataHash", "type": "string"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "updatedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_portfolioId", "type": "uint256"}],
    "name": "getPortfolioInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "bool", "name": "isPublic", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "updatedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserAssets",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserPortfolios",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAssetCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPortfolioCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_assetId", "type": "uint256"}],
    "name": "getAssetValue",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_assetId", "type": "uint256"}],
    "name": "getAssetQuantity",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_portfolioId", "type": "uint256"}],
    "name": "getPortfolioTotalValue",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserReputation",
    "outputs": [{"internalType": "uint32", "name": "", "type": "uint32"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Contract address - This would be the deployed contract address
const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'

export const useVaultAssetShield = () => {
  const { address } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const createAsset = async (
    name: string,
    description: string,
    value: number,
    quantity: number,
    assetType: number,
    metadataHash: string
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VAULT_ASSET_SHIELD_ABI,
        functionName: 'createAsset',
        args: [name, description, BigInt(value), BigInt(quantity), assetType, metadataHash],
      })
      toast.success("Asset creation transaction submitted!")
    } catch (err) {
      console.error('Failed to create asset:', err)
      toast.error("Failed to create asset")
    }
  }

  const createPortfolio = async (
    name: string,
    description: string,
    isPublic: boolean
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VAULT_ASSET_SHIELD_ABI,
        functionName: 'createPortfolio',
        args: [name, description, isPublic],
      })
      toast.success("Portfolio creation transaction submitted!")
    } catch (err) {
      console.error('Failed to create portfolio:', err)
      toast.error("Failed to create portfolio")
    }
  }

  const addAssetToPortfolio = async (
    portfolioId: number,
    assetId: number,
    quantity: number
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VAULT_ASSET_SHIELD_ABI,
        functionName: 'addAssetToPortfolio',
        args: [BigInt(portfolioId), BigInt(assetId), BigInt(quantity)],
      })
      toast.success("Asset added to portfolio!")
    } catch (err) {
      console.error('Failed to add asset to portfolio:', err)
      toast.error("Failed to add asset to portfolio")
    }
  }

  const executeTransaction = async (
    fromAssetId: number,
    toAssetId: number,
    amount: number,
    transactionType: number,
    description: string
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VAULT_ASSET_SHIELD_ABI,
        functionName: 'executeTransaction',
        args: [BigInt(fromAssetId), BigInt(toAssetId), BigInt(amount), transactionType, description],
      })
      toast.success("Transaction executed!")
    } catch (err) {
      console.error('Failed to execute transaction:', err)
      toast.error("Failed to execute transaction")
    }
  }

  return {
    createAsset,
    createPortfolio,
    addAssetToPortfolio,
    executeTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  }
}

export const useAssetInfo = (assetId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getAssetInfo',
    args: [BigInt(assetId)],
  })

  return {
    assetInfo: data,
    isLoading,
    error,
  }
}

export const usePortfolioInfo = (portfolioId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getPortfolioInfo',
    args: [BigInt(portfolioId)],
  })

  return {
    portfolioInfo: data,
    isLoading,
    error,
  }
}

export const useUserAssets = (userAddress: string) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getUserAssets',
    args: [userAddress as `0x${string}`],
  })

  return {
    userAssets: data,
    isLoading,
    error,
  }
}

export const useUserPortfolios = (userAddress: string) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getUserPortfolios',
    args: [userAddress as `0x${string}`],
  })

  return {
    userPortfolios: data,
    isLoading,
    error,
  }
}

export const useContractStats = () => {
  const { data: assetCount, isLoading: assetCountLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getAssetCount',
  })

  const { data: portfolioCount, isLoading: portfolioCountLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getPortfolioCount',
  })

  return {
    assetCount,
    portfolioCount,
    isLoading: assetCountLoading || portfolioCountLoading,
  }
}

export const useAssetValue = (assetId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getAssetValue',
    args: [BigInt(assetId)],
  })

  return {
    value: data,
    isLoading,
    error,
  }
}

export const useAssetQuantity = (assetId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getAssetQuantity',
    args: [BigInt(assetId)],
  })

  return {
    quantity: data,
    isLoading,
    error,
  }
}

export const usePortfolioTotalValue = (portfolioId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getPortfolioTotalValue',
    args: [BigInt(portfolioId)],
  })

  return {
    totalValue: data,
    isLoading,
    error,
  }
}

export const useUserReputation = (userAddress: string) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getUserReputation',
    args: [userAddress as `0x${string}`],
  })

  return {
    reputation: data,
    isLoading,
    error,
  }
}

export const useUserBalance = (userAddress: string) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ASSET_SHIELD_ABI,
    functionName: 'getUserBalance',
    args: [userAddress as `0x${string}`],
  })

  return {
    balance: data,
    isLoading,
    error,
  }
}
