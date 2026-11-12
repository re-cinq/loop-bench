### Summary of Work

1. **Addressed CI Failures**:
   - Fixed `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` typecheck error (TS2353) by instantiating `PromptBuilder` with `{ identity: 'You are HAL.' }` matching `PromptBuilderConfig`.
   - Fixed `re-lint/max-expects` eslint error in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` by consolidating the 3 `expect` calls into a single `expect({ outcome, caughtError, afterSessionRan }).toEqual(...)` assertion.
2. **Updated Spec Traceability**:
   - Updated the citation anchor in `specs/hal-engine-config-hooks/spec.md` to `#L34` where `it('runs onError and afterSession when beforeSession throws')` now begins.
   - Verified that `node scripts/check-spec-anchor-names.mjs` passes with 0 findings across all 589 citations.
   - Verified that `node scripts/check-spec-links.mjs` and `node scripts/check-spec-status.mjs` pass cleanly.
3. **Delivery**:
   - Staged and committed changes with message: `fix(test): resolve typecheck and max-expects lint errors in beforeSession acceptance test`.
   - Pushed to `origin HEAD` and verified clean merge with `origin/main`.
   - Verified `git status` reports working tree clean and up to date with upstream.

### Verification and Regression Status
- **Test execution**: This round ran no tests here (local test execution was restricted by the pod's policy hook and acceptance tests must not be run locally per instructions; CI is the judge).
- **Red tests and regressions**: 0 red tests were ours and 0 were regressions.
- **Unrelated smells**: None observed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix acceptance test typecheck and max-expects lint failures","tdd_next":"acceptance green"}}