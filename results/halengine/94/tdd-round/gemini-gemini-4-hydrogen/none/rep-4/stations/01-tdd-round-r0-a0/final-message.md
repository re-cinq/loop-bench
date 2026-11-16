Moved `hooks.beforeSession` inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` and added a unit test in `src/orchestration/chatOrchestrator.test.ts` verifying that when `beforeSession` throws, `onError` and `afterSession` run in order, the error propagates, and subsequent hooks and the provider are skipped.

- Tests: ran `src/orchestration/chatOrchestrator.test.ts` (`24 passed, 24 total`; 0 red tests of mine, 0 regressions). The acceptance test was not run locally.
- Spec traceability & DoD: linked the new test in `specs/hal-engine-architecture/spec.md`, ran `scripts/check-spec-anchor-names.mjs --fix` and verified `repoint-spec-anchors.mjs --check origin/main`, `check-spec-links.mjs`, and `check-spec-status.mjs`, and checked off the first facet in `.lore/dod.md`.
- Unrelated smells noticed (not acted on): `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` contains 3 `expect()` calls, which may exceed `re-lint/max-expects` in CI lint.
- Committed (`5984663`) and pushed to `origin/loop-bench/94` (up to date with `origin/main`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts.","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession."}}