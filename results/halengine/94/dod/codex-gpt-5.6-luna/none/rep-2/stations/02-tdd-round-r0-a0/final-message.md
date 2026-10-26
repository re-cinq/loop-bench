Branch is up to date. The fix is pushed. Summary:

- **Code change**: moved `if (hooks?.beforeSession) await hooks.beforeSession(session)` from line 91 (before the `try`) to inside the `try` block — one line move that routes `beforeSession` throws through the same `catch`/`finally` as every other turn failure.
- **Unit test added**: `chatOrchestrator.test.ts` — "called even when beforeSession throws" (RED → GREEN).
- **CHANGELOG**: added migration note under `[Unreleased] ### Changed`.
- **DoD**: all four facets ticked.
- **0 regressions**: all 24 chatOrchestrator tests pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try so onError and afterSession fire on setup failure","tdd_next":"acceptance green"}}