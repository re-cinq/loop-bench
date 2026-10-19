Pushed and up to date. 

**What this round did**: Fixed all 7 ESLint CI failures from the previous push:

1. **`prefer-early-return`** — removed `else` branch in `multiRoundProviderWithUsage`, using `continue` instead
2. **`no-duplicate-code` (cross-file)** — extracted `registryReturning`/`TOOL_CALL`/`STOP_FOR_TOOL`/`STOP_DONE` to `src/orchestration/testHelpers.ts`; both test files now import from there
3. **`no-duplicate-code` (within acceptance test)** — added `runMultiRound` helper that captures usage internally; tests 1 and 3 now call it rather than repeating the orchestrator setup pattern
4. **`require-spec-link` for 3 `orchestratorHelpers.test.ts` tests** — added spec bullets in `spec.md` with validated-by links to lines 29, 33, 38
5. **`require-status-matches-coverage` ("12 of 14")** — removed the untestable intro paragraph under `## Measured semantics`; added a new test for the non-Error bypass behavior (line 311) and its spec link; updated acceptance test line numbers that shifted after refactoring

All facets are now ticked. Zero regressions (0 red tests written by this round, 0 regressions caused).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix all eslint CI failures: prefer-early-return, no-duplicate-code, require-spec-link, require-status-matches-coverage","tdd_next":"acceptance green"}}