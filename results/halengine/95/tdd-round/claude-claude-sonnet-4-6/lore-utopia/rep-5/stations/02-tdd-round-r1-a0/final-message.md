Pushed. The branch is up to date with no unnoticed smells to report.

**What was done:**
- Fixed `re-lint/no-duplicate-code`: extracted the 23-line shared preamble (imports, `promptBuilder`, `sessionWith`, `rejectingWith`) from both test files into `chatOrchestratorTestHelpers.ts`
- Fixed `re-lint/no-nondeterministic-tests`: replaced `new Date().toISOString()` with the fixed string `'2024-01-01T00:00:00.000Z'` in the helper
- Fixed `re-lint/require-spec-link` for `onErrorNonError.acceptance.test.ts:53` and `:64`: updated `specs/hal-engine-config-hooks/spec.md` line 19 from the stale `#L52`/`#L63` to the correct `#L33`/`#L44` after the helper extraction
- Fixed `re-lint/require-spec-link` for `chatOrchestrator.nonError.test.ts:6`: added the missing `[validated by: calls onError with an Error when the provider throws undefined]` citation to spec.md, also updating the statement to mention `undefined` alongside string and object
- Fixed `spec-names` check: `node scripts/check-spec-anchor-names.mjs` now reports 604 citations, 0 findings

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint/spec-names CI failures: duplicate code, non-deterministic timestamp, missing spec links","tdd_next":"acceptance green"}}