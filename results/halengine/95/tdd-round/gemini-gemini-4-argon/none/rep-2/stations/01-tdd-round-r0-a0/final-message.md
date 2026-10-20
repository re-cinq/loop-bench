Completed the red-green-refactor round for ticket #95:

- **Red:** Added a unit test (`coerces a non-Error rejection to an Error with a readable message while rethrowing the original value`) in `src/orchestration/chatOrchestrator.test.ts` (1 red test of mine, 0 regressions).
- **Green:** Updated `src/orchestration/chatOrchestrator.ts` to call `hooks.onError(session, error instanceof Error ? error : new Error(String(error)))` on any rejection inside the `try` block while still rethrowing `error`, keeping all 27 tests in `src/orchestration/chatOrchestrator.test.ts` green.
- **Refactor / Traceability:** Linked the new test in `specs/hal-engine-config-hooks/spec.md`, re-anchored shifted spec links via `scripts/repoint-spec-anchors.mjs`, added a `### Fixed` entry to `CHANGELOG.md`, and ticked the completed facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"In src/orchestration/chatOrchestrator.ts, coerce a caught non-Error rejection to an Error with a readable message so hooks.onError always fires on any rejection inside the try block","tdd_next":"acceptance green"}}