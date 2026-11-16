Fixed the `re-lint/no-nondeterministic-tests` ESLint failure reported on `48d6c74a6b0f7da5b8a9c423833b2caa7b443705`:

- Updated `src/orchestration/onErrorNonError.acceptance.test.ts:12` to use the fixed timestamp `'2026-01-01T00:00:00.000Z'` instead of `new Date().toISOString()`.
- Verified formatting with `npx prettier --write src/orchestration/onErrorNonError.acceptance.test.ts` (unchanged), ran `src/orchestration/onErrorNonError.acceptance.test.ts` via Jest (2 passed), and verified `check-spec-anchor-names.mjs` and `repoint-spec-anchors.mjs --check origin/main` pass.
- Committed (`8c0a7ce`), pushed to `origin/loop-bench/95`, and confirmed `origin/main` is already up to date with a clean working tree.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced nondeterministic new Date().toISOString() with a fixed ISO timestamp in src/orchestration/onErrorNonError.acceptance.test.ts"}}