# Investment Lifecycle - Complete Guide

## 📋 Overview

The VaultAssetShield contract now supports a complete investment lifecycle for users:

1. **Invest** - Users can invest ETH in any asset
2. **Track** - Real-time tracking of principal and earnings
3. **Earn** - Automatic APY-based earnings calculation
4. **Withdraw** - Withdraw principal + earnings anytime

## 🔄 Complete Investment Flow

### 1. Asset Owner Sets APY

```solidity
// Owner sets APY for their asset (in basis points)
setAssetAPY(assetId, 850)  // 850 = 8.5%
```

**APY Examples:**
- 350 = 3.5%
- 850 = 8.5%
- 1200 = 12.0%
- 1500 = 15.0%

### 2. User Invests

```solidity
// User invests ETH in an asset
invest(assetId, "Investment in Manhattan Office Tower") payable
```

**What Happens:**
- ✅ User sends ETH to contract
- ✅ Investment is recorded with timestamp and APY
- ✅ Asset value increases
- ✅ Transaction is logged
- ✅ Event `InvestmentMade` is emitted

### 3. Earnings Calculation

```solidity
// Calculate current earnings
calculateEarnings(userAddress, assetId)
```

**Formula:**
```
earnings = (principal * APY * timeElapsed) / (365 days * 10000)
```

**Example:**
- Principal: 0.1 ETH ($350)
- APY: 8.5% (850 basis points)
- Time: 30 days
- Earnings: ~0.0007 ETH (~$2.42)

### 4. View Investment Details

```solidity
// Get user's investment info
getUserInvestment(userAddress, assetId)
```

**Returns:**
- `amount` - Principal invested
- `timestamp` - Investment start time
- `apy` - APY at time of investment
- `isActive` - Whether investment is active
- `currentEarnings` - Current accumulated earnings

### 5. Withdraw Investment

```solidity
// Withdraw principal + earnings
withdrawInvestment(assetId)
```

**What Happens:**
- ✅ Calculates total earnings
- ✅ Marks investment as inactive
- ✅ Decreases asset value
- ✅ Transfers principal + earnings to user
- ✅ Event `InvestmentWithdrawn` is emitted

## 📊 Data Structures

### Investment Structure

```solidity
struct Investment {
    uint256 amount;          // Principal amount invested
    uint256 timestamp;       // When investment was made
    uint256 apy;            // APY in basis points (850 = 8.5%)
    bool isActive;          // Is investment currently active
}
```

### Mappings

```solidity
// User => AssetId => Investment details
mapping(address => mapping(uint256 => Investment)) public userInvestments;

// AssetId => APY (in basis points)
mapping(uint256 => uint256) public assetAPY;
```

## 🎯 User Journey Example

### Day 0 - Investment
```
User invests: 0.1 ETH ($350) in Manhattan Office Tower
APY: 8.5%
Principal: 0.1 ETH
Earnings: 0 ETH
Total: 0.1 ETH
```

### Day 30 - Check Earnings
```
Time elapsed: 30 days
Principal: 0.1 ETH
Earnings: ~0.0007 ETH (~$2.42)
Total: ~0.1007 ETH (~$352.42)
```

### Day 365 - One Year Later
```
Time elapsed: 365 days
Principal: 0.1 ETH
Earnings: ~0.0085 ETH (~$29.75)
Total: ~0.1085 ETH (~$379.75)
```

### Withdraw
```
Withdraw total: 0.1085 ETH ($379.75)
Investment marked as inactive
User receives: Principal + Earnings = $379.75
ROI: $29.75 (8.5%)
```

## 🔐 Security Features

### Investment Protection
- ✅ Only active assets can receive investments
- ✅ Investment amount must be > 0
- ✅ Contract balance check before withdrawal
- ✅ Investment marked inactive before transfer

### Earnings Calculation
- ✅ Time-based earnings (per second precision)
- ✅ APY locked at investment time
- ✅ Compound reinvestment supported
- ✅ No negative earnings

### Withdrawal Protection
- ✅ Only investor can withdraw their own funds
- ✅ Requires active investment
- ✅ Checks contract balance
- ✅ Safe transfer with error handling

## 📈 Multiple Investments

### Scenario 1: New Investment
```solidity
// First investment
invest(assetId, "Initial Investment") {value: 0.1 ETH}
// Creates new investment record
```

### Scenario 2: Additional Investment
```solidity
// Additional investment to same asset
invest(assetId, "Additional Investment") {value: 0.05 ETH}
// Existing earnings are added to principal
// New timestamp resets earning period
// New principal: 0.1 + 0.05 + existing earnings
```

## 🎯 Frontend Integration

### Required Functions

1. **Invest**
```typescript
const { writeContract } = useWriteContract()

await writeContract({
  address: contractAddress,
  abi: VaultAssetShieldABI,
  functionName: 'invest',
  args: [assetId, description],
  value: amountInWei
})
```

2. **View Investment**
```typescript
const { data } = useReadContract({
  address: contractAddress,
  abi: VaultAssetShieldABI,
  functionName: 'getUserInvestment',
  args: [userAddress, assetId]
})

// Returns: [amount, timestamp, apy, isActive, currentEarnings]
```

3. **Calculate Earnings**
```typescript
const { data: earnings } = useReadContract({
  address: contractAddress,
  abi: VaultAssetShieldABI,
  functionName: 'calculateEarnings',
  args: [userAddress, assetId]
})
```

4. **Withdraw**
```typescript
const { writeContract } = useWriteContract()

await writeContract({
  address: contractAddress,
  abi: VaultAssetShieldABI,
  functionName: 'withdrawInvestment',
  args: [assetId]
})
```

## 🚀 Deployment Checklist

### Before Deployment
- [x] Add Investment struct
- [x] Add userInvestments mapping
- [x] Add assetAPY mapping
- [x] Add InvestmentMade event
- [x] Add InvestmentWithdrawn event

### After Deployment
- [ ] Deploy new contract
- [ ] Update contract address in .env
- [ ] Set APY for each asset
- [ ] Initialize assets with APY
- [ ] Update frontend with new ABI
- [ ] Add investment UI components
- [ ] Add withdraw UI components
- [ ] Test full lifecycle

## 💡 Key Features

✅ **Flexible APY** - Each asset can have different APY
✅ **Real-time Earnings** - Per-second calculation
✅ **Compound Reinvestment** - Additional investments include earnings
✅ **Anytime Withdrawal** - No lock-up period
✅ **Full Transparency** - All data visible on-chain
✅ **Event Logging** - Complete audit trail
✅ **Safe Transfers** - Protected withdrawal mechanism

## 📝 Notes

- APY is stored in basis points (1% = 100 basis points)
- Earnings calculated per second for precision
- Multiple investments in same asset are cumulative
- Withdrawal includes all accumulated earnings
- Investment becomes inactive after withdrawal
- Contract must have sufficient ETH for withdrawals
