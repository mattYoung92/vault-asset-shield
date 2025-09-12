// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VaultAssetShield is SepoliaConfig {
    using FHE for *;
    
    enum AssetType {
        BOND,
        REAL_ESTATE,
        CRYPTO,
        STOCK,
        COMMODITY
    }
    
    struct Asset {
        euint32 assetId;
        euint32 value;
        euint32 quantity;
        euint8 assetType;
        ebool isActive;
        ebool isVerified;
        string name;
        string description;
        string metadataHash;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct Portfolio {
        euint32 portfolioId;
        euint32 totalValue;
        euint32 assetCount;
        ebool isPublic;
        ebool isVerified;
        string name;
        string description;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct Transaction {
        euint32 transactionId;
        euint32 amount;
        euint8 transactionType; // 0: deposit, 1: withdraw, 2: transfer
        ebool isCompleted;
        string description;
        address from;
        address to;
        uint256 timestamp;
    }
    
    struct RiskAssessment {
        euint32 riskScore;
        euint32 volatility;
        euint32 liquidity;
        ebool isHighRisk;
        string assessmentHash;
        address assessor;
        uint256 timestamp;
    }
    
    mapping(uint256 => Asset) public assets;
    mapping(uint256 => Portfolio) public portfolios;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => RiskAssessment) public riskAssessments;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userBalance;
    mapping(address => uint256[]) public userAssets;
    mapping(address => uint256[]) public userPortfolios;
    
    uint256 public assetCounter;
    uint256 public portfolioCounter;
    uint256 public transactionCounter;
    uint256 public riskAssessmentCounter;
    
    address public owner;
    address public verifier;
    address public riskAssessor;
    
    event AssetCreated(uint256 indexed assetId, address indexed owner, string name);
    event PortfolioCreated(uint256 indexed portfolioId, address indexed owner, string name);
    event TransactionExecuted(uint256 indexed transactionId, address indexed from, address indexed to, uint8 transactionType);
    event RiskAssessmentUpdated(uint256 indexed assetId, uint32 riskScore);
    event AssetVerified(uint256 indexed assetId, bool isVerified);
    event PortfolioVerified(uint256 indexed portfolioId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier, address _riskAssessor) {
        owner = msg.sender;
        verifier = _verifier;
        riskAssessor = _riskAssessor;
    }
    
    function createAsset(
        string memory _name,
        string memory _description,
        uint256 _value,
        uint256 _quantity,
        uint8 _assetType,
        string memory _metadataHash
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Asset name cannot be empty");
        require(_value > 0, "Asset value must be positive");
        require(_quantity > 0, "Asset quantity must be positive");
        require(_assetType <= 4, "Invalid asset type");
        
        uint256 assetId = assetCounter++;
        
        assets[assetId] = Asset({
            assetId: FHE.asEuint32(0), // Will be set properly later
            value: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            quantity: FHE.asEuint32(0), // Will be set to actual quantity via FHE operations
            assetType: FHE.asEuint8(_assetType),
            isActive: FHE.asEbool(true),
            isVerified: FHE.asEbool(false),
            name: _name,
            description: _description,
            metadataHash: _metadataHash,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        userAssets[msg.sender].push(assetId);
        
        emit AssetCreated(assetId, msg.sender, _name);
        return assetId;
    }
    
    function createPortfolio(
        string memory _name,
        string memory _description,
        bool _isPublic
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Portfolio name cannot be empty");
        
        uint256 portfolioId = portfolioCounter++;
        
        portfolios[portfolioId] = Portfolio({
            portfolioId: FHE.asEuint32(0), // Will be set properly later
            totalValue: FHE.asEuint32(0),
            assetCount: FHE.asEuint32(0),
            isPublic: FHE.asEbool(_isPublic),
            isVerified: FHE.asEbool(false),
            name: _name,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        userPortfolios[msg.sender].push(portfolioId);
        
        emit PortfolioCreated(portfolioId, msg.sender, _name);
        return portfolioId;
    }
    
    function addAssetToPortfolio(
        uint256 _portfolioId,
        uint256 _assetId,
        externalEuint32 quantity,
        bytes calldata inputProof
    ) public {
        require(portfolios[_portfolioId].owner == msg.sender, "Only portfolio owner can add assets");
        require(assets[_assetId].owner == msg.sender, "Only asset owner can add to portfolio");
        require(portfolios[_portfolioId].owner != address(0), "Portfolio does not exist");
        require(assets[_assetId].owner != address(0), "Asset does not exist");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalQuantity = FHE.fromExternal(quantity, inputProof);
        
        // Update portfolio totals
        portfolios[_portfolioId].assetCount = FHE.add(portfolios[_portfolioId].assetCount, FHE.asEuint32(1));
        portfolios[_portfolioId].totalValue = FHE.add(portfolios[_portfolioId].totalValue, FHE.mul(assets[_assetId].value, internalQuantity));
        portfolios[_portfolioId].updatedAt = block.timestamp;
    }
    
    function executeTransaction(
        uint256 _fromAssetId,
        uint256 _toAssetId,
        externalEuint32 amount,
        uint8 _transactionType,
        string memory _description,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(assets[_fromAssetId].owner == msg.sender, "Only asset owner can execute transaction");
        require(_transactionType <= 2, "Invalid transaction type");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        transactions[transactionId] = Transaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            transactionType: FHE.asEuint8(_transactionType),
            isCompleted: FHE.asEbool(true),
            description: _description,
            from: msg.sender,
            to: _toAssetId != 0 ? assets[_toAssetId].owner : address(0),
            timestamp: block.timestamp
        });
        
        // Update asset values based on transaction type
        if (_transactionType == 0) { // Deposit
            assets[_fromAssetId].value = FHE.add(assets[_fromAssetId].value, internalAmount);
        } else if (_transactionType == 1) { // Withdraw
            assets[_fromAssetId].value = FHE.sub(assets[_fromAssetId].value, internalAmount);
        } else if (_transactionType == 2) { // Transfer
            assets[_fromAssetId].value = FHE.sub(assets[_fromAssetId].value, internalAmount);
            if (_toAssetId != 0) {
                assets[_toAssetId].value = FHE.add(assets[_toAssetId].value, internalAmount);
            }
        }
        
        assets[_fromAssetId].updatedAt = block.timestamp;
        if (_toAssetId != 0) {
            assets[_toAssetId].updatedAt = block.timestamp;
        }
        
        emit TransactionExecuted(transactionId, msg.sender, _toAssetId != 0 ? assets[_toAssetId].owner : address(0), _transactionType);
        return transactionId;
    }
    
    function assessRisk(
        uint256 _assetId,
        externalEuint32 riskScore,
        externalEuint32 volatility,
        externalEuint32 liquidity,
        string memory _assessmentHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(msg.sender == riskAssessor, "Only risk assessor can assess risk");
        require(assets[_assetId].owner != address(0), "Asset does not exist");
        
        uint256 assessmentId = riskAssessmentCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalRiskScore = FHE.fromExternal(riskScore, inputProof);
        euint32 internalVolatility = FHE.fromExternal(volatility, inputProof);
        euint32 internalLiquidity = FHE.fromExternal(liquidity, inputProof);
        
        // Determine if asset is high risk (risk score > 70)
        ebool isHighRisk = FHE.gt(internalRiskScore, FHE.asEuint32(70));
        
        riskAssessments[assessmentId] = RiskAssessment({
            riskScore: internalRiskScore,
            volatility: internalVolatility,
            liquidity: internalLiquidity,
            isHighRisk: isHighRisk,
            assessmentHash: _assessmentHash,
            assessor: msg.sender,
            timestamp: block.timestamp
        });
        
        emit RiskAssessmentUpdated(_assetId, 0); // Risk score will be decrypted off-chain
        return assessmentId;
    }
    
    function verifyAsset(uint256 _assetId, bool _isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify assets");
        require(assets[_assetId].owner != address(0), "Asset does not exist");
        
        assets[_assetId].isVerified = FHE.asEbool(_isVerified);
        assets[_assetId].updatedAt = block.timestamp;
        
        emit AssetVerified(_assetId, _isVerified);
    }
    
    function verifyPortfolio(uint256 _portfolioId, bool _isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify portfolios");
        require(portfolios[_portfolioId].owner != address(0), "Portfolio does not exist");
        
        portfolios[_portfolioId].isVerified = FHE.asEbool(_isVerified);
        portfolios[_portfolioId].updatedAt = block.timestamp;
        
        emit PortfolioVerified(_portfolioId, _isVerified);
    }
    
    function updateUserReputation(address _user, externalEuint32 reputation, bytes calldata inputProof) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(_user != address(0), "Invalid user address");
        
        euint32 internalReputation = FHE.fromExternal(reputation, inputProof);
        userReputation[_user] = internalReputation;
        
        emit ReputationUpdated(_user, 0); // Reputation will be decrypted off-chain
    }
    
    function getAssetInfo(uint256 _assetId) public view returns (
        string memory name,
        string memory description,
        uint8 assetType,
        bool isActive,
        bool isVerified,
        string memory metadataHash,
        address owner,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Asset storage asset = assets[_assetId];
        return (
            asset.name,
            asset.description,
            0, // FHE.decrypt(asset.assetType) - will be decrypted off-chain
            false, // FHE.decrypt(asset.isActive) - will be decrypted off-chain
            false, // FHE.decrypt(asset.isVerified) - will be decrypted off-chain
            asset.metadataHash,
            asset.owner,
            asset.createdAt,
            asset.updatedAt
        );
    }
    
    function getPortfolioInfo(uint256 _portfolioId) public view returns (
        string memory name,
        string memory description,
        bool isPublic,
        bool isVerified,
        address owner,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Portfolio storage portfolio = portfolios[_portfolioId];
        return (
            portfolio.name,
            portfolio.description,
            false, // FHE.decrypt(portfolio.isPublic) - will be decrypted off-chain
            false, // FHE.decrypt(portfolio.isVerified) - will be decrypted off-chain
            portfolio.owner,
            portfolio.createdAt,
            portfolio.updatedAt
        );
    }
    
    function getTransactionInfo(uint256 _transactionId) public view returns (
        uint8 transactionType,
        bool isCompleted,
        string memory description,
        address from,
        address to,
        uint256 timestamp
    ) {
        Transaction storage transaction = transactions[_transactionId];
        return (
            0, // FHE.decrypt(transaction.transactionType) - will be decrypted off-chain
            false, // FHE.decrypt(transaction.isCompleted) - will be decrypted off-chain
            transaction.description,
            transaction.from,
            transaction.to,
            transaction.timestamp
        );
    }
    
    function getRiskAssessmentInfo(uint256 _assessmentId) public view returns (
        bool isHighRisk,
        string memory assessmentHash,
        address assessor,
        uint256 timestamp
    ) {
        RiskAssessment storage assessment = riskAssessments[_assessmentId];
        return (
            false, // FHE.decrypt(assessment.isHighRisk) - will be decrypted off-chain
            assessment.assessmentHash,
            assessment.assessor,
            assessment.timestamp
        );
    }
    
    function getUserReputation(address _user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[_user]) - will be decrypted off-chain
    }
    
    function getUserBalance(address _user) public view returns (uint8) {
        return 0; // FHE.decrypt(userBalance[_user]) - will be decrypted off-chain
    }
    
    function getUserAssets(address _user) public view returns (uint256[] memory) {
        return userAssets[_user];
    }
    
    function getUserPortfolios(address _user) public view returns (uint256[] memory) {
        return userPortfolios[_user];
    }
    
    function getAssetCount() public view returns (uint256) {
        return assetCounter;
    }
    
    function getPortfolioCount() public view returns (uint256) {
        return portfolioCounter;
    }
    
    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
    
    function getRiskAssessmentCount() public view returns (uint256) {
        return riskAssessmentCounter;
    }
}
