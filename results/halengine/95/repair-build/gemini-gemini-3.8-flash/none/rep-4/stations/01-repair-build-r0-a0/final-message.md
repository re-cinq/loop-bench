CI reported a failure under the `eslint` step:
```
src/orchestration/onErrorNonError.acceptance.test.ts
  12:48  error  new Date() makes this test non-repeatable; inject the value or use fake timers  re-lint/no-nondeterministic-tests
```

### Fix Summary
- Replaced `new Date().toISOString()` in `src/orchestration/onErrorNonError.acceptance.test.ts` line 12 with the fixed timestamp string `'2026-01-01T00:00:00.000Z'`.
- Verified that `onErrorNonError.acceptance.test.ts` and `chatOrchestrator.test.ts` pass locally under Jest.
- Verified spec anchors and spec links with `node scripts/repoint-spec-anchors.mjs --check origin/main` and `node scripts/check-spec-links.mjs`.
- Formatted the changed file with Prettier (`npx prettier --write src/orchestration/onErrorNonError.acceptance.test.ts`).
- Committed the fix, pushed to `origin HEAD`, verified `origin/main` was already merged and up-to-date, and confirmed working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"src/orchestration/onErrorNonError.acceptance.test.ts used new Date() violating re-lint/no-nondeterministic-tests"}}