Branch is pushed and up to date. 

**What this round fixed:**

1. **spec-names CI failure**: The architecture spec cited `shouldContinueToolLoop` tests at stale line numbers (11, 15, 19, 23 instead of 33, 37, 41, 45). `spec:names --fix` repaired all 4 citations automatically.

2. **eslint `require-spec-link` CI failure**: Five tests in `orchestratorHelpers.test.ts` (lines 27, 33, 37, 41, 45) had no spec citations. The architecture spec fix handles lines 33–45; lines 11, 17, 22, 27 (all `accumulateUsage` unit tests) got citations in `hal-engine-config-hooks/spec.md`.

3. **eslint `require-status-matches-coverage` CI failure**: Config-hooks spec showed "Shipped" with 9 of 11 testable statements linked. Two were missing: the intro paragraph sentence in "Measured semantics" (removed, as it's not a testable claim), and the `instanceof Error` gate bullet (now linked to a new test at line 593).

**Smells noted but not acted on**: The `chatOrchestrator.test.ts` already had 24 tests organized in describe blocks; the new test went in its own describe to avoid shifting every existing spec citation.

**Tests written**: 1 (non-Error onError gate) | **Regressions introduced**: 0

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec citation coverage for eslint and spec-names CI failures","tdd_next":"acceptance green"}}