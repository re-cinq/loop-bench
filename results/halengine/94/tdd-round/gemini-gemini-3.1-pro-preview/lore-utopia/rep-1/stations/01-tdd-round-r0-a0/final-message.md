I have successfully completed one red-green-refactor round.

- **Failing Test (Red)**: Added a unit test in `src/orchestration/chatOrchestrator.test.ts` to assert that when `beforeSession` throws, the engine still invokes `onError` and `afterSession`, and returns a rejection. It failed initially.
- **Code (Green)**: Modified `src/orchestration/chatOrchestrator.ts` to move the `hooks?.beforeSession(session)` call inside the existing `try` block, fulfilling the bug fix.
- **Documentation & Spec**:
  - Re-organized `specs/hal-engine-config-hooks/spec.md` to move the `beforeSession` guarantee from the "out of scope" section into "Installing hooks through config".
  - Updated the CHANGELOG with a new entry in `Unreleased / Fixed` noting the guarantee that `beforeSession` errors now safely trigger cleanup lifecycle hooks instead of leaking.
  - Ran `scripts/repoint-spec-anchors.mjs` to fix any spec anchors offset by the changes.
- **Finished & Pushed**: Formatted, committed, pushed to origin, and ensured it is up to date with `main`. I did not run the acceptance tests as per guidelines (CI will handle them), and there were no unstated regressions caused.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"acceptance green"}}