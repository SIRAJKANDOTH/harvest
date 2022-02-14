


const Web3 = require("web3")
const web3 = new Web3("http://localhost:8545")
const BN = web3.utils.BN;
const recipientAddress = "0xB1b3feF89f3433af8f6EB00410057c986cFe0E0c";
const ERC20 = {
    "contractName": "IERC20",
    "abi": [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "metadata": "{\"compiler\":{\"version\":\"0.5.17+commit.d19bba13\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Interface of the ERC20 standard as defined in the EIP. Does not include the optional functions; to access them see {ERC20Detailed}.\",\"methods\":{\"allowance(address,address)\":{\"details\":\"Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default.     * This value changes when {approve} or {transferFrom} are called.\"},\"approve(address,uint256)\":{\"details\":\"Sets `amount` as the allowance of `spender` over the caller's tokens.     * Returns a boolean value indicating whether the operation succeeded.     * IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729     * Emits an {Approval} event.\"},\"balanceOf(address)\":{\"details\":\"Returns the amount of tokens owned by `account`.\"},\"totalSupply()\":{\"details\":\"Returns the amount of tokens in existence.\"},\"transfer(address,uint256)\":{\"details\":\"Moves `amount` tokens from the caller's account to `recipient`.     * Returns a boolean value indicating whether the operation succeeded.     * Emits a {Transfer} event.\"},\"transferFrom(address,address,uint256)\":{\"details\":\"Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance.     * Returns a boolean value indicating whether the operation succeeded.     * Emits a {Transfer} event.\"}}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"@openzeppelin/contracts/token/ERC20/IERC20.sol\":\"IERC20\"},\"evmVersion\":\"petersburg\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xe5bb0f57cff3e299f360052ba50f1ea0fff046df2be070b6943e0e3c3fdad8a9\",\"urls\":[\"bzz-raw://59fd025151435da35faa8093a5c7a17de02de9d08ad27275c5cdf05050820d91\",\"dweb:/ipfs/QmQMvwEcPhoRXzbXyrdoeRtvLoifUW9Qh7Luho7bmUPRkc\"]}},\"version\":1}",
    "bytecode": "0x",
    "deployedBytecode": "0x",
    "sourceMap": "",
    "deployedSourceMap": "",
    "source": "pragma solidity ^0.5.0;\n\n/**\n * @dev Interface of the ERC20 standard as defined in the EIP. Does not include\n * the optional functions; to access them see {ERC20Detailed}.\n */\ninterface IERC20 {\n    /**\n     * @dev Returns the amount of tokens in existence.\n     */\n    function totalSupply() external view returns (uint256);\n\n    /**\n     * @dev Returns the amount of tokens owned by `account`.\n     */\n    function balanceOf(address account) external view returns (uint256);\n\n    /**\n     * @dev Moves `amount` tokens from the caller's account to `recipient`.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transfer(address recipient, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Returns the remaining number of tokens that `spender` will be\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\n     * zero by default.\n     *\n     * This value changes when {approve} or {transferFrom} are called.\n     */\n    function allowance(address owner, address spender) external view returns (uint256);\n\n    /**\n     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\n     * that someone may use both the old and the new allowance by unfortunate\n     * transaction ordering. One possible solution to mitigate this race\n     * condition is to first reduce the spender's allowance to 0 and set the\n     * desired value afterwards:\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n     *\n     * Emits an {Approval} event.\n     */\n    function approve(address spender, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Moves `amount` tokens from `sender` to `recipient` using the\n     * allowance mechanism. `amount` is then deducted from the caller's\n     * allowance.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\n     * another (`to`).\n     *\n     * Note that `value` may be zero.\n     */\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    /**\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\n     * a call to {approve}. `value` is the new allowance.\n     */\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n}\n",
    "sourcePath": "@openzeppelin/contracts/token/ERC20/IERC20.sol",
    "ast": {
        "absolutePath": "@openzeppelin/contracts/token/ERC20/IERC20.sol",
        "exportedSymbols": {
            "IERC20": [
                16262
            ]
        },
        "id": 16263,
        "nodeType": "SourceUnit",
        "nodes": [
            {
                "id": 16195,
                "literals": [
                    "solidity",
                    "^",
                    "0.5",
                    ".0"
                ],
                "nodeType": "PragmaDirective",
                "src": "0:23:61"
            },
            {
                "baseContracts": [],
                "contractDependencies": [],
                "contractKind": "interface",
                "documentation": "@dev Interface of the ERC20 standard as defined in the EIP. Does not include\nthe optional functions; to access them see {ERC20Detailed}.",
                "fullyImplemented": false,
                "id": 16262,
                "linearizedBaseContracts": [
                    16262
                ],
                "name": "IERC20",
                "nodeType": "ContractDefinition",
                "nodes": [
                    {
                        "body": null,
                        "documentation": "@dev Returns the amount of tokens in existence.",
                        "id": 16200,
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "totalSupply",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 16196,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "290:2:61"
                        },
                        "returnParameters": {
                            "id": 16199,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16198,
                                    "name": "",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16200,
                                    "src": "316:7:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 16197,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "316:7:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "315:9:61"
                        },
                        "scope": 16262,
                        "src": "270:55:61",
                        "stateMutability": "view",
                        "superFunction": null,
                        "visibility": "external"
                    },
                    {
                        "body": null,
                        "documentation": "@dev Returns the amount of tokens owned by `account`.",
                        "id": 16207,
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "balanceOf",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 16203,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16202,
                                    "name": "account",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16207,
                                    "src": "427:15:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16201,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "427:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "426:17:61"
                        },
                        "returnParameters": {
                            "id": 16206,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16205,
                                    "name": "",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16207,
                                    "src": "467:7:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 16204,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "467:7:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "466:9:61"
                        },
                        "scope": 16262,
                        "src": "408:68:61",
                        "stateMutability": "view",
                        "superFunction": null,
                        "visibility": "external"
                    },
                    {
                        "body": null,
                        "documentation": "@dev Moves `amount` tokens from the caller's account to `recipient`.\n     * Returns a boolean value indicating whether the operation succeeded.\n     * Emits a {Transfer} event.",
                        "id": 16216,
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "transfer",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 16212,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16209,
                                    "name": "recipient",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16216,
                                    "src": "714:17:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16208,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "714:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16211,
                                    "name": "amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16216,
                                    "src": "733:14:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 16210,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "733:7:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "713:35:61"
                        },
                        "returnParameters": {
                            "id": 16215,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16214,
                                    "name": "",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16216,
                                    "src": "767:4:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bool",
                                        "typeString": "bool"
                                    },
                                    "typeName": {
                                        "id": 16213,
                                        "name": "bool",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "767:4:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "766:6:61"
                        },
                        "scope": 16262,
                        "src": "696:77:61",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "external"
                    },
                    {
                        "body": null,
                        "documentation": "@dev Returns the remaining number of tokens that `spender` will be\nallowed to spend on behalf of `owner` through {transferFrom}. This is\nzero by default.\n     * This value changes when {approve} or {transferFrom} are called.",
                        "id": 16225,
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "allowance",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 16221,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16218,
                                    "name": "owner",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16225,
                                    "src": "1067:13:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16217,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1067:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16220,
                                    "name": "spender",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16225,
                                    "src": "1082:15:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16219,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1082:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1066:32:61"
                        },
                        "returnParameters": {
                            "id": 16224,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16223,
                                    "name": "",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16225,
                                    "src": "1122:7:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 16222,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1122:7:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1121:9:61"
                        },
                        "scope": 16262,
                        "src": "1048:83:61",
                        "stateMutability": "view",
                        "superFunction": null,
                        "visibility": "external"
                    },
                    {
                        "body": null,
                        "documentation": "@dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n     * Returns a boolean value indicating whether the operation succeeded.\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\nthat someone may use both the old and the new allowance by unfortunate\ntransaction ordering. One possible solution to mitigate this race\ncondition is to first reduce the spender's allowance to 0 and set the\ndesired value afterwards:\nhttps://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n     * Emits an {Approval} event.",
                        "id": 16234,
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "approve",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 16230,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16227,
                                    "name": "spender",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16234,
                                    "src": "1801:15:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16226,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1801:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16229,
                                    "name": "amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16234,
                                    "src": "1818:14:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 16228,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1818:7:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1800:33:61"
                        },
                        "returnParameters": {
                            "id": 16233,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16232,
                                    "name": "",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16234,
                                    "src": "1852:4:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bool",
                                        "typeString": "bool"
                                    },
                                    "typeName": {
                                        "id": 16231,
                                        "name": "bool",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1852:4:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1851:6:61"
                        },
                        "scope": 16262,
                        "src": "1784:74:61",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "external"
                    },
                    {
                        "body": null,
                        "documentation": "@dev Moves `amount` tokens from `sender` to `recipient` using the\nallowance mechanism. `amount` is then deducted from the caller's\nallowance.\n     * Returns a boolean value indicating whether the operation succeeded.\n     * Emits a {Transfer} event.",
                        "id": 16245,
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "transferFrom",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 16241,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16236,
                                    "name": "sender",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16245,
                                    "src": "2187:14:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16235,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2187:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16238,
                                    "name": "recipient",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16245,
                                    "src": "2203:17:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16237,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2203:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16240,
                                    "name": "amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16245,
                                    "src": "2222:14:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 16239,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2222:7:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "2186:51:61"
                        },
                        "returnParameters": {
                            "id": 16244,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16243,
                                    "name": "",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16245,
                                    "src": "2256:4:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bool",
                                        "typeString": "bool"
                                    },
                                    "typeName": {
                                        "id": 16242,
                                        "name": "bool",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2256:4:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "2255:6:61"
                        },
                        "scope": 16262,
                        "src": "2165:97:61",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "external"
                    },
                    {
                        "anonymous": false,
                        "documentation": "@dev Emitted when `value` tokens are moved from one account (`from`) to\nanother (`to`).\n     * Note that `value` may be zero.",
                        "id": 16253,
                        "name": "Transfer",
                        "nodeType": "EventDefinition",
                        "parameters": {
                            "id": 16252,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16247,
                                    "indexed": true,
                                    "name": "from",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16253,
                                    "src": "2446:20:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16246,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2446:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16249,
                                    "indexed": true,
                                    "name": "to",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16253,
                                    "src": "2468:18:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16248,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2468:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16251,
                                    "indexed": false,
                                    "name": "value",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16253,
                                    "src": "2488:13:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 16250,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2488:7:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "2445:57:61"
                        },
                        "src": "2431:72:61"
                    },
                    {
                        "anonymous": false,
                        "documentation": "@dev Emitted when the allowance of a `spender` for an `owner` is set by\na call to {approve}. `value` is the new allowance.",
                        "id": 16261,
                        "name": "Approval",
                        "nodeType": "EventDefinition",
                        "parameters": {
                            "id": 16260,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 16255,
                                    "indexed": true,
                                    "name": "owner",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16261,
                                    "src": "2677:21:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16254,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2677:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16257,
                                    "indexed": true,
                                    "name": "spender",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16261,
                                    "src": "2700:23:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 16256,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2700:7:61",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 16259,
                                    "indexed": false,
                                    "name": "value",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 16261,
                                    "src": "2725:13:61",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 16258,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "2725:7:61",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "2676:63:61"
                        },
                        "src": "2662:78:61"
                    }
                ],
                "scope": 16263,
                "src": "176:2566:61"
            }
        ],
        "src": "0:2743:61"
    },
    "legacyAST": {
        "attributes": {
            "absolutePath": "@openzeppelin/contracts/token/ERC20/IERC20.sol",
            "exportedSymbols": {
                "IERC20": [
                    16262
                ]
            }
        },
        "children": [
            {
                "attributes": {
                    "literals": [
                        "solidity",
                        "^",
                        "0.5",
                        ".0"
                    ]
                },
                "id": 16195,
                "name": "PragmaDirective",
                "src": "0:23:61"
            },
            {
                "attributes": {
                    "baseContracts": [
                        null
                    ],
                    "contractDependencies": [
                        null
                    ],
                    "contractKind": "interface",
                    "documentation": "@dev Interface of the ERC20 standard as defined in the EIP. Does not include\nthe optional functions; to access them see {ERC20Detailed}.",
                    "fullyImplemented": false,
                    "linearizedBaseContracts": [
                        16262
                    ],
                    "name": "IERC20",
                    "scope": 16263
                },
                "children": [
                    {
                        "attributes": {
                            "body": null,
                            "documentation": "@dev Returns the amount of tokens in existence.",
                            "implemented": false,
                            "isConstructor": false,
                            "kind": "function",
                            "modifiers": [
                                null
                            ],
                            "name": "totalSupply",
                            "scope": 16262,
                            "stateMutability": "view",
                            "superFunction": null,
                            "visibility": "external"
                        },
                        "children": [
                            {
                                "attributes": {
                                    "parameters": [
                                        null
                                    ]
                                },
                                "children": [],
                                "id": 16196,
                                "name": "ParameterList",
                                "src": "290:2:61"
                            },
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "",
                                            "scope": 16200,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "uint256",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "uint256",
                                                    "type": "uint256"
                                                },
                                                "id": 16197,
                                                "name": "ElementaryTypeName",
                                                "src": "316:7:61"
                                            }
                                        ],
                                        "id": 16198,
                                        "name": "VariableDeclaration",
                                        "src": "316:7:61"
                                    }
                                ],
                                "id": 16199,
                                "name": "ParameterList",
                                "src": "315:9:61"
                            }
                        ],
                        "id": 16200,
                        "name": "FunctionDefinition",
                        "src": "270:55:61"
                    },
                    {
                        "attributes": {
                            "body": null,
                            "documentation": "@dev Returns the amount of tokens owned by `account`.",
                            "implemented": false,
                            "isConstructor": false,
                            "kind": "function",
                            "modifiers": [
                                null
                            ],
                            "name": "balanceOf",
                            "scope": 16262,
                            "stateMutability": "view",
                            "superFunction": null,
                            "visibility": "external"
                        },
                        "children": [
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "account",
                                            "scope": 16207,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16201,
                                                "name": "ElementaryTypeName",
                                                "src": "427:7:61"
                                            }
                                        ],
                                        "id": 16202,
                                        "name": "VariableDeclaration",
                                        "src": "427:15:61"
                                    }
                                ],
                                "id": 16203,
                                "name": "ParameterList",
                                "src": "426:17:61"
                            },
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "",
                                            "scope": 16207,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "uint256",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "uint256",
                                                    "type": "uint256"
                                                },
                                                "id": 16204,
                                                "name": "ElementaryTypeName",
                                                "src": "467:7:61"
                                            }
                                        ],
                                        "id": 16205,
                                        "name": "VariableDeclaration",
                                        "src": "467:7:61"
                                    }
                                ],
                                "id": 16206,
                                "name": "ParameterList",
                                "src": "466:9:61"
                            }
                        ],
                        "id": 16207,
                        "name": "FunctionDefinition",
                        "src": "408:68:61"
                    },
                    {
                        "attributes": {
                            "body": null,
                            "documentation": "@dev Moves `amount` tokens from the caller's account to `recipient`.\n     * Returns a boolean value indicating whether the operation succeeded.\n     * Emits a {Transfer} event.",
                            "implemented": false,
                            "isConstructor": false,
                            "kind": "function",
                            "modifiers": [
                                null
                            ],
                            "name": "transfer",
                            "scope": 16262,
                            "stateMutability": "nonpayable",
                            "superFunction": null,
                            "visibility": "external"
                        },
                        "children": [
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "recipient",
                                            "scope": 16216,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16208,
                                                "name": "ElementaryTypeName",
                                                "src": "714:7:61"
                                            }
                                        ],
                                        "id": 16209,
                                        "name": "VariableDeclaration",
                                        "src": "714:17:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "amount",
                                            "scope": 16216,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "uint256",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "uint256",
                                                    "type": "uint256"
                                                },
                                                "id": 16210,
                                                "name": "ElementaryTypeName",
                                                "src": "733:7:61"
                                            }
                                        ],
                                        "id": 16211,
                                        "name": "VariableDeclaration",
                                        "src": "733:14:61"
                                    }
                                ],
                                "id": 16212,
                                "name": "ParameterList",
                                "src": "713:35:61"
                            },
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "",
                                            "scope": 16216,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "bool",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "bool",
                                                    "type": "bool"
                                                },
                                                "id": 16213,
                                                "name": "ElementaryTypeName",
                                                "src": "767:4:61"
                                            }
                                        ],
                                        "id": 16214,
                                        "name": "VariableDeclaration",
                                        "src": "767:4:61"
                                    }
                                ],
                                "id": 16215,
                                "name": "ParameterList",
                                "src": "766:6:61"
                            }
                        ],
                        "id": 16216,
                        "name": "FunctionDefinition",
                        "src": "696:77:61"
                    },
                    {
                        "attributes": {
                            "body": null,
                            "documentation": "@dev Returns the remaining number of tokens that `spender` will be\nallowed to spend on behalf of `owner` through {transferFrom}. This is\nzero by default.\n     * This value changes when {approve} or {transferFrom} are called.",
                            "implemented": false,
                            "isConstructor": false,
                            "kind": "function",
                            "modifiers": [
                                null
                            ],
                            "name": "allowance",
                            "scope": 16262,
                            "stateMutability": "view",
                            "superFunction": null,
                            "visibility": "external"
                        },
                        "children": [
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "owner",
                                            "scope": 16225,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16217,
                                                "name": "ElementaryTypeName",
                                                "src": "1067:7:61"
                                            }
                                        ],
                                        "id": 16218,
                                        "name": "VariableDeclaration",
                                        "src": "1067:13:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "spender",
                                            "scope": 16225,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16219,
                                                "name": "ElementaryTypeName",
                                                "src": "1082:7:61"
                                            }
                                        ],
                                        "id": 16220,
                                        "name": "VariableDeclaration",
                                        "src": "1082:15:61"
                                    }
                                ],
                                "id": 16221,
                                "name": "ParameterList",
                                "src": "1066:32:61"
                            },
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "",
                                            "scope": 16225,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "uint256",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "uint256",
                                                    "type": "uint256"
                                                },
                                                "id": 16222,
                                                "name": "ElementaryTypeName",
                                                "src": "1122:7:61"
                                            }
                                        ],
                                        "id": 16223,
                                        "name": "VariableDeclaration",
                                        "src": "1122:7:61"
                                    }
                                ],
                                "id": 16224,
                                "name": "ParameterList",
                                "src": "1121:9:61"
                            }
                        ],
                        "id": 16225,
                        "name": "FunctionDefinition",
                        "src": "1048:83:61"
                    },
                    {
                        "attributes": {
                            "body": null,
                            "documentation": "@dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n     * Returns a boolean value indicating whether the operation succeeded.\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\nthat someone may use both the old and the new allowance by unfortunate\ntransaction ordering. One possible solution to mitigate this race\ncondition is to first reduce the spender's allowance to 0 and set the\ndesired value afterwards:\nhttps://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n     * Emits an {Approval} event.",
                            "implemented": false,
                            "isConstructor": false,
                            "kind": "function",
                            "modifiers": [
                                null
                            ],
                            "name": "approve",
                            "scope": 16262,
                            "stateMutability": "nonpayable",
                            "superFunction": null,
                            "visibility": "external"
                        },
                        "children": [
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "spender",
                                            "scope": 16234,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16226,
                                                "name": "ElementaryTypeName",
                                                "src": "1801:7:61"
                                            }
                                        ],
                                        "id": 16227,
                                        "name": "VariableDeclaration",
                                        "src": "1801:15:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "amount",
                                            "scope": 16234,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "uint256",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "uint256",
                                                    "type": "uint256"
                                                },
                                                "id": 16228,
                                                "name": "ElementaryTypeName",
                                                "src": "1818:7:61"
                                            }
                                        ],
                                        "id": 16229,
                                        "name": "VariableDeclaration",
                                        "src": "1818:14:61"
                                    }
                                ],
                                "id": 16230,
                                "name": "ParameterList",
                                "src": "1800:33:61"
                            },
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "",
                                            "scope": 16234,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "bool",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "bool",
                                                    "type": "bool"
                                                },
                                                "id": 16231,
                                                "name": "ElementaryTypeName",
                                                "src": "1852:4:61"
                                            }
                                        ],
                                        "id": 16232,
                                        "name": "VariableDeclaration",
                                        "src": "1852:4:61"
                                    }
                                ],
                                "id": 16233,
                                "name": "ParameterList",
                                "src": "1851:6:61"
                            }
                        ],
                        "id": 16234,
                        "name": "FunctionDefinition",
                        "src": "1784:74:61"
                    },
                    {
                        "attributes": {
                            "body": null,
                            "documentation": "@dev Moves `amount` tokens from `sender` to `recipient` using the\nallowance mechanism. `amount` is then deducted from the caller's\nallowance.\n     * Returns a boolean value indicating whether the operation succeeded.\n     * Emits a {Transfer} event.",
                            "implemented": false,
                            "isConstructor": false,
                            "kind": "function",
                            "modifiers": [
                                null
                            ],
                            "name": "transferFrom",
                            "scope": 16262,
                            "stateMutability": "nonpayable",
                            "superFunction": null,
                            "visibility": "external"
                        },
                        "children": [
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "sender",
                                            "scope": 16245,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16235,
                                                "name": "ElementaryTypeName",
                                                "src": "2187:7:61"
                                            }
                                        ],
                                        "id": 16236,
                                        "name": "VariableDeclaration",
                                        "src": "2187:14:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "recipient",
                                            "scope": 16245,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16237,
                                                "name": "ElementaryTypeName",
                                                "src": "2203:7:61"
                                            }
                                        ],
                                        "id": 16238,
                                        "name": "VariableDeclaration",
                                        "src": "2203:17:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "amount",
                                            "scope": 16245,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "uint256",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "uint256",
                                                    "type": "uint256"
                                                },
                                                "id": 16239,
                                                "name": "ElementaryTypeName",
                                                "src": "2222:7:61"
                                            }
                                        ],
                                        "id": 16240,
                                        "name": "VariableDeclaration",
                                        "src": "2222:14:61"
                                    }
                                ],
                                "id": 16241,
                                "name": "ParameterList",
                                "src": "2186:51:61"
                            },
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "name": "",
                                            "scope": 16245,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "bool",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "bool",
                                                    "type": "bool"
                                                },
                                                "id": 16242,
                                                "name": "ElementaryTypeName",
                                                "src": "2256:4:61"
                                            }
                                        ],
                                        "id": 16243,
                                        "name": "VariableDeclaration",
                                        "src": "2256:4:61"
                                    }
                                ],
                                "id": 16244,
                                "name": "ParameterList",
                                "src": "2255:6:61"
                            }
                        ],
                        "id": 16245,
                        "name": "FunctionDefinition",
                        "src": "2165:97:61"
                    },
                    {
                        "attributes": {
                            "anonymous": false,
                            "documentation": "@dev Emitted when `value` tokens are moved from one account (`from`) to\nanother (`to`).\n     * Note that `value` may be zero.",
                            "name": "Transfer"
                        },
                        "children": [
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "indexed": true,
                                            "name": "from",
                                            "scope": 16253,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16246,
                                                "name": "ElementaryTypeName",
                                                "src": "2446:7:61"
                                            }
                                        ],
                                        "id": 16247,
                                        "name": "VariableDeclaration",
                                        "src": "2446:20:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "indexed": true,
                                            "name": "to",
                                            "scope": 16253,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16248,
                                                "name": "ElementaryTypeName",
                                                "src": "2468:7:61"
                                            }
                                        ],
                                        "id": 16249,
                                        "name": "VariableDeclaration",
                                        "src": "2468:18:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "indexed": false,
                                            "name": "value",
                                            "scope": 16253,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "uint256",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "uint256",
                                                    "type": "uint256"
                                                },
                                                "id": 16250,
                                                "name": "ElementaryTypeName",
                                                "src": "2488:7:61"
                                            }
                                        ],
                                        "id": 16251,
                                        "name": "VariableDeclaration",
                                        "src": "2488:13:61"
                                    }
                                ],
                                "id": 16252,
                                "name": "ParameterList",
                                "src": "2445:57:61"
                            }
                        ],
                        "id": 16253,
                        "name": "EventDefinition",
                        "src": "2431:72:61"
                    },
                    {
                        "attributes": {
                            "anonymous": false,
                            "documentation": "@dev Emitted when the allowance of a `spender` for an `owner` is set by\na call to {approve}. `value` is the new allowance.",
                            "name": "Approval"
                        },
                        "children": [
                            {
                                "children": [
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "indexed": true,
                                            "name": "owner",
                                            "scope": 16261,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16254,
                                                "name": "ElementaryTypeName",
                                                "src": "2677:7:61"
                                            }
                                        ],
                                        "id": 16255,
                                        "name": "VariableDeclaration",
                                        "src": "2677:21:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "indexed": true,
                                            "name": "spender",
                                            "scope": 16261,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "address",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "address",
                                                    "stateMutability": "nonpayable",
                                                    "type": "address"
                                                },
                                                "id": 16256,
                                                "name": "ElementaryTypeName",
                                                "src": "2700:7:61"
                                            }
                                        ],
                                        "id": 16257,
                                        "name": "VariableDeclaration",
                                        "src": "2700:23:61"
                                    },
                                    {
                                        "attributes": {
                                            "constant": false,
                                            "indexed": false,
                                            "name": "value",
                                            "scope": 16261,
                                            "stateVariable": false,
                                            "storageLocation": "default",
                                            "type": "uint256",
                                            "value": null,
                                            "visibility": "internal"
                                        },
                                        "children": [
                                            {
                                                "attributes": {
                                                    "name": "uint256",
                                                    "type": "uint256"
                                                },
                                                "id": 16258,
                                                "name": "ElementaryTypeName",
                                                "src": "2725:7:61"
                                            }
                                        ],
                                        "id": 16259,
                                        "name": "VariableDeclaration",
                                        "src": "2725:13:61"
                                    }
                                ],
                                "id": 16260,
                                "name": "ParameterList",
                                "src": "2676:63:61"
                            }
                        ],
                        "id": 16261,
                        "name": "EventDefinition",
                        "src": "2662:78:61"
                    }
                ],
                "id": 16262,
                "name": "ContractDefinition",
                "src": "176:2566:61"
            }
        ],
        "id": 16263,
        "name": "SourceUnit",
        "src": "0:2743:61"
    },
    "compiler": {
        "name": "solc",
        "version": "0.5.17+commit.d19bba13.Emscripten.clang"
    },
    "networks": {},
    "schemaVersion": "3.4.1",
    "updatedAt": "2021-06-22T06:12:02.924Z",
    "devdoc": {
        "details": "Interface of the ERC20 standard as defined in the EIP. Does not include the optional functions; to access them see {ERC20Detailed}.",
        "methods": {
            "allowance(address,address)": {
                "details": "Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default.     * This value changes when {approve} or {transferFrom} are called."
            },
            "approve(address,uint256)": {
                "details": "Sets `amount` as the allowance of `spender` over the caller's tokens.     * Returns a boolean value indicating whether the operation succeeded.     * IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729     * Emits an {Approval} event."
            },
            "balanceOf(address)": {
                "details": "Returns the amount of tokens owned by `account`."
            },
            "totalSupply()": {
                "details": "Returns the amount of tokens in existence."
            },
            "transfer(address,uint256)": {
                "details": "Moves `amount` tokens from the caller's account to `recipient`.     * Returns a boolean value indicating whether the operation succeeded.     * Emits a {Transfer} event."
            },
            "transferFrom(address,address,uint256)": {
                "details": "Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance.     * Returns a boolean value indicating whether the operation succeeded.     * Emits a {Transfer} event."
            }
        }
    },
    "userdoc": {
        "methods": {}
    }
}.abi

//transferring usdt and usdc
//const list = [{ unlockedAddress: "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503", tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },{ unlockedAddress: "0x5754284f345afc66a98fbb0a0afe71e0f007b949", tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7" }]


const list = [
 { unlockedAddress: "0x5754284f345afc66a98fbb0a0afe71e0f007b949", tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",name:"usdt"},//usdt
 { unlockedAddress: "0x28c6c06298d514db089934071355e5743bf21d60", tokenAddress: "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B",name:"cvx"},//cvx
// { unlockedAddress: "0x577ebc5de943e35cdf9ecb5bbe1f7d7cb6c7c647", tokenAddress: "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7",name:"cvxcrv"},//cvxcrv
//  { unlockedAddress: "0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe", tokenAddress: "0x853d955aCEf822Db058eb8505911ED77F175b99e",name:"frax"},//frax
//  { unlockedAddress: "0x52ce284c712517e938987a9bdf7861ecd4cda571", tokenAddress: "0x4f3E8F405CF5aFC05D68142F3783bDfE13811522",name:"crvusdn"},//crvusdn
  { unlockedAddress: "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503", tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",name:"usdc"},//usdc
  { unlockedAddress: "0x1347f81b2451b6fdd8ea4b2f4e521e611a2eed05", tokenAddress: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",name:"3crv"},//3crv

  { unlockedAddress: "0x019e0f58a7df4bcabaab8c13bffd7d684473ae11", tokenAddress: "0x674C6Ad92Fd080e4004b2312b45f796a192D27a0",name:"usdn"}//usdn

]
//   ganache-cli --fork https://mainnet.infura.io/v3/6b7e574215f04cd3b9ec93f791a8b6c6 -u 0x5754284f345afc66a98fbb0a0afe71e0f007b949 -u 0x28c6c06298d514db089934071355e5743bf21d60 -u 0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe -u 0x52ce284c712517e938987a9bdf7861ecd4cda571 -u 0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503  -u 0x1347f81b2451b6fdd8ea4b2f4e521e611a2eed05  -u 0x019e0f58a7df4bcabaab8c13bffd7d684473ae11  -m "upset engage shrug pudding spare draft toddler extend ghost clever moon aspect"





//transfeering 3crv
//const list=[{unlockedAddress:"0x7421c1ed16b400e4868ce696452c3c985f8cd04d", tokenAddress:"0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490"}]



// await web3.eth.sendTransaction({
//     from: "0xf351D476Ac5C6fE7379366d00252EDf63679F435",
//     to: "0x4a2631d090e8b40bbde245e687bf09e5e534a239",
//     value: web3.utils.toWei('5', 'ether'),
//   });

const transferTokens = async (tokenList) => {
    Promise.all(tokenList.map(async token => {
        console.log("base1")

        //  await web3.eth.sendTransaction({
        //     to: "0x4a2631d090e8b40bbde245e687bf09e5e534a239",
        //     from: "0xf351D476Ac5C6fE7379366d00252EDf63679F435",
        //     value:(1*(10**18)).toString()
        // })
       
        const tokenContract = new web3.eth.Contract(ERC20, token.tokenAddress);
        // console.log(tokenContract);
        let unlockedBalance = new BN('1000');
        let decimals = await tokenContract.methods.decimals().call()
        let amountToBeTransferred = unlockedBalance.mul((new BN('10')).pow(new BN(decimals)))
        console.log(amountToBeTransferred.toString());
         console.log("Transfering ", amountToBeTransferred.toString(), " of token ", token.tokenAddress, "from holder ", token.unlockedAddress)
       
        // await web3.eth.sendTransaction({
        //     from: recipientAddress,
        //     to: token.unlockedAddress,
        //     data: "",
        //     value: "10000000"
        // })
        // console.log("balance ", await tokenContract.methods.balanceOf(recipientAddress).call());
        // console.log(await tokenContract.methods.transfer(recipientAddress, amountToBeTransferred.toString()).send({ from: token.unlockedAddress, gas: "4000000" }));
          await tokenContract.methods.transfer(recipientAddress, amountToBeTransferred.toString()).send({ from: token.unlockedAddress, gas: "4000000" });
        console.log("balance of",token.name, await tokenContract.methods.balanceOf(recipientAddress).call());

    }))
}

 transferTokens(list)
console.log("transfer finished");

