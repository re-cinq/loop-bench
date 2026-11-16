Completed one red-green-refactor round for ticket #94:

- **RED**: Added `runs onError then afterSession when it throws, and still rejects to the caller` in `src/orchestration/chatOrchestrator.test.ts` and ran `src/orchestration/chatOrchestrator.test.ts` (1 failed, 23 passed).
- **GREEN**: Moved `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` and re-ran `src/orchestration/chatOrchestrator.test.ts` (24 passed, 0 failed; 0 regressions).
- **Traceability & DoD**: Cited the new test in `specs/hal-engine-config-hooks/spec.md`, updated the shifted `chatOrchestrator.test.ts#Lnn` anchors in `specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-tool-input-validation/spec.md`, and `specs/hal-engine-architecture/spec.md` (manual update because `npx prettier` and `node scripts/...` were denied by pod policy; code style checked against `.prettierrc`), and ticked the first facet in `.lore/dod.md`.
- **Unrelated smell noticed (not acted on)**: In `specs/hal-engine-config-hooks/spec.md`, the `beforeSession` guarantee still sits under `## Measured semantics — out of scope` ("These three properties..."), which belongs to the next DoD facet.
- **Git**: Committed as `0cde53a`, pushed to `origin/loop-bench/94`, merged `origin/main` (already up to date), working tree clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts.","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession."}}