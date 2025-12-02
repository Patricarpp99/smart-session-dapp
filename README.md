⸻

📘 Smart Session dApp — Base Mainnet + Reown AppKit

<p align="center">
  <img src="https://img.shields.io/badge/Built%20on-Base-0052FF?logo=base&logoColor=white" />
  <img src="https://img.shields.io/badge/Powered%20by-Reown%20AppKit-2D3EEF?logo=walletconnect&logoColor=white" />
  <img src="https://img.shields.io/badge/Web3-WalletConnect%202.0-3B99FC?logo=walletconnect&logoColor=white" />
  <img src="https://img.shields.io/badge/Smart%20Sessions-Enabled-7A5AF8?logo=ethereum&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-646CFF?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Viem%20Wallet%20Client-000?logo=ethereum&logoColor=white" />
  <img src="https://img.shields.io/badge/Contracts-Hardhat%200.8.24-orange?logo=hardhat&logoColor=white" />
</p>



⸻

✨ Overview

This repository contains a full-stack Smart Session dApp, deployed to Base Mainnet, showcasing an advanced, modern Web3 developer workflow:
	•	🚀 Smart Session execution
	•	🔐 Backend delegated execution
	•	🔌 AppKit (WalletConnect Reown) integration
	•	🔗 Wagmi + Viem contract interaction
	•	⚡ Hardhat deployment + verification
	•	🎨 React + Vite + Tailwind UI

This project demonstrates secure delegated transaction execution and is optimized for:
	•	Talent Protocol Builder Rewards
	•	WalletConnect / Reown builder leaderboard
	•	Base ecosystem developer showcases
	•	Public GitHub portfolio visibility

⸻

🧠 Architecture Diagram

┌────────────────────────────┐
│        React Frontend      │
│  - AppKit WalletKit UI     │
│  - Wagmi + Viem calls      │
│  - Session grant flow       │
└───────────────┬────────────┘
                │
                ▼
┌────────────────────────────┐
│   Smart Session Backend     │
│  - Express API (/execute)   │
│  - wallet_prepareCalls RPC  │
│  - Raw tx signing (Viem)    │
└───────────────┬────────────┘
                │
                ▼
┌────────────────────────────┐
│     Base Mainnet (L2)      │
│  Verified Contract Address  │
│  0x1363...57644             │
└────────────────────────────┘


⸻

🔗 Deployed Contract

SmartSessionTarget.sol

Network: Base Mainnet (Chain ID 8453)
Address: 0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644
Status: ✔ Verified on BaseScan
https://basescan.org/address/0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644#code

⸻

🧱 Smart Contract Source

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SmartSessionTarget {
    uint256 private _number;

    event NumberUpdated(uint256 newValue, address executor);

    function store(uint256 newNumber) external {
        _number = newNumber;
        emit NumberUpdated(newNumber, msg.sender);
    }

    function get() external view returns (uint256) {
        return _number;
    }
}


⸻

📁 Folder Structure

contracts/         # Solidity smart contracts (Hardhat)
scripts/           # Deployment scripts
server/            # Smart Session backend (Node + Viem)
src/               # Frontend (React + Vite + Wagmi + AppKit)
public/screenshots # UI screenshots
.github/           # CI, issue templates, PR templates
.env.example       # Environment template
README.md


⸻

⚙️ Installation & Setup

1️⃣ Install dependencies

npm install

2️⃣ Create .env

Copy the example file:

cp .env.example .env

Fill required fields:

APPLICATION_PRIVATE_KEY=0xYOUR_PRIVATE_KEY
BASESCAN_API_KEY=YOUR_BASESCAN_API_KEY

VITE_REOWN_PROJECT_ID=YOUR_REOWN_PROJECT_ID
VITE_SMART_SESSION_TARGET_ADDRESS=0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644

BACKEND_PORT=8787


⸻

🛰 Backend (Smart Session Executor)

Runs the delegated transaction signing engine.

Start backend:

npm run dev:server

Endpoint:

POST /execute

Accepts:

{
  "userAddress": "0x...",
  "chainId": 8453,
  "functionName": "store",
  "args": ["77"]
}

Backend:
	•	Prepares WC Smart Session call
	•	Signs raw transaction (via Viem)
	•	Sends it to Base Mainnet

⸻

🌐 Frontend (React + AppKit)

Start the dApp:

npm run dev

Includes:
	•	WalletConnect AppKit onboarding
	•	Session grant UI
	•	Contract read/write panels
	•	Smart Session transaction execution

⸻

🧪 Hardhat Workflow

Compile:

npx hardhat compile

Deploy:

npx hardhat run scripts/deploy.cjs --network base

Verify:

npx hardhat verify --network base 0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644


⸻

🔍 Screenshots (Recommended)

Place your screenshots in:

public/screenshots/

Example README section:

## 📸 Screenshots

### Smart Session Flow  
<img src="./public/screenshots/smart-session-flow.png" width="700"/>

### Contract Execution  
<img src="./public/screenshots/contract-execute.png" width="700"/>

### Wallet Onboarding  
<img src="./public/screenshots/wallet-connect.png" width="700"/>


⸻

🧪 GitHub Actions (CI/CD)

The project includes:

.github/workflows/ci.yml

Features:
	•	Node setup
	•	Install
	•	Type-check (tsc)
	•	Build frontend
	•	Compile Hardhat contracts

⸻

🏆 Talent Protocol / WalletConnect Builder Scoring

This repository is optimized for builder programs:

✔ Public verified contract

✔ Open-source dApp

✔ Multiple commits over time

✔ Smart Sessions implementation

✔ Reown AppKit integration

✔ Hardhat deploy + verify

✔ Backend + frontend + contract

✔ Documentation + CI workflows

✔ Good README + screenshots

Use these hashtags in your TalentProtocol submission:

#Base #WalletConnect #Reown #SmartSessions #Wagmi #Viem
#Hardhat #React #Vite #Web3 #dApp #Onchain #TalentProtocol


⸻

🤝 Contributing

Contributions welcome!
	•	Fork the repo
	•	Create a feature branch
	•	Build + test
	•	Submit PR

See: CONTRIBUTING.md

⸻

🛡 Security
	•	Never commit private keys
	•	Use .env
	•	Backend signer must be low-value
	•	Report vulnerabilities privately

See: SECURITY.md.

⸻

📜 License

MIT License.

You may use, fork, modify, or distribute freely.

⸻

🎉 Final Notes

This README is formatted for:
	•	GitHub
	•	Talent Protocol
	•	WalletConnect Builder leaderboard
	•	Base ecosystem showcases
	•	Open-source visibility