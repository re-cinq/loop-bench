Addressed the CI reported ESLint findings from the round brief:
- Replaced the non-deterministic `new Date()` in `src/orchestration/onErrorNonError.acceptance.test.ts` with a fixed timestamp string to resolve `re-lint/no-nondeterministic-tests`.
- Removed token-level duplication in the rejecting provider helper between `src/orchestration/chatOrchestrator.test.ts` and `src/orchestration/onErrorNonError.acceptance.test.ts` to satisfy `re-lint/no-duplicate-code`.
- Verified formatting with Prettier across all touched files and confirmed spec anchor consistency via `check-spec-anchor-names.mjs`.
- Verified our unit test in `chatOrchestrator.test.ts` passed (0 red tests of ours, 0 regressions).
- Recorded the closed facet in `.lore/dod.md`, committed the changes, and pushed to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint findings for test non-determinism and code duplication","tdd_next":"acceptance green"}}