# 👤 StellarVault User Guide

## 1. What is StellarVault?

StellarVault is a Stellar-based lending application built around wallet identity, Trust Score evaluation, lending, borrowing, guarantors, and transparent transaction activity.

Live application: https://stellar-vault-pied.vercel.app/

> The current documented environment is **Stellar Testnet**. Do not use Mainnet funds unless the application explicitly announces a verified Mainnet release.

## 2. Before You Start

You should have:

- A supported Stellar wallet such as Freighter
- A Stellar Testnet account
- Testnet XLM where required
- A StellarVault account for email/password authentication

### Safety

- Never share your secret key or recovery phrase
- Verify network before signing
- Read wallet confirmation screens
- Use official StellarVault links only

## 3. Main Product Areas

| Area | Purpose |
| --- | --- |
| Dashboard | Account, Trust Score, loans, and activity |
| Borrow | Request and monitor borrowing |
| Lend | View/manage lending positions |
| KYC | Verification/profile level |
| Analytics | Usage/account metrics |
| Social | Endorsements, reputation, guarantors |
| Admin | Authorized monitoring and queues |

## 4. Create an Account

Current backend signup uses:

- Name
- Email
- Password
- Stellar wallet address

The account is bound to the supplied wallet address.

## 5. Sign In

Login requires:

- Email
- Password
- Wallet address

The wallet address must match the account.

## 6. Connect Your Wallet

1. Unlock Freighter or another supported wallet.
2. Select the intended Testnet account.
3. Open StellarVault.
4. Choose the wallet connect action.
5. Approve connection.
6. Confirm the displayed address.

### Troubleshooting

- Unlock wallet
- Reload application
- Confirm Testnet
- Confirm wallet matches registered account
- Check backend/API availability
- Retry connection

## 7. Trust Score

The backend Trust Score ranges from 0–1000 and currently considers:

- Wallet age
- Transaction activity
- Repayment history
- Defaults/late payments
- Financial profile signals
- Credit utilization
- Endorsements
- Guarantors
- KYC
- Risk signals

See [AI_TRUST_SCORE.md](./AI_TRUST_SCORE.md).

> The current implementation is rule-based and should be treated as an application risk signal, not a regulated consumer credit score.

## 8. Borrowing

Typical flow:

1. Sign in/connect wallet.
2. Open **Borrow**.
3. Review Trust Score and available credit.
4. Enter loan details.
5. Review request.
6. Submit.
7. Monitor status.
8. If disbursed, verify transaction hash.

### Current eligibility behavior

The backend disbursement logic checks:

- score at least `500`
- amount not above calculated credit limit

The current Soroban `auto_release` source also uses a `500` score threshold.

## 9. Repayment

1. Open active loan.
2. Review outstanding amount.
3. Select repayment.
4. Confirm amount.
5. Sign if wallet confirmation is requested.
6. Wait for confirmation.
7. Verify updated loan state.

## 10. Lending

Backend functionality supports:

- lending stats
- user lending positions
- creating a position
- withdrawing a position

Use the **Lend** area to review and manage lending actions exposed by the current UI.

## 11. KYC

Current Trust Score contribution:

| KYC Level | Points |
| --- | ---: |
| 0 | 0 |
| 1 | 30 |
| 2 | 70 |
| 3 | 100 |

## 12. Social Trust

StellarVault includes backend support for:

- endorsements
- guarantors
- leaderboard/social reputation

## 13. Verify Transactions

Current documented Testnet contract:

```text
CCM5NDCXGRACZBPKRXAPEOAJV4AO4ILAUN52TJBS7WTI4UL4RKWKUGKI
```

Explorer: https://stellar.expert/explorer/testnet/contract/CCM5NDCXGRACZBPKRXAPEOAJV4AO4ILAUN52TJBS7WTI4UL4RKWKUGKI

For transaction verification:

1. Copy transaction hash.
2. Open Stellar Explorer/Stellar Expert.
3. Select Testnet.
4. Search the hash.
5. Verify amount, status, participants, and timestamp.

## 14. Common Errors

### Wallet not linked

Use the wallet originally registered with the account.

### Trust score too low

The backend disbursement path currently requires score `>= 500`.

### Amount exceeds credit limit

Reduce amount or improve relevant profile/repayment metrics.

### Network/CORS failure

Ensure deployed frontend URL is allowed by backend `FRONTEND_URL`.

### Transaction failed

Check Testnet balance/network and verify that a previous attempt was not already submitted.

## 15. Feedback

Feedback form: https://docs.google.com/forms/d/e/1FAIpQLSevpzO2-7ktDdToJ_DiC_wk5cRcS3r6HmvPEYDt-rbLKRxekA/viewform?usp=header

Response/evidence sheet: https://docs.google.com/spreadsheets/d/1w92RoGnh2a3ovTu8xniMaC2LkajxMgs658Zkjanvi10/edit?usp=sharing

Never include private keys, seed phrases, passwords, or secrets in feedback.
