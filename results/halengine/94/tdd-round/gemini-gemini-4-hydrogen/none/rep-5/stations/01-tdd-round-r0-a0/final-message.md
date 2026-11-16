Completed one red-green-refactor round for the first facet in `.lore/dod.md`:

- **RED**: Added `fires onError and afterSession and rethrows when beforeSession throws` in `src/orchestration/chatOrchestrator.test.ts` and verified it failed (`callOrder` was `['beforeSession']`).
- **GREEN**: Moved `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` and verified the new test passes (`1 passed, 23 skipped`).
- **Traceability & Hygiene**: Added the validating citation in `specs/hal-engine-architecture/spec.md`, formatted the modified TypeScript files with Prettier, repointed shifted spec anchors (`npm run spec:names` and `node scripts/repoint-spec-anchors.mjs --check origin/main` pass; `npm run check:spec-links` passes), ticked the closed facet in `.lore/dod.md`, committed (`a141a56`), pushed to `origin/loop-bench/94`, and confirmed `origin/main` is already up to date.

Test summary for this round: 0 red tests from this round (the 1 new unit test failed in RED and passed in GREEN) and 0 regressions observed locally (only the newly written unit test was executed here; CI judges the acceptance tests and full suite).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts.","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession."}}