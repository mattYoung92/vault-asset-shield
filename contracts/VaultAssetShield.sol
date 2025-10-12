// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract VaultAssetShield {
    
    enum AssetType {
        BOND,
        REAL_ESTATE,
        CRYPTO,
        STOCK,
        COMMODITY
    }
    
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
    
    struct Transaction {
        uint32 transactionId;
        uint256 amount;
        uint8 transactionType; // 0: deposit, 1: withdraw, 2: transfer
        bool isCompleted;
        string description;
        address from;
        address to;
        uint256 timestamp;
    }
    
    struct RiskAssessment {
        uint32 riskScore;
        uint32 volatility;
        uint32 liquidity;
        bool isHighRisk;
        string assessmentHash;
        address assessor;
        uint256 timestamp;
    }
    
    mapping(uint256 => Asset) public assets;
    mapping(uint256 => Portfolio) public portfolios;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => RiskAssessment) public riskAssessments;
    mapping(address => uint32) public userReputation;
    mapping(address => uint256) public userBalance;
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
            assetId: uint32(assetId),
            value: _value,
            quantity: _quantity,
            assetType: _assetType,
            isActive: true,
            isVerified: false,
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
            portfolioId: uint32(portfolioId),
            totalValue: 0,
            assetCount: 0,
            isPublic: _isPublic,
            isVerified: false,
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
        uint256 quantity
    ) public {
        require(portfolios[_portfolioId].owner == msg.sender, "Only portfolio owner can add assets");
        require(assets[_assetId].owner == msg.sender, "Only asset owner can add to portfolio");
        require(portfolios[_portfolioId].owner != address(0), "Portfolio does not exist");
        require(assets[_assetId].owner != address(0), "Asset does not exist");
        
        // Update portfolio totals
        portfolios[_portfolioId].assetCount += 1;
        portfolios[_portfolioId].totalValue += assets[_assetId].value * quantity;
        portfolios[_portfolioId].updatedAt = block.timestamp;
    }
    
    function executeTransaction(
        uint256 _fromAssetId,
        uint256 _toAssetId,
        uint256 amount,
        uint8 _transactionType,
        string memory _description
    ) public returns (uint256) {
        require(assets[_fromAssetId].owner == msg.sender, "Only asset owner can execute transaction");
        require(_transactionType <= 2, "Invalid transaction type");
        
        uint256 transactionId = transactionCounter++;
        
        transactions[transactionId] = Transaction({
            transactionId: uint32(transactionId),
            amount: amount,
            transactionType: _transactionType,
            isCompleted: true,
            description: _description,
            from: msg.sender,
            to: _toAssetId != 0 ? assets[_toAssetId].owner : address(0),
            timestamp: block.timestamp
        });
        
        // Update asset values based on transaction type
        if (_transactionType == 0) { // Deposit
            assets[_fromAssetId].value += amount;
        } else if (_transactionType == 1) { // Withdraw
            require(assets[_fromAssetId].value >= amount, "Insufficient asset value");
            assets[_fromAssetId].value -= amount;
        } else if (_transactionType == 2) { // Transfer
            require(assets[_fromAssetId].value >= amount, "Insufficient asset value");
            assets[_fromAssetId].value -= amount;
            if (_toAssetId != 0) {
                assets[_toAssetId].value += amount;
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
        uint32 riskScore,
        uint32 volatility,
        uint32 liquidity,
        string memory _assessmentHash
    ) public returns (uint256) {
        require(msg.sender == riskAssessor, "Only risk assessor can assess risk");
        require(assets[_assetId].owner != address(0), "Asset does not exist");
        
        uint256 assessmentId = riskAssessmentCounter++;
        
        // Determine if asset is high risk (risk score > 70)
        bool isHighRisk = riskScore > 70;
        
        riskAssessments[assessmentId] = RiskAssessment({
            riskScore: riskScore,
            volatility: volatility,
            liquidity: liquidity,
            isHighRisk: isHighRisk,
            assessmentHash: _assessmentHash,
            assessor: msg.sender,
            timestamp: block.timestamp
        });
        
        emit RiskAssessmentUpdated(_assetId, riskScore);
        return assessmentId;
    }
    
    function verifyAsset(uint256 _assetId, bool _isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify assets");
        require(assets[_assetId].owner != address(0), "Asset does not exist");
        
        assets[_assetId].isVerified = _isVerified;
        assets[_assetId].updatedAt = block.timestamp;
        
        emit AssetVerified(_assetId, _isVerified);
    }
    
    function verifyPortfolio(uint256 _portfolioId, bool _isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify portfolios");
        require(portfolios[_portfolioId].owner != address(0), "Portfolio does not exist");
        
        portfolios[_portfolioId].isVerified = _isVerified;
        portfolios[_portfolioId].updatedAt = block.timestamp;
        
        emit PortfolioVerified(_portfolioId, _isVerified);
    }
    
    function updateUserReputation(address _user, uint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(_user != address(0), "Invalid user address");
        
        userReputation[_user] = reputation;
        
        emit ReputationUpdated(_user, reputation);
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
            asset.assetType,
            asset.isActive,
            asset.isVerified,
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
            portfolio.isPublic,
            portfolio.isVerified,
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
            transaction.transactionType,
            transaction.isCompleted,
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
            assessment.isHighRisk,
            assessment.assessmentHash,
            assessment.assessor,
            assessment.timestamp
        );
    }
    
    function getUserReputation(address _user) public view returns (uint32) {
        return userReputation[_user];
    }
    
    function getUserBalance(address _user) public view returns (uint256) {
        return userBalance[_user];
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
    
    function getAssetValue(uint256 _assetId) public view returns (uint256) {
        return assets[_assetId].value;
    }
    
    function getAssetQuantity(uint256 _assetId) public view returns (uint256) {
        return assets[_assetId].quantity;
    }
    
    function getPortfolioTotalValue(uint256 _portfolioId) public view returns (uint256) {
        return portfolios[_portfolioId].totalValue;
    }
    
    function getPortfolioAssetCount(uint256 _portfolioId) public view returns (uint256) {
        return portfolios[_portfolioId].assetCount;
    }
    
    function getTransactionAmount(uint256 _transactionId) public view returns (uint256) {
        return transactions[_transactionId].amount;
    }
    
    function getRiskScore(uint256 _assessmentId) public view returns (uint32) {
        return riskAssessments[_assessmentId].riskScore;
    }
    
    function getRiskVolatility(uint256 _assessmentId) public view returns (uint32) {
        return riskAssessments[_assessmentId].volatility;
    }
    
    function getRiskLiquidity(uint256 _assessmentId) public view returns (uint32) {
        return riskAssessments[_assessmentId].liquidity;
    }
}
