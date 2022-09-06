exports.newDesktopRoot = function newDesktopRoot() {\r\n    /*\r\n    This module represents the execution root of the Desktop App.\r\n    We use this module that is outside the Desktop folder to \r\n    load all node dependencies and get them ready to the actual App.\r\n    */\r\n    let thisObject = {\r\n        run: run\r\n    }\r\n\r\n    return thisObject\r\n\r\n    async function run(debugSettings) {\r\n        /* \r\n        The DK object is accessible everywhere at the Superalgos Desktop App.\r\n        It provides access to all modules built for this App.\r\n        */\r\n        global.DK = {}\r\n        /* \r\n        The SA object is accessible everywhere at the Superalgos Desktop App.\r\n        It provides access to all modules built for Superalgos in general.\r\n        */\r\n        global.SA = {}\r\n        /* Load Environment Variables */\r\n        let ENVIRONMENT = require(\u0027./Environment.js\u0027);\r\n        let ENVIRONMENT_MODULE = ENVIRONMENT.newEnvironment()\r\n        global.env = ENVIRONMENT_MODULE\r\n\r\n        if (debugSettings !== undefined \u0026\u0026 debugSettings.DESKTOP_APP_SIGNING_ACCOUNT !== undefined) {\r\n            global.env.DESKTOP_APP_SIGNING_ACCOUNT = debugSettings.DESKTOP_APP_SIGNING_ACCOUNT\r\n        }\r\n        /*\r\n        First thing is to load the project schema file.\r\n        */\r\n        global.PROJECTS_SCHEMA = require(global.env.PATH_TO_PROJECT_SCHEMA)\r\n        /* \r\n        Setting up the modules that will be available, defined at the Project Schema file. \r\n        */\r\n        let MULTI_PROJECT = require(\u0027./MultiProject.js\u0027)\r\n        let MULTI_PROJECT_MODULE = MULTI_PROJECT.newMultiProject()\r\n        MULTI_PROJECT_MODULE.initialize(DK, \u0027DK\u0027)\r\n        MULTI_PROJECT_MODULE.initialize(SA, \u0027SA\u0027)\r\n        /*\r\n        Setting up external dependencies.\r\n        */\r\n        SA.nodeModules = {\r\n            fs: require(\u0027fs\u0027),\r\n            util: require(\u0027util\u0027),\r\n            path: require(\u0027path\u0027),\r\n            web3: require(\u0027web3\u0027),\r\n            ws: require(\u0027ws\u0027),\r\n            open: require(\u0027open\u0027),\r\n            http: require(\u0027http\u0027),\r\n            octokit: require(\"@octokit/rest\"),\r\n            simpleGit: require(\u0027simple-git\u0027),\r\n            nodeFetch: require(\u0027node-fetch\u0027),\r\n            graphql: require(\"@octokit/graphql\"),\r\n            axios: require(\u0027axios\u0027),\r\n            crypto: require(\u0027crypto\u0027)\r\n        }\r\n        SA.version = require(\u0027./package.json\u0027).version\r\n        /* \r\n        Setting up the App Schema Memory Map. \r\n        */\r\n        let APP_SCHEMAS = require(\u0027./AppSchemas.js\u0027)\r\n        let APP_SCHEMAS_MODULE = APP_SCHEMAS.newAppSchemas()\r\n        await APP_SCHEMAS_MODULE.initialize()\r\n        /*\r\n        Setting up Secrets.\r\n        */\r\n        let SECRETS = require(\u0027./Secrets.js\u0027).newSecrets()\r\n        SECRETS.initialize()\r\n\r\n        run()\r\n\r\n        async function run() {\r\n            DK.app = require(\u0027./Desktop/DesktopApp.js\u0027).newDesktopApp()\r\n            await DK.app.run()\r\n            console.log(\u0027Superalgos Desktop App is Running!\u0027)\r\n        }\r\n    }\r\n}"
{
  // Required: Source code language. Currently supported are "Solidity" and "Yul".
  "language": "Solidity",
  // Required
  "sources":
  {
    // The keys here are the "global" names of the source files,
    // imports can use other files via remappings (see below).
    "myFile.sol":
    {
      // Optional: keccak256 hash of the source file
      // It is used to verify the retrieved content if imported via URLs.
      "keccak256": "0x123...",
      // Required (unless "content" is used, see below): URL(s) to the source file.
      // URL(s) should be imported in this order and the result checked against the
      // keccak256 hash (if available). If the hash doesn't match or none of the
      // URL(s) result in success, an error should be raised.
      // Using the commandline interface only filesystem paths are supported.
      // With the JavaScript interface the URL will be passed to the user-supplied
      // read callback, so any URL supported by the callback can be used.
      "urls":
      [
        "bzzr://56ab...",
        "ipfs://Qma...",
        "/tmp/path/to/file.sol"
        // If files are used, their directories should be added to the command line via
        // `--allow-paths <path>`.
      ]
    },
    "mortal":
    {
      // Optional: keccak256 hash of the source file
      "keccak256": "0x234...",
      // Required (unless "urls" is used): literal contents of the source file
      "content": "contract mortal is owned { function kill() { if (msg.sender == owner) selfdestruct(owner); } }"
    }
  },
  // Optional
  "settings":
  {
    // Optional: Sorted list of remappings
    "remappings": [ ":g/dir" ],
    // Optional: Optimizer settings
    "optimizer": {
      // disabled by default
      "enabled": true,
      // Optimize for how many times you intend to run the code.
      // Lower values will optimize more for initial deployment cost, higher values will optimize more for high-frequency usage.
      "runs": 200,
      // Switch optimizer components on or off in detail.
      // The "enabled" switch above provides two defaults which can be
      // tweaked here. If "details" is given, "enabled" can be omitted.
      "details": {
        // The peephole optimizer is always on if no details are given, use details to switch it off.
        "peephole": true,
        // The unused jumpdest remover is always on if no details are given, use details to switch it off.
        "jumpdestRemover": true,
        // Sometimes re-orders literals in commutative operations.
        "orderLiterals": false,
        // Removes duplicate code blocks
        "deduplicate": false,
        // Common subexpression elimination, this is the most complicated step but
        // can also provide the largest gain.
        "cse": false,
        // Optimize representation of literal numbers and strings in code.
        "constantOptimizer": false,
        // The new Yul optimizer. Mostly operates on the code of ABIEncoderV2.
        // It can only be activated through the details here.
        // This feature is still considered experimental.
        "yul": false,
        // Tuning options for the Yul optimizer.
        "yulDetails": {
          // Improve allocation of stack slots for variables, can free up stack slots early.
          // Activated by default if the Yul optimizer is activated.
          "stackAllocation": true
        }
      }
    },
    "evmVersion": "byzantium", // Version of the EVM to compile for. Affects type checking and code generation. Can be homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople or petersburg
    // Metadata settings (optional)
    "metadata": {
      // Use only literal content and not URLs (false by default)
      "useLiteralContent": true
    },
    // Addresses of the libraries. If not all libraries are given here, it can result in unlinked objects whose output data is different.
    "libraries": {
      // The top level key is the the name of the source file where the library is used.
      // If remappings are used, this source file should match the global path after remappings were applied.
      // If this key is an empty string, that refers to a global level.
      "myFile.sol": {
        "MyLib": "0x123123..."
      }
    }
    // The following can be used to select desired outputs based
    // on file and contract names.
    // If this field is omitted, then the compiler loads and does type checking,
    // but will not generate any outputs apart from errors.
    // The first level key is the file name and the second level key is the contract name.
    // An empty contract name is used for outputs that are not tied to a contract
    // but to the whole source file like the AST.
    // A star as contract name refers to all contracts in the file.
    // Similarly, a star as a file name matches all files.
    // To select all outputs the compiler can possibly generate, use
    // "outputSelection: { "*": { "*": [ "*" ], "": [ "*" ] } }"
    // but note that this might slow down the compilation process needlessly.
    //
    // The available output types are as follows:
    //
    // File level (needs empty string as contract name):
    //   ast - AST of all source files
    //   legacyAST - legacy AST of all source files
    //
    // Contract level (needs the contract name or "*"):
    //   abi - ABI
    //   devdoc - Developer documentation (natspec)
    //   userdoc - User documentation (natspec)
    //   metadata - Metadata
    //   ir - Yul intermediate representation of the code before optimization
    //   irOptimized - Intermediate representation after optimization
    //   evm.assembly - New assembly format
    //   evm.legacyAssembly - Old-style assembly format in JSON
    //   evm.bytecode.object - Bytecode object
    //   evm.bytecode.opcodes - Opcodes list
    //   evm.bytecode.sourceMap - Source mapping (useful for debugging)
    //   evm.bytecode.linkReferences - Link references (if unlinked object)
    //   evm.deployedBytecode* - Deployed bytecode (has the same options as evm.bytecode)
    //   evm.methodIdentifiers - The list of function hashes
    //   evm.gasEstimates - Function gas estimates
    //   ewasm.wast - eWASM S-expressions format (not supported at the moment)
    //   ewasm.wasm - eWASM binary format (not supported at the moment)
    //
    // Note that using a using `evm`, `evm.bytecode`, `ewasm`, etc. will select every
    // target part of that output. Additionally, `*` can be used as a wildcard to request everything.
    //
    "outputSelection": {
      "*": {
        "*": [
          "metadata", "evm.bytecode" // Enable the metadata and bytecode outputs of every single contract.
          , "evm.bytecode.sourceMap" // Enable the source map output of every single contract.
        ],
        "": [
          "ast" // Enable the AST output of every single file.
        ]
      },
      // Enable the abi and opcodes output of MyContract defined in file def.
      "def": {
        "MyContract": [ "abi", "evm.bytecode.opcodes" ]
      }
    }
  }
}
Output Description
{
  // Optional: not present if no errors/warnings were encountered
  "errors": [
    {
      // Optional: Location within the source file.
      "sourceLocation": {
        "file": "sourceFile.sol",
        "start": 0,
        "end": 100
      ],
      // Mandatory: Error type, such as "TypeError", "InternalCompilerError", "Exception", etc.
      // See below for complete list of types.
      "type": "TypeError",
      // Mandatory: Component where the error originated, such as "general", "ewasm", etc.
      "component": "general",
      // Mandatory ("error" or "warning")
      "severity": "error",
      // Mandatory
      "message": "Invalid keyword"
      // Optional: the message formatted with source location
      "formattedMessage": "sourceFile.sol:100: Invalid keyword"
    }
  ],
  // This contains the file-level outputs. In can be limited/filtered by the outputSelection settings.
  "sources": {
    "sourceFile.sol": {
      // Identifier of the source (used in source maps)
      "id": 1,
      // The AST object
      "ast": {},
      // The legacy AST object
      "legacyAST": {}
    }
  },
  // This contains the contract-level outputs. It can be limited/filtered by the outputSelection settings.
  "contracts": {
    "sourceFile.sol": {
      // If the language used has no contract names, this field should equal to an empty string.
      "ContractName": {
        // The Ethereum Contract ABI. If empty, it is represented as an empty array.
        // See https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
        "abi": [],
        // See the Metadata Output documentation (serialised JSON string)
        "metadata": "{...}",
        // User documentation (natspec)
        "userdoc": {},
        // Developer documentation (natspec)
        "devdoc": {},
        // Intermediate representation (string)
        "ir": "",
        // EVM-related outputs
        "evm": {
          // Assembly (string)
          "assembly": "",
          // Old-style assembly (object)
          "legacyAssembly": {},
          // Bytecode and related details.
          "bytecode": {
            // The bytecode as a hex string.
            "object": "00fe",
            // Opcodes list (string)
            "opcodes": "",
            // The source mapping as a string. See the source mapping definition.
            "sourceMap": "",
            // If given, this is an unlinked object.
            "linkReferences": {
              "libraryFile.sol": {
                // Byte offsets into the bytecode. Linking replaces the 20 bytes located there.
                "Library1": [
                  { "start": 0, "length": 20 },
                  { "start": 200, "length": 20 }
                ]
              }
            }
          },
          // The same layout as above.
          "deployedBytecode": { },
          // The list of function hashes
          "methodIdentifiers": {
            "delegate(address)": "5c19a95c"
          },
          // Function gas estimates
          "gasEstimates": {
            "creation": {
              "codeDepositCost": "420000",
              "executionCost": "infinite",
              "totalCost": "infinite"
            },
            "external": {
              "delegate(address)": "25000"
            },
            "internal": {
              "heavyLifting()": "infinite"
            }
          }
        },
        // eWASM related outputs
        "ewasm": {
          // S-expressions format
          "wast": "",
          // Binary format (hex string)
          "wasm": ""
        }
      }
    }
  }
}{
  // Required: Source code language. Currently supported are "Solidity" and "Yul".
  "language": "Solidity",
  // Required
  "sources":
  {
    // The keys here are the "global" names of the source files,
    // imports can use other files via remappings (see below).
    "myFile.sol":
    {
      // Optional: keccak256 hash of the source file
      // It is used to verify the retrieved content if imported via URLs.
      "keccak256": "0x123...",
      // Required (unless "content" is used, see below): URL(s) to the source file.
      // URL(s) should be imported in this order and the result checked against the
      // keccak256 hash (if available). If the hash doesn't match or none of the
      // URL(s) result in success, an error should be raised.
      // Using the commandline interface only filesystem paths are supported.
      // With the JavaScript interface the URL will be passed to the user-supplied
      // read callback, so any URL supported by the callback can be used.
      "urls":
      [
        "bzzr://56ab...",
        "ipfs://Qma...",
        "/tmp/path/to/file.sol"
        // If files are used, their directories should be added to the command line via
        // `--allow-paths <path>`.
      ]
    },
    "mortal":
    {
      // Optional: keccak256 hash of the source file
      "keccak256": "0x234...",
      // Required (unless "urls" is used): literal contents of the source file
      "content": "contract mortal is owned { function kill() { if (msg.sender == owner) selfdestruct(owner); } }"
    }
  },
  // Optional
  "settings":
  {
    // Optional: Sorted list of remappings
    "remappings": [ ":g/dir" ],
    // Optional: Optimizer settings
    "optimizer": {
      // disabled by default
      "enabled": true,
      // Optimize for how many times you intend to run the code.
      // Lower values will optimize more for initial deployment cost, higher values will optimize more for high-frequency usage.
      "runs": 200,
      // Switch optimizer components on or off in detail.
      // The "enabled" switch above provides two defaults which can be
      // tweaked here. If "details" is given, "enabled" can be omitted.
      "details": {
        // The peephole optimizer is always on if no details are given, use details to switch it off.
        "peephole": true,
        // The unused jumpdest remover is always on if no details are given, use details to switch it off.
        "jumpdestRemover": true,
        // Sometimes re-orders literals in commutative operations.
        "orderLiterals": false,
        // Removes duplicate code blocks
        "deduplicate": false,
        // Common subexpression elimination, this is the most complicated step but
        // can also provide the largest gain.
        "cse": false,
        // Optimize representation of literal numbers and strings in code.
        "constantOptimizer": false,
        // The new Yul optimizer. Mostly operates on the code of ABIEncoderV2.
        // It can only be activated through the details here.
        // This feature is still considered experimental.
        "yul": false,
        // Tuning options for the Yul optimizer.
        "yulDetails": {
          // Improve allocation of stack slots for variables, can free up stack slots early.
          // Activated by default if the Yul optimizer is activated.
          "stackAllocation": true
        }
      }
    },
    "evmVersion": "byzantium", // Version of the EVM to compile for. Affects type checking and code generation. Can be homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople or petersburg
    // Metadata settings (optional)
    "metadata": {
      // Use only literal content and not URLs (false by default)
      "useLiteralContent": true
    },
    // Addresses of the libraries. If not all libraries are given here, it can result in unlinked objects whose output data is different.
    "libraries": {
      // The top level key is the the name of the source file where the library is used.
      // If remappings are used, this source file should match the global path after remappings were applied.
      // If this key is an empty string, that refers to a global level.
      "myFile.sol": {
        "MyLib": "0x123123..."
      }
    }
    // The following can be used to select desired outputs based
    // on file and contract names.
    // If this field is omitted, then the compiler loads and does type checking,
    // but will not generate any outputs apart from errors.
    // The first level key is the file name and the second level key is the contract name.
    // An empty contract name is used for outputs that are not tied to a contract
    // but to the whole source file like the AST.
    // A star as contract name refers to all contracts in the file.
    // Similarly, a star as a file name matches all files.
    // To select all outputs the compiler can possibly generate, use
    // "outputSelection: { "*": { "*": [ "*" ], "": [ "*" ] } }"
    // but note that this might slow down the compilation process needlessly.
    //
    // The available output types are as follows:
    //
    // File level (needs empty string as contract name):
    //   ast - AST of all source files
    //   legacyAST - legacy AST of all source files
    //
    // Contract level (needs the contract name or "*"):
    //   abi - ABI
    //   devdoc - Developer documentation (natspec)
    //   userdoc - User documentation (natspec)
    //   metadata - Metadata
    //   ir - Yul intermediate representation of the code before optimization
    //   irOptimized - Intermediate representation after optimization
    //   evm.assembly - New assembly format
    //   evm.legacyAssembly - Old-style assembly format in JSON
    //   evm.bytecode.object - Bytecode object
    //   evm.bytecode.opcodes - Opcodes list
    //   evm.bytecode.sourceMap - Source mapping (useful for debugging)
    //   evm.bytecode.linkReferences - Link references (if unlinked object)
    //   evm.deployedBytecode* - Deployed bytecode (has the same options as evm.bytecode)
    //   evm.methodIdentifiers - The list of function hashes
    //   evm.gasEstimates - Function gas estimates
    //   ewasm.wast - eWASM S-expressions format (not supported at the moment)
    //   ewasm.wasm - eWASM binary format (not supported at the moment)
    //
    // Note that using a using `evm`, `evm.bytecode`, `ewasm`, etc. will select every
    // target part of that output. Additionally, `*` can be used as a wildcard to request everything.
    //
    "outputSelection": {
      "*": {
        "*": [
          "metadata", "evm.bytecode" // Enable the metadata and bytecode outputs of every single contract.
          , "evm.bytecode.sourceMap" // Enable the source map output of every single contract.
        ],
        "": [
          "ast" // Enable the AST output of every single file.
        ]
      },
      // Enable the abi and opcodes output of MyContract defined in file def.
      "def": {
        "MyContract": [ "abi", "evm.bytecode.opcodes" ]
      }
    }
  }
}
Output Description
{
  // Optional: not present if no errors/warnings were encountered
  "errors": [
    {
      // Optional: Location within the source file.
      "sourceLocation": {
        "file": "sourceFile.sol",
        "start": 0,
        "end": 100
      ],
      // Mandatory: Error type, such as "TypeError", "InternalCompilerError", "Exception", etc.
      // See below for complete list of types.
      "type": "TypeError",
      // Mandatory: Component where the error originated, such as "general", "ewasm", etc.
      "component": "general",
      // Mandatory ("error" or "warning")
      "severity": "error",
      // Mandatory
      "message": "Invalid keyword"
      // Optional: the message formatted with source location
      "formattedMessage": "sourceFile.sol:100: Invalid keyword"
    }
  ],
  // This contains the file-level outputs. In can be limited/filtered by the outputSelection settings.
  "sources": {
    "sourceFile.sol": {
      // Identifier of the source (used in source maps)
      "id": 1,
      // The AST object
      "ast": {},
      // The legacy AST object
      "legacyAST": {}
    }
  },
  // This contains the contract-level outputs. It can be limited/filtered by the outputSelection settings.
  "contracts": {
    "sourceFile.sol": {
      // If the language used has no contract names, this field should equal to an empty string.
      "ContractName": {
        // The Ethereum Contract ABI. If empty, it is represented as an empty array.
        // See https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
        "abi": [],
        // See the Metadata Output documentation (serialised JSON string)
        "metadata": "{...}",
        // User documentation (natspec)
        "userdoc": {},
        // Developer documentation (natspec)
        "devdoc": {},
        // Intermediate representation (string)
        "ir": "",
        // EVM-related outputs
        "evm": {
          // Assembly (string)
          "assembly": "",
          // Old-style assembly (object)
          "legacyAssembly": {},
          // Bytecode and related details.
          "bytecode": {
            // The bytecode as a hex string.
            "object": "00fe",
            // Opcodes list (string)
            "opcodes": "",
            // The source mapping as a string. See the source mapping definition.
            "sourceMap": "",
            // If given, this is an unlinked object.
            "linkReferences": {
              "libraryFile.sol": {
                // Byte offsets into the bytecode. Linking replaces the 20 bytes located there.
                "Library1": [
                  { "start": 0, "length": 20 },
                  { "start": 200, "length": 20 }
                ]
              }
            }
          },
          // The same layout as above.
          "deployedBytecode": { },
          // The list of function hashes
          "methodIdentifiers": {
            "delegate(address)": "5c19a95c"
          },
          // Function gas estimates
          "gasEstimates": {
            "creation": {
              "codeDepositCost": "420000",
              "executionCost": "infinite",
              "totalCost": "infinite"
            },
            "external": {
              "delegate(address)": "25000"
            },
            "internal": {
              "heavyLifting()": "infinite"
            }
          }
        },
        // eWASM related outputs
        "ewasm": {
          // S-expressions format
          "wast": "",
          // Binary format (hex string)
          "wasm": ""
        }
      }
    }
  }
}
0x2289b18c                                                            - function signature
 0 - f                                                                - offset of [[1, 2], [3]]
 1 - g                                                                - offset of ["one", "two", "three"]
 2 - 0000000000000000000000000000000000000000000000000000000000000002 - count for [[1, 2], [3]]
 3 - 0000000000000000000000000000000000000000000000000000000000000040 - offset of [1, 2]
 4 - 00000000000000000000000000000000000000000000000000000000000000a0 - offset of [3]
 5 - 0000000000000000000000000000000000000000000000000000000000000002 - count for [1, 2]
 6 - 0000000000000000000000000000000000000000000000000000000000000001 - encoding of 1
 7 - 0000000000000000000000000000000000000000000000000000000000000002 - encoding of 2
 8 - 0000000000000000000000000000000000000000000000000000000000000001 - count for [3]
 9 - 0000000000000000000000000000000000000000000000000000000000000003 - encoding of 3
10 - 0000000000000000000000000000000000000000000000000000000000000003 - count for ["one", "two", "three"]
11 - 0000000000000000000000000000000000000000000000000000000000000060 - offset for "one"
12 - 00000000000000000000000000000000000000000000000000000000000000a0 - offset for "two"
13 - 00000000000000000000000000000000000000000000000000000000000000e0 - offset for "three"
14 - 0000000000000000000000000000000000000000000000000000000000000003 - count for "one"
15 - 6f6e650000000000000000000000000000000000000000000000000000000000 - encoding of "one"
16 - 0000000000000000000000000000000000000000000000000000000000000003 - count for "two"
17 - 74776f0000000000000000000000000000000000000000000000000000000000 - encoding of "two"
18 - 0000000000000000000000000000000000000000000000000000000000000005 - count for "three"
19 - 7468726565000000000000000000000000000000000000000000000000000000 - encoding of "three"
let APP_ROOT = require('./DesktopRoot.js')
let APP_ROOT_MODULE = APP_ROOT.newDesktopRoot()
APP_ROOT_MODULE.run({DESKTOP_APP_SIGNING_ACCOUNT: 'Social-Trading-Desktop-App-1'})
60806040523480156200001157600080fd5b5060405162002f9238038062002f928339818101604052810190620000379190620002aa565b620000576200004b6200009960201b60201c565b620000a160201b60201c565b82600190805190602001906200006f92919062000165565b5081600290805190602001906200008892919062000165565b5080600481905550505050620004ec565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8280546200017390620003e3565b90600052602060002090601f016020900481019282620001975760008555620001e3565b82601f10620001b257805160ff1916838001178555620001e3565b82800160010185558215620001e3579182015b82811115620001e2578251825591602001919060010190620001c5565b5b509050620001f29190620001f6565b5090565b5b8082111562000211576000816000905550600101620001f7565b5090565b60006200022c62000226846200036d565b62000344565b9050828152602081018484840111156200024b576200024a620004b2565b5b62000258848285620003ad565b509392505050565b600082601f830112620002785762000277620004ad565b5b81516200028a84826020860162000215565b91505092915050565b600081519050620002a481620004d2565b92915050565b600080600060608486031215620002c657620002c5620004bc565b5b600084015167ffffffffffffffff811115620002e757620002e6620004b7565b5b620002f58682870162000260565b935050602084015167ffffffffffffffff811115620003195762000318620004b7565b5b620003278682870162000260565b92505060406200033a8682870162000293565b9150509250925092565b60006200035062000363565b90506200035e828262000419565b919050565b6000604051905090565b600067ffffffffffffffff8211156200038b576200038a6200047e565b5b6200039682620004c1565b9050602081019050919050565b6000819050919050565b60005b83811015620003cd578082015181840152602081019050620003b0565b83811115620003dd576000848401525b50505050565b60006002820490506001821680620003fc57607f821691505b602082108114156200041357620004126200044f565b5b50919050565b6200042482620004c1565b810181811067ffffffffffffffff821117156200044657620004456200047e565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b620004dd81620003a3565b8114620004e957600080fd5b50565b612a9680620004fc6000396000f3fe60806040526004361061011f5760003560e01c806370a08231116100a0578063a457c2d711610064578063a457c2d714610392578063a5500c30146103cf578063a9059cbb146103f8578063dd62ed3e14610435578063f2fde38b146104725761011f565b806370a08231146102cc578063715018a6146103095780638da5cb5b1461032057806395d89b411461034b5780639dc29fac146103765761011f565b806323b872dd116100e757806323b872dd146101ef578063313ce5671461022c578063395093511461025757806340c10f1914610294578063512d7cfd146102b05761011f565b806301e336671461012457806306fdde0314610140578063095ea7b31461016b57806318160ddd146101a85780631b9a91a4146101d3575b600080fd5b61013e60048036038101906101399190611c28565b61049b565b005b34801561014c57600080fd5b50610155610694565b604051610162919061207f565b60405180910390f35b34801561017757600080fd5b50610192600480360381019061018d9190611c7b565b610726565b60405161019f9190612064565b60405180910390f35b3480156101b457600080fd5b506101bd610744565b6040516101ca9190612281565b60405180910390f35b6101ed60048036038101906101e89190611ba8565b61074e565b005b3480156101fb57600080fd5b5061021660048036038101906102119190611c28565b610877565b6040516102239190612064565b60405180910390f35b34801561023857600080fd5b5061024161096f565b60405161024e919061229c565b60405180910390f35b34801561026357600080fd5b5061027e60048036038101906102799190611c7b565b610978565b60405161028b9190612064565b60405180910390f35b6102ae60048036038101906102a99190611c7b565b610a24565b005b6102ca60048036038101906102c59190611cbb565b610aae565b005b3480156102d857600080fd5b506102f360048036038101906102ee9190611b7b565b610b51565b6040516103009190612281565b60405180910390f35b34801561031557600080fd5b5061031e610bf6565b005b34801561032c57600080fd5b50610335610c7e565b6040516103429190612020565b60405180910390f35b34801561035757600080fd5b50610360610ca7565b60405161036d919061207f565b60405180910390f35b610390600480360381019061038b9190611c7b565b610d39565b005b34801561039e57600080fd5b506103b960048036038101906103b49190611c7b565b610dc3565b6040516103c69190612064565b60405180910390f35b3480156103db57600080fd5b506103f660048036038101906103f19190611d44565b610eae565b005b34801561040457600080fd5b5061041f600480360381019061041a9190611c7b565b610f34565b60405161042c9190612064565b60405180910390f35b34801561044157600080fd5b5061045c60048036038101906104579190611be8565b610f52565b6040516104699190612281565b60405180910390f35b34801561047e57600080fd5b5061049960048036038101906104949190611b7b565b610fd9565b005b6104a36110d1565b73ffffffffffffffffffffffffffffffffffffffff166104c1610c7e565b73ffffffffffffffffffffffffffffffffffffffff1614610517576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050e906121a1565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016105529190612020565b60206040518083038186803b15801561056a57600080fd5b505afa15801561057e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a29190611d71565b905060008214156105b1578091505b6000821180156105c15750818110155b610600576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f790612161565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85846040518363ffffffff1660e01b815260040161063b92919061203b565b602060405180830381600087803b15801561065557600080fd5b505af1158015610669573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068d9190611d17565b5050505050565b6060600180546106a390612448565b80601f01602080910402602001604051908101604052809291908181526020018280546106cf90612448565b801561071c5780601f106106f15761010080835404028352916020019161071c565b820191906000526020600020905b8154815290600101906020018083116106ff57829003601f168201915b5050505050905090565b600061073a6107336110d1565b84846110d9565b6001905092915050565b6000600354905090565b6107566110d1565b73ffffffffffffffffffffffffffffffffffffffff16610774610c7e565b73ffffffffffffffffffffffffffffffffffffffff16146107ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c1906121a1565b60405180910390fd5b600047905060008214156107dc578091505b6000821180156107ec5750818110155b61082b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082290612141565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050158015610871573d6000803e3d6000fd5b50505050565b60006108848484846112a4565b6000600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006108cf6110d1565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508281101561094f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094690612181565b60405180910390fd5b6109638561095b6110d1565b8584036110d9565b60019150509392505050565b60006012905090565b6000610a1a6109856110d1565b8484600760006109936110d1565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610a159190612324565b6110d9565b6001905092915050565b610a2c6110d1565b73ffffffffffffffffffffffffffffffffffffffff16610a4a610c7e565b73ffffffffffffffffffffffffffffffffffffffff1614610aa0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a97906121a1565b60405180910390fd5b610aaa82826115f6565b5050565b60005b8251811015610b4c57828181518110610acd57610acc612552565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b319190612281565b60405180910390a38080610b44906124ab565b915050610ab1565b505050565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610bae576004549050610bf1565b600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b610bfe6110d1565b73ffffffffffffffffffffffffffffffffffffffff16610c1c610c7e565b73ffffffffffffffffffffffffffffffffffffffff1614610c72576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c69906121a1565b60405180910390fd5b610c7c6000611797565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060028054610cb690612448565b80601f0160208091040260200160405190810160405280929190818152602001828054610ce290612448565b8015610d2f5780601f10610d0457610100808354040283529160200191610d2f565b820191906000526020600020905b815481529060010190602001808311610d1257829003601f168201915b5050505050905090565b610d416110d1565b73ffffffffffffffffffffffffffffffffffffffff16610d5f610c7e565b73ffffffffffffffffffffffffffffffffffffffff1614610db5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dac906121a1565b60405180910390fd5b610dbf828261185b565b5050565b60008060076000610dd26110d1565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610e8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e8690612221565b60405180910390fd5b610ea3610e9a6110d1565b858584036110d9565b600191505092915050565b610eb66110d1565b73ffffffffffffffffffffffffffffffffffffffff16610ed4610c7e565b73ffffffffffffffffffffffffffffffffffffffff1614610f2a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f21906121a1565b60405180910390fd5b8060048190555050565b6000610f48610f416110d1565b84846112a4565b6001905092915050565b6000600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610fe16110d1565b73ffffffffffffffffffffffffffffffffffffffff16610fff610c7e565b73ffffffffffffffffffffffffffffffffffffffff1614611055576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104c906121a1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156110c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110bc906120e1565b60405180910390fd5b6110ce81611797565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611149576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161114090612201565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156111b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111b090612101565b60405180910390fd5b80600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516112979190612281565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611314576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161130b906121e1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611384576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161137b906120a1565b60405180910390fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611410576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161140790612261565b60405180910390fd5b6000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611497576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161148e90612121565b60405180910390fd5b818103600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461152c9190612324565b925050819055506001600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516115e89190612281565b60405180910390a350505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611666576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161165d90612241565b60405180910390fd5b80600360008282546116789190612324565b9250508190555080600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546116ce9190612324565b925050819055506001600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161178b9190612281565b60405180910390a35050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156118cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118c2906121c1565b60405180910390fd5b6000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611952576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611949906120c1565b60405180910390fd5b818103600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600360008282546119aa919061237a565b925050819055506000600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051611a679190612281565b60405180910390a3505050565b6000611a87611a82846122dc565b6122b7565b90508083825260208201905082856020860282011115611aaa57611aa96125b5565b5b60005b85811015611ada5781611ac08882611ae4565b845260208401935060208301925050600181019050611aad565b5050509392505050565b600081359050611af381612a04565b92915050565b600081359050611b0881612a1b565b92915050565b600082601f830112611b2357611b226125b0565b5b8135611b33848260208601611a74565b91505092915050565b600081519050611b4b81612a32565b92915050565b600081359050611b6081612a49565b92915050565b600081519050611b7581612a49565b92915050565b600060208284031215611b9157611b906125bf565b5b6000611b9f84828501611ae4565b91505092915050565b60008060408385031215611bbf57611bbe6125bf565b5b6000611bcd85828601611af9565b9250506020611bde85828601611b51565b9150509250929050565b60008060408385031215611bff57611bfe6125bf565b5b6000611c0d85828601611ae4565b9250506020611c1e85828601611ae4565b9150509250929050565b600080600060608486031215611c4157611c406125bf565b5b6000611c4f86828701611ae4565b9350506020611c6086828701611ae4565b9250506040611c7186828701611b51565b9150509250925092565b60008060408385031215611c9257611c916125bf565b5b6000611ca085828601611ae4565b9250506020611cb185828601611b51565b9150509250929050565b60008060408385031215611cd257611cd16125bf565b5b600083013567ffffffffffffffff811115611cf057611cef6125ba565b5b611cfc85828601611b0e565b9250506020611d0d85828601611b51565b9150509250929050565b600060208284031215611d2d57611d2c6125bf565b5b6000611d3b84828501611b3c565b91505092915050565b600060208284031215611d5a57611d596125bf565b5b6000611d6884828501611b51565b91505092915050565b600060208284031215611d8757611d866125bf565b5b6000611d9584828501611b66565b91505092915050565b611da7816123ae565b82525050565b611db6816123d2565b82525050565b6000611dc782612308565b611dd18185612313565b9350611de1818560208601612415565b611dea816125c4565b840191505092915050565b6000611e02602383612313565b9150611e0d826125d5565b604082019050919050565b6000611e25602283612313565b9150611e3082612624565b604082019050919050565b6000611e48602683612313565b9150611e5382612673565b604082019050919050565b6000611e6b602283612313565b9150611e76826126c2565b604082019050919050565b6000611e8e602683612313565b9150611e9982612711565b604082019050919050565b6000611eb1600a83612313565b9150611ebc82612760565b602082019050919050565b6000611ed4600a83612313565b9150611edf82612789565b602082019050919050565b6000611ef7602883612313565b9150611f02826127b2565b604082019050919050565b6000611f1a602083612313565b9150611f2582612801565b602082019050919050565b6000611f3d602183612313565b9150611f488261282a565b604082019050919050565b6000611f60602583612313565b9150611f6b82612879565b604082019050919050565b6000611f83602483612313565b9150611f8e826128c8565b604082019050919050565b6000611fa6602583612313565b9150611fb182612917565b604082019050919050565b6000611fc9601f83612313565b9150611fd482612966565b602082019050919050565b6000611fec604583612313565b9150611ff78261298f565b606082019050919050565b61200b816123fe565b82525050565b61201a81612408565b82525050565b60006020820190506120356000830184611d9e565b92915050565b60006040820190506120506000830185611d9e565b61205d6020830184612002565b9392505050565b60006020820190506120796000830184611dad565b92915050565b600060208201905081810360008301526120998184611dbc565b905092915050565b600060208201905081810360008301526120ba81611df5565b9050919050565b600060208201905081810360008301526120da81611e18565b9050919050565b600060208201905081810360008301526120fa81611e3b565b9050919050565b6000602082019050818103600083015261211a81611e5e565b9050919050565b6000602082019050818103600083015261213a81611e81565b9050919050565b6000602082019050818103600083015261215a81611ea4565b9050919050565b6000602082019050818103600083015261217a81611ec7565b9050919050565b6000602082019050818103600083015261219a81611eea565b9050919050565b600060208201905081810360008301526121ba81611f0d565b9050919050565b600060208201905081810360008301526121da81611f30565b9050919050565b600060208201905081810360008301526121fa81611f53565b9050919050565b6000602082019050818103600083015261221a81611f76565b9050919050565b6000602082019050818103600083015261223a81611f99565b9050919050565b6000602082019050818103600083015261225a81611fbc565b9050919050565b6000602082019050818103600083015261227a81611fdf565b9050919050565b60006020820190506122966000830184612002565b92915050565b60006020820190506122b16000830184612011565b92915050565b60006122c16122d2565b90506122cd828261247a565b919050565b6000604051905090565b600067ffffffffffffffff8211156122f7576122f6612581565b5b602082029050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600061232f826123fe565b915061233a836123fe565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561236f5761236e6124f4565b5b828201905092915050565b6000612385826123fe565b9150612390836123fe565b9250828210156123a3576123a26124f4565b5b828203905092915050565b60006123b9826123de565b9050919050565b60006123cb826123de565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015612433578082015181840152602081019050612418565b83811115612442576000848401525b50505050565b6000600282049050600182168061246057607f821691505b6020821081141561247457612473612523565b5b50919050565b612483826125c4565b810181811067ffffffffffffffff821117156124a2576124a1612581565b5b80604052505050565b60006124b6826123fe565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156124e9576124e86124f4565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f6e6f2062616c616e636500000000000000000000000000000000000000000000600082015250565b7f62616420616d6f756e7400000000000000000000000000000000000000000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b7f45524332303a20546f6b656e206d75737420626520636c61696d65642062656660008201527f6f7265207472616e73666572206f6e2068747470733a2f2f7873686962706f6c60208201527f792e696f20000000000000000000000000000000000000000000000000000000604082015250565b612a0d816123ae565b8114612a1857600080fd5b50565b612a24816123c0565b8114612a2f57600080fd5b50565b612a3b816123d2565b8114612a4657600080fd5b50565b612a52816123fe565b8114612a5d57600080fd5b5056fea2646970667358221220b4804ce1777a592b1990b10d60b1dd1810cace1f040fb5bb0aaa4c04c8df066a64736f6c63430008070033000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000035094d19d9f139c4000000000000000000000000000000000000000000000000000000000000000000144c554e4120322e3020286c756e6176322e696f2900000000000000000000000000000000000000000000000000000000000000000000000000000000000000144c554e4120322e3020286c756e6176322e696f29000000000000000000000000