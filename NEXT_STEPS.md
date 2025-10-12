# 下一步部署步骤

## ✅ 已完成的工作

1. **智能合约更新**
   - ✅ 添加完整的投资生命周期功能
   - ✅ 实现 `invest()` 函数 - 用户投资
   - ✅ 实现 `withdrawInvestment()` 函数 - 提取资金
   - ✅ 实现 `calculateEarnings()` 函数 - 计算收益
   - ✅ 实现 `getUserInvestment()` 函数 - 查看投资详情
   - ✅ 添加投资追踪数据结构
   - ✅ 添加 APY 管理功能

2. **前端更新**
   - ✅ 更新 ABI 包含新的投资函数
   - ✅ 添加 `invest` 和 `withdrawInvestment` hooks
   - ✅ 更新 `InvestModal` 使用新的 `invest` 函数
   - ✅ 修复 USD 到 ETH 转换逻辑
   - ✅ 添加真实资产数据展示

3. **文档**
   - ✅ 创建投资生命周期指南 (`INVESTMENT_LIFECYCLE.md`)
   - ✅ 创建部署脚本 (`deploy-with-investment.cjs`)

## 🚀 需要手动完成的步骤

### 步骤 1: 重新部署合约

由于 Hardhat 环境配置问题，需要您手动部署合约：

#### 选项 A: 使用 Remix IDE（推荐）

1. 打开 https://remix.ethereum.org/
2. 创建新文件 `VaultAssetShield.sol`
3. 复制 `/Users/nithon/Desktop/Zama/vault-asset-shield/contracts/VaultAssetShield.sol` 的内容
4. 编译合约（Solidity 0.8.24）
5. 连接 MetaMask 到 Sepolia 测试网
6. 部署合约，构造函数参数：
   - `_verifier`: 您的地址
   - `_riskAssessor`: 您的地址
7. 复制部署的合约地址

#### 选项 B: 使用 Hardhat（如果环境正常）

```bash
cd /Users/nithon/Desktop/Zama/vault-asset-shield
HARDHAT_CONFIG=hardhat.config.cjs npx hardhat run scripts/deploy-with-investment.cjs --network sepolia
```

### 步骤 2: 更新合约地址

部署成功后，更新 `.env` 文件：

```bash
VITE_CONTRACT_ADDRESS=新部署的合约地址
```

### 步骤 3: 初始化资产和 APY

部署合约后，需要创建资产并设置 APY。使用以下脚本或手动调用：

```javascript
// 1. 创建资产
await contract.createAsset(
  "Manhattan Office Tower",
  "Premium commercial real estate...",
  ethers.parseEther("350000"),
  ethers.parseEther("1000000"),
  1, // Real Estate
  "QmHash0"
);

// 2. 设置 APY
await contract.setAssetAPY(0, 850); // 8.5%
```

或者创建一个简单的初始化脚本：

```javascript
// scripts/init-assets.js
const assets = [
  { name: "Manhattan Office Tower", apy: 850 },  // 8.5%
  { name: "US Treasury Bonds 2024", apy: 350 },  // 3.5%
  { name: "Tech Startup Equity", apy: 1500 },    // 15.0%
  { name: "Gold Commodity Fund", apy: 620 },     // 6.2%
  { name: "Bitcoin ETF", apy: 1280 },            // 12.8%
  { name: "European Real Estate Fund", apy: 730 } // 7.3%
];

for (let i = 0; i < assets.length; i++) {
  await contract.setAssetAPY(i, assets[i].apy);
}
```

### 步骤 4: 测试投资功能

1. 刷新前端页面
2. 连接钱包
3. 选择一个资产
4. 点击 "Invest Privately"
5. 输入投资金额（例如：$100）
6. 确认交易
7. 等待交易确认

### 步骤 5: 验证合约（可选）

在 Etherscan 上验证合约：

```bash
HARDHAT_CONFIG=hardhat.config.cjs npx hardhat verify --network sepolia <合约地址> <verifier地址> <riskAssessor地址>
```

## 📝 当前合约地址信息

**旧合约**: `0xa68cc631b5081D41c48f51b7e5771470a75c21df`  
**新合约**: 待部署

## 🔍 关键函数说明

### 用户可调用的函数

1. **invest(assetId, description) payable**
   - 投资指定资产
   - 发送 ETH 作为投资金额
   - 自动记录投资时间和 APY

2. **withdrawInvestment(assetId)**
   - 提取投资和收益
   - 计算并返还本金 + 收益
   - 标记投资为非活跃状态

3. **getUserInvestment(userAddress, assetId) view**
   - 查看用户在特定资产中的投资详情
   - 返回：本金、时间、APY、是否活跃、当前收益

4. **calculateEarnings(userAddress, assetId) view**
   - 计算用户当前收益
   - 基于 APY 和时间

### 资产所有者函数

1. **setAssetAPY(assetId, apy)**
   - 设置资产的 APY
   - APY 以基点表示（850 = 8.5%）

## ⚠️ 重要提醒

1. **合约余额**: 确保合约有足够的 ETH 来支付用户提取
2. **APY 设置**: 所有资产必须设置 APY 才能正常计算收益
3. **测试网 ETH**: 确保账户有足够的 Sepolia ETH 进行测试
4. **Gas 费用**: 部署和初始化会消耗较多 Gas

## 📊 测试场景

### 测试场景 1: 基本投资流程
1. 用户投资 $100 (0.0286 ETH)
2. 等待 1 分钟
3. 查看收益（应该有少量收益）
4. 提取投资
5. 验证收到本金 + 收益

### 测试场景 2: 多次投资
1. 用户投资 $100
2. 等待一段时间
3. 再次投资 $50
4. 验证本金累加，收益合并

### 测试场景 3: 不同 APY
1. 投资高 APY 资产（15%）
2. 投资低 APY 资产（3.5%）
3. 比较收益差异

## 🎉 预期结果

完成所有步骤后，用户应该能够：

✅ 浏览 6 种不同的真实资产  
✅ 以 $100 起投任何资产  
✅ 实时查看投资和收益  
✅ 随时提取本金 + 收益  
✅ 看到基于时间和 APY 的真实收益  

## 📞 需要帮助？

如果部署过程中遇到问题，可以：

1. 检查 `.env` 文件配置是否正确
2. 确认 MetaMask 连接到 Sepolia 测试网
3. 查看浏览器控制台的错误信息
4. 在 Etherscan 上查看交易详情

祝部署顺利！🚀
