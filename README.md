<div align="center">

# 💎 StellarVault

### AI-Powered Collateral-Free Lending Protocol on Stellar

*Building the future of decentralized credit through AI, reputation, and blockchain transparency.*

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Stellar](https://img.shields.io/badge/Built%20on-Stellar-000000?logo=stellar)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![AI](https://img.shields.io/badge/AI-Trust%20Scoring-purple)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

</div>

---

# 🌍 Overview

**StellarVault** is an AI-powered decentralized lending platform that enables users to access loans **without traditional collateral**.

Instead of requiring crypto assets as security, StellarVault evaluates borrowers using an intelligent **AI Trust Score**, wallet activity, repayment history, community reputation, and optional identity verification.

Our mission is to make decentralized finance **accessible, transparent, and inclusive** for everyone.

> **"Credit should be earned through trust, not wealth."**

---

# ✨ Why StellarVault?

Traditional DeFi lending platforms require users to lock valuable crypto assets before borrowing.

This excludes:

- Students
- Freelancers
- Small business owners
- New crypto users
- People without significant capital

**StellarVault changes the model.**

Instead of collateral, loans are approved using a comprehensive AI-driven credit evaluation system.

---

---

## 🏆 Stellar Journey to Master
## 🧭 Belt System Progress
 
| Level | Belt | Focus | Status |
|-------|------|-------|--------|
| ⚪️ Level 1 | White Belt | Wallets & transactions | ✅ Completed |
| 🟡 Level 2 | Yellow Belt | Multi-wallet, contracts & events | ✅ Completed |
| 🟠 Level 3 | Orange Belt | Mini dApp + tests | ✅ Completed |
| 🟢 Level 4 | Green Belt | Advanced contracts & production readiness |🔜 Upcoming |
| 🔵 Level 5 | Blue Belt | Real MVP (5+ users) | 🔜 Upcoming |
| ⚫️ Level 6 | Black Belt | Scale + Demo Day readiness | 🔜 Upcoming |
 
---
 
## 🟠 Current Status: Orange BELT (Completed)

 ## 📋 Contract Addresses (Testnet)

| Name | Address |
|------|---------|
| 🔐💎  CONTRACT ID | `CBKMPCT4RSI2NHJJILN7K5K6FB2ZVD7EYCB5G37UT47GJLCPZOZXYMNT` |

---
## Deployed Contract

| Property | Value |
|---|---|
| **Contract ID** | `CCM5NDCXGRACZBPKRXAPEOAJV4AO4ILAUN52TJBS7WTI4UL4RKWKUGKI` |
| **Network** | Stellar Testnet |
| **Admin Address** | `GCVE5QXJ33NFGVMUCGUTTUVJQ7F6O4G6OPLCIU5O6OQXPYNORGDP3UIY` |
| **Pool Treasury** | `GDRNUHQGNSDT3FW6BLA7FRL4SXRSOUB2PV6HGPVSMML7FPLOECYWLDOA` |
| **Explorer** | [View on Stellar.expert](https://stellar.expert/explorer/testnet/contract/CCM5NDCXGRACZBPKRXAPEOAJV4AO4ILAUN52TJBS7WTI4UL4RKWKUGKI) |


---
## 🌈 UI DEMO 
<img width="2383" height="1239" alt="Screenshot 2026-06-27 145107" src="https://github.com/user-attachments/assets/b82c10bb-6465-4eb7-ac8a-a6434d68b3bc" />

<img width="2556" height="1288" alt="Screenshot 2026-06-27 145238" src="https://github.com/user-attachments/assets/bee5455d-7ba4-49c8-8b0d-41ece67ce233" />

## ⚡ Smart Contract Test Flow
<img width="1958" height="1163" alt="Screenshot 2026-06-27 142550" src="https://github.com/user-attachments/assets/81f3fec5-6cd9-41c8-b86e-fbc57e53157f" />

<img width="2005" height="684" alt="Screenshot 2026-06-27 142654" src="https://github.com/user-attachments/assets/2391b22d-8e71-4949-95ef-c6869061f91d" />

## Step-by-Step Test Cases

**Step 1 — `create_escrow`**  
Output: ✅ Escrow ID = `16`

**Step 2 — `get_escrow`**  
Output: ✅ Status = `0` (Pending)

**Step 3 — `request_loan`**  
Output: ✅ Loan ID = `1`

**Step 4 — `get_loan`**  
Output: ✅ amount=`50000000`, trust_score=`750`, status=`0` (Pending)

**Step 5 — `auto_release`**  
Output: ✅ `true` — trust score `750` >= threshold `700`, Loan Approved

**Step 6 — `repay_loan`**  
Output: ✅ Remaining = `25000000` stroops (2.5 XLM)

**Step 7 — `lock_guarantee`**  
Output: ✅ Guarantee ID = `1`

**Step 8 — `release_funds`**  
Output: ✅ `null` (Success)

**Step 9 — `refund_funds`**  
Output: ✅ `null` (Success)

**Step 10 — `release_guarantee`**  
Output: ✅ `null` (Success)

**Step 11 — `get_wallet_escrows`**  
Output: ✅ `[5, 6, 7, 13, 14, 15, 16, 17]`

**Step 12 — `get_wallet_loans`**  
Output: ✅ `[1]`

**Step 13 — `get_wallet_guarantees`**  
Output: ✅ `[1]`

**Step 14 — `get_pool_balance`**  
Output: ✅ `26473571428` stroops = `2647.35 XLM`

---

## Test Summary

| # | Function | Status | Output |
|---|---|---|---|
| 1 | `create_escrow` | ✅ Pass | Escrow ID `16` |
| 2 | `get_escrow` | ✅ Pass | Status Pending |
| 3 | `request_loan` | ✅ Pass | Loan ID `1` |
| 4 | `get_loan` | ✅ Pass | All fields correct |
| 5 | `auto_release` | ✅ Pass | Approved (750 >= 700) |
| 6 | `repay_loan` | ✅ Pass | 2.5 XLM remaining |
| 7 | `lock_guarantee` | ✅ Pass | Guarantee ID `1` |
| 8 | `release_funds` | ✅ Pass | Success |
| 9 | `refund_funds` | ✅ Pass | Success |
| 10 | `release_guarantee` | ✅ Pass | Success |
| 11 | `get_wallet_escrows` | ✅ Pass | `[5,6,7,13,14,15,16,17]` |
| 12 | `get_wallet_loans` | ✅ Pass | `[1]` |
| 13 | `get_wallet_guarantees` | ✅ Pass | `[1]` |
| 14 | `get_pool_balance` | ✅ Pass | `2647.35 XLM` |

**14/14 Functions Passing on Stellar Testnet** 🚀
---
# 🚀 Key Features

## 💰 Collateral-Free Lending

Borrow digital assets without locking cryptocurrency as collateral.

---

## 🧠 AI Trust Score Engine

Every user receives a dynamic Trust Score calculated from multiple factors.

Evaluation includes:

- Wallet age
- Transaction history
- Repayment behavior
- Default history
- Financial stability
- Community reputation
- Guarantor support
- AI risk prediction
- Optional KYC verification

---

## 👛 Wallet Authentication

Authenticate securely using your Stellar wallet.

Supported features:

- Wallet login
- Balance verification
- Transaction signing
- Loan disbursement
- Loan repayment

> Wallets execute blockchain transactions only. Loan evaluation and scoring are processed off-chain.

---

## 📊 Transparent Lending

Every transaction remains verifiable on the Stellar blockchain.

Users can monitor:

- Loan requests
- Active loans
- Repayments
- Investor earnings
- Wallet balances

---

## 🤝 Social Trust System

Increase borrowing capacity through community trust.

Supports:

- Verified guarantors
- Community reputation
- Trust endorsements

---

## 📉 Intelligent Risk Management

AI continuously evaluates loan risk using behavioral analysis.

Features include:

- Dynamic interest rates
- Fraud detection
- Default prediction
- Blacklisting of malicious users
- Adaptive borrowing limits

---

# 🏛 System Architecture

```
                     +----------------------+
                     |    Borrower Portal   |
                     +----------+-----------+
                                |
                                v
                    +------------------------+
                    |   AI Trust Score API   |
                    +----------+-------------+
                               |
                 Approved? ----+---- Rejected
                      |
                      v
            +-----------------------+
            |     Lending Pool      |
            +-----------+-----------+
                        |
                        v
              Stellar Blockchain
                        |
        Loan Transfer & Repayment
                        |
                        v
              Trust Score Updated
```

---

# 🧠 AI Trust Score

Each user receives a score between **0–1000**.

## 📊 On-Chain Metrics

- Wallet age
- Transaction frequency
- Wallet activity
- Repayment records
- Default history

---

## 💳 Financial Behavior

- Income vs spending pattern
- Balance consistency
- Cash flow analysis

---

## 🤝 Social Reputation

- Community endorsements
- Guarantor backing
- Trust network strength

---

## 🪪 Optional Identity Verification

- Government ID
- Income proof
- Address verification

---

## 🤖 AI Prediction Model

Machine learning estimates:

- Default probability
- Repayment reliability
- Financial behavior trends
- Loan eligibility

---

# 🪪 KYC Levels

| Level | Access | Loan Limit |
|--------|--------|------------|
| 🟢 Level 1 | Wallet Connected | Small Loans |
| 🔵 Level 2 | Verified Identity | Medium Loans |
| 🟣 Level 3 | Trusted User | High Loan Limits |

---

# 💰 Lending Workflow

```text
Loan Request
      │
      ▼
Wallet Verification
      │
      ▼
AI Trust Score Evaluation
      │
      ▼
Loan Approval
      │
      ▼
Funding from Lending Pool
      │
      ▼
XLM Transfer
      │
      ▼
Scheduled Repayment
      │
      ▼
Trust Score Updated
```

---

# ⚡ Wallet Integration

Wallet functionality includes:

- 🔐 Secure authentication
- 💸 Loan disbursement
- 🔁 Loan repayment
- 📊 Transaction verification

**Wallets do not determine loan eligibility.**

Loan approval is handled by the AI Trust Engine.

---

# 🏦 Lending Pool

The lending pool acts as the protocol treasury.

Responsibilities include:

- Holding investor funds
- Funding approved borrowers
- Receiving repayments
- Distributing investor returns

---

# 🛡 Risk Management

StellarVault minimizes lending risk using multiple protection layers.

- AI fraud detection
- Default prediction
- Dynamic interest rates
- Borrowing limits
- Trust-based approval
- Guarantor verification
- Blacklisted wallet detection

---

# 🧱 Tech Stack

## Frontend

- React
- Tailwind CSS
- Framer Motion
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Supabase

---

## Blockchain

- Stellar Testnet
- Freighter Wallet
- Stellar SDK
- Soroban *(Planned)*

---

## AI Layer

- Python
- Trust Score Engine
- Risk Prediction Model
- Behavioral Analysis

---

# 📁 Project Structure

```bash
stellarvault/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── routes/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── ai-model/
│   ├── trust_score.py
│   ├── fraud_detection.py
│   ├── default_prediction.py
│   └── requirements.txt
│
├── smart-contracts/
│   └── soroban/
│
├── docs/
│
├── README.md
│
└── LICENSE
```

---

# 🔌 REST API

## 👛 Wallet

```http
POST /api/connect-wallet
```

```http
GET /api/balance/:wallet
```

---

## 💰 Lending

```http
POST /api/request-loan
```

```http
POST /api/approve-loan
```

```http
POST /api/repay-loan
```

---

## 🧠 Trust Score

```http
GET /api/trust-score/:user
```

```http
POST /api/update-score
```

---

# 📈 Roadmap

## Phase 1

- ✅ Wallet Authentication
- ✅ Loan Request System
- ✅ Lending Pool
- ✅ AI Trust Score MVP

---

## Phase 2

- Smart Contracts (Soroban)
- Automated Loan Execution
- Investor Dashboard
- Advanced Analytics

---

## Phase 3

- DAO Governance
- Mobile Application
- Stablecoin Lending
- Cross-chain Expansion
- Institutional Lending

---

# 🎯 Vision

> **"Transforming human behavior into financial credit through AI and blockchain."**

StellarVault aims to create a world where **trust becomes the new collateral**, enabling fair and inclusive access to decentralized finance.

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ If you like this project, don't forget to star the repository!

**Built with ❤️ for the Stellar Ecosystem**

</div>
