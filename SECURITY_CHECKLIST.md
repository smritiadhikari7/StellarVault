# 🛡️ StellarVault Security Checklist

> This is an internal checklist, **not an audit certificate**.

## 1. Soroban

- [x] Sender auth on escrow creation
- [x] Borrower auth on loan request/repay
- [x] Guarantor auth on lock
- [x] Admin comparison on privileged functions
- [ ] **CRITICAL: add one-time initialization guard**
- [ ] Review release/refund authorization
- [ ] Bind guarantees to loans where required
- [ ] Add state-transition tests
- [ ] Add pool-accounting invariants
- [ ] Define token/stroop units
- [ ] Add events
- [ ] Add fuzz/property tests

## 2. Backend Auth

- [x] Signup passwords bcrypt-hashed
- [ ] **Remove legacy hard-coded fallback passwords**
- [ ] **Remove fallback JWT secret**
- [ ] Fail startup without `JWT_SECRET`
- [ ] Add auth middleware
- [ ] Add role/admin authorization

Current source contains fallback JWT secret and legacy seeded-password fallback. Both must be removed before production.

## 3. API Security

- [ ] schema validation
- [ ] rate limiting
- [ ] wallet-address validation
- [ ] numeric/amount validation
- [ ] NoSQL injection review
- [ ] admin route protection
- [ ] idempotency keys for disburse/repay
- [ ] safe error responses
- [ ] audit logs

## 4. CORS

Current server allows localhost, local 192.168.x.x, and configured frontend URL.

Production:

- [ ] exact production origin only
- [ ] remove local-origin allowances in production
- [ ] verify credential requirement

## 5. Treasury Secret

`POOL_TREASURY_SECRET` is server-side.

- [x] not hard-coded in Stellar helper
- [ ] managed secret store
- [ ] dedicated operational account
- [ ] transaction limits
- [ ] monitoring/alerts
- [ ] multisig consideration
- [ ] key rotation plan

## 6. Trust Score

- [ ] canonical score source
- [ ] authenticated updates
- [ ] prevent client tampering
- [ ] timestamps/versioning
- [ ] replay protection
- [ ] stale-score checks

Current backend and contract scores are separate.

## 7. Frontend

- [x] wallet tooling avoids storing user secret keys
- [ ] no secrets in `VITE_*`
- [ ] CSP/security headers
- [ ] token-storage review
- [ ] XSS/user-content review
- [ ] minimize KYC exposure

## 8. Environment

Frontend:

```env
VITE_CONTRACT_ID=
VITE_POOL_TREASURY_ADDRESS=
VITE_ADMIN_ADDRESS=
VITE_API_URL=
```

Backend:

```env
MONGODB_URI=
JWT_SECRET=
FRONTEND_URL=
POOL_TREASURY_SECRET=
PORT=
```

- [ ] `.env.example` only
- [ ] scan Git history for secrets
- [ ] rotate exposed secrets

## 9. CI/CD

Current workflow runs contract build/tests, typecheck, lint, build, Playwright, then Vercel deploy.

Add:

- [ ] dependency scanning
- [ ] `cargo audit`
- [ ] secret scanning
- [ ] branch protection
- [ ] required reviews
- [ ] production approval gate
- [ ] restricted Vercel token scope

## 10. Level 6 Gate

- [ ] critical code fixes complete
- [ ] security review/audit complete
- [ ] proof linked
- [ ] Mainnet contract verified
- [ ] incident/rollback plan
- [ ] treasury controls approved
