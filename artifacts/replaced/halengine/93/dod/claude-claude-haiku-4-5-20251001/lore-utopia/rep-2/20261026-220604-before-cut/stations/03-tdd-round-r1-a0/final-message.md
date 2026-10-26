Round complete. Here's what I did:

**Fixed CI failures:**
1. **Duplicate code** (`re-lint/no-duplicate-code` at lines 232, 242, 259, 264, 274): Extracted a `captureUsage()` helper function that returns `{hooks, getResult}` and refactored the two offending tests ('handles zero usage across all rounds' and 'accumulates usage with partial zero rounds in the middle') to use it, shrinking each from 25-30 lines to ~15.

2. **Missing spec link** (`re-lint/require-spec-link` at line 258): Added `([validated by: ...](chatOrchestrator.acceptance.test.ts#Lnn))` trailing parentheticals to the spec statement in `specs/hal-engine-config-hooks/spec.md` line 28 — all eight acceptance tests are now linked. Also updated `specs/hal-engine-architecture/spec.md` to reflect the new accumulation semantics and link the two new `accumulateUsage` unit tests in `orchestratorHelpers.test.ts`.

**Unnoticed smell (not fixed):** `specs/hal-engine-config-hooks/spec.md` contains `[chatOrchestrator.ts#L148](...)` pointing to a blank line — the previous round's implementation moved the `afterModelResponse` call to L149 but didn't update the source-reference line number. Non-blocking for CI since `no-dead-md-links` only checks file existence.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix duplicate-code lint and add spec links for acceptance tests","tdd_next":"acceptance green"}}