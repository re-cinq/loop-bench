I have completed the TDD round for Ticket #94:

- Added a failing unit test (`runs onError then afterSession and skips the turn when beforeSession throws` in `src/orchestration/chatOrchestrator.test.ts`) and verified it failed in the RED phase (1 red test of mine, 0 regressions).
- Moved the `hooks?.beforeSession` invocation inside the `try` block in `src/orchestration/chatOrchestrator.ts` and verified the test passed in the GREEN phase.
- Updated `specs/hal-engine-config-hooks/spec.md` with the new guarantee and assumptions for `afterSession` when `beforeSession` throws, re-anchored spec test links, documented the consumer-visible change in `CHANGELOG.md`, and updated `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts, update specs/hal-engine-config-hooks/spec.md, and document in CHANGELOG.md","tdd_next":"acceptance green"}}