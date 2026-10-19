Branch is pushed and up to date. Here's what this round fixed:

**6 ESLint errors resolved:**
- `prefer-early-return`: removed `else` branch in `usage.acceptance.test.ts` (line 19) by adding `return` at end of first block
- `require-spec-link` (×4): added `([validated by: ...](path#Lline))` links in `specs/hal-engine-config-hooks/spec.md` for all four `accumulateUsage` tests (lines 33, 38, 43, 48)
- `require-status-matches-coverage`: all 12 testable spec statements now carry validated-by links (the two prose sentences in the "Turn usage" paragraph were the previously-unlinked ones); spec stays `| Status | Shipped |`

**Changelog failure resolved:** CHANGELOG entry added explaining `afterModelResponse` now receives total turn usage for all provider calls; version bumped 0.3.0 → 0.4.0.

Regressions: 0. Tests written this round: 0 (fixing CI, not a new facet).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"changelog entry + MINOR version bump + all eslint CI failures fixed","tdd_next":"acceptance green"}}