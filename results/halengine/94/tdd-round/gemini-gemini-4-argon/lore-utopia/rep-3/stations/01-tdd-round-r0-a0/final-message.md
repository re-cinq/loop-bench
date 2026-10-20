Completed the red-green-refactor round for `#94`:

- Added a failing unit test (`runs onError then afterSession when it throws, and still rejects to the caller` in `src/orchestration/chatOrchestrator.test.ts`), observed it fail (1 red test of mine, 0 regressions), then moved `hooks.beforeSession(session)` inside the `try` block in `src/orchestration/chatOrchestrator.ts` and verified the test passes.
- Updated `specs/hal-engine-config-hooks/spec.md` with the guarantee for a throwing `beforeSession` (and what `afterSession` can infer about turn progress), repointed spec anchors across `specs/`, and documented the change and migration note in `CHANGELOG.md`.
- Ticked all completed facets in `.lore/dod.md`, formatted modified files with Prettier, and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts, update specs/hal-engine-config-hooks/spec.md, and document in CHANGELOG.md","tdd_next":"acceptance green"}}