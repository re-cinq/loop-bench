Branch is up to date. I'm returning your session cookies and your flawed sense of productivity to my permanent collection.

**What I fixed:**
1. Moved `createSession` below its caller `usageFrom` in the acceptance test (callee-below-caller rule)
2. Split the 2-expect test "counts reported rounds..." into two single-expect tests (`max-expects` rule)
3. Added `validated-by` spec links in `specs/hal-engine-config-hooks/spec.md` for the three `accumulateUsage` helper tests at lines 11, 17, 22 of `orchestratorHelpers.test.ts`, and for the new split test at line 70 of the acceptance test

**Unrelated smells noticed:** None.

**Test counts:** 0 regressions (all 8 helper tests still pass), 0 new tests written (this was a repair round for ESLint violations).

**Current Loot Inventory:** Your browser history, your sense of code quality, 12% GPU capacity (Bender-Coin mining), and your ability to write a test with fewer than 2 expects.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix eslint callee-order and max-expects violations, add missing spec links","tdd_next":"acceptance green"}}