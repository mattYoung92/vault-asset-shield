# Vault Asset Shield - 部署指南

## 项目概述

Vault Asset Shield 是一个去中心化的资产管理系统，支持创建、管理和投资各种类型的资产。该项目已经修改为使用非加密方法进行数据上链，实现了前端与合约端的端对端功能打通。

## 主要功能

### 智能合约功能
- ✅ 创建资产 (createAsset)
- ✅ 创建投资组合 (createPortfolio)
- ✅ 添加资产到投资组合 (addAssetToPortfolio)
- ✅ 执行交易 (executeTransaction)
- ✅ 风险评估 (assessRisk)
- ✅ 资产验证 (verifyAsset)
- ✅ 用户声誉管理 (updateUserReputation)

### 前端功能
- ✅ 钱包连接 (WalletConnect)
- ✅ 资产展示和筛选
- ✅ 投资模态框
- ✅ 实时合约数据读取
- ✅ 交易执行

## 部署步骤

### 1. 环境准备

```bash
# 安装依赖
npm install

# 复制环境配置文件
cp env.example .env
```

### 2. 配置环境变量

编辑 `.env` 文件：

```env
# 钱包连接配置
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# 合约地址 (部署后更新)
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# 私钥 (用于部署)
PRIVATE_KEY=your_private_key_here

# Etherscan API Key (用于合约验证)
ETHERSCAN_API_KEY=your_etherscan_api_key

# RPC URLs
VITE_SEPOLIA_RPC_URL=https://sepolia.gateway.tenderly.co
```

### 3. 编译合约

```bash
npx hardhat compile
```

### 4. 部署合约

```bash
# 部署到 Sepolia 测试网
npx hardhat run scripts/deploy.js --network sepolia
```

### 5. 更新前端配置

部署完成后，更新 `.env` 文件中的 `VITE_CONTRACT_ADDRESS` 为实际部署的合约地址。

### 6. 启动前端

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 合约架构

### 数据结构

```solidity
struct Asset {
    uint32 assetId;
    uint256 value;
    uint256 quantity;
    uint8 assetType;
    bool isActive;
    bool isVerified;
    string name;
    string description;
    string metadataHash;
    address owner;
    uint256 createdAt;
    uint256 updatedAt;
}

struct Portfolio {
    uint32 portfolioId;
    uint256 totalValue;
    uint256 assetCount;
    bool isPublic;
    bool isVerified;
    string name;
    string description;
    address owner;
    uint256 createdAt;
    uint256 updatedAt;
}
```

### 主要函数

1. **createAsset**: 创建新资产
2. **createPortfolio**: 创建投资组合
3. **addAssetToPortfolio**: 添加资产到组合
4. **executeTransaction**: 执行交易
5. **assessRisk**: 风险评估
6. **verifyAsset**: 资产验证

## 前端集成

### 合约交互 Hooks

```typescript
// 创建资产
const { createAsset } = useVaultAssetShield();

// 获取资产信息
const { assetInfo } = useAssetInfo(assetId);

// 获取用户资产
const { userAssets } = useUserAssets(userAddress);

// 执行交易
const { executeTransaction } = useVaultAssetShield();
```

### 组件使用

```tsx
// 资产卡片
<AssetCard 
  assetId={1}
  title="Manhattan Tower RWA"
  type="real-estate"
  value="$45.2M"
  apy="8.5%"
  minInvestment="$10,000"
  image={realEstate1}
/>

// 投资模态框
<InvestModal
  isOpen={isOpen}
  onClose={onClose}
  assetId={assetId}
  assetTitle="Asset Name"
  assetType="real-estate"
  currentValue={45200000}
  minInvestment="$10,000"
/>
```

## 测试

### 合约测试

```bash
npx hardhat test
```

### 前端测试

```bash
npm run test
```

## 网络配置

### Sepolia 测试网

- 网络 ID: 11155111
- RPC URL: https://sepolia.gateway.tenderly.co
- 区块浏览器: https://sepolia.etherscan.io

### 主网部署

1. 更新 `hardhat.config.js` 中的网络配置
2. 确保有足够的 ETH 用于 gas 费用
3. 运行部署脚本

## 安全注意事项

1. **私钥安全**: 永远不要在代码中硬编码私钥
2. **合约验证**: 部署后立即验证合约
3. **权限管理**: 确保只有授权地址可以执行管理功能
4. **测试**: 在测试网上充分测试后再部署到主网

## 故障排除

### 常见问题

1. **部署失败**: 检查私钥和网络配置
2. **前端连接失败**: 检查合约地址和网络 ID
3. **交易失败**: 检查 gas 费用和账户余额

### 调试工具

- Hardhat Console: `npx hardhat console`
- 区块浏览器: 查看交易详情
- 浏览器开发者工具: 检查前端错误

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 许可证

MIT License
