I wrote one acceptance test for #94. It fails today for the reason the ticket gives, and it's committed and pushed to `loop-bench/94`. The branch is level with `origin/main` (merging it changed nothing) and nothing is left unpushed.

**Strategy: `direct`.** The test calls `createChatOrchestrator(...).processMessage` with a `beforeSession` hook that throws. No mocks or stubs are needed.

**Test:** `src/orchestration/beforeSessionThrows.acceptance.test.ts`, "rejects to the caller and still runs onError with (session, error) and then afterSession". It checks three things:
- The caller still gets a rejection carrying the `beforeSession` error. This part passes today.
- `onError` receives the same session and the same error.
- `afterSession` then fires with the same session.

Failure output (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/beforeSessionThrows.acceptance.test.ts`):
```
  ● beforeSession that throws › rejects to the caller and still runs onError with (session, error) and then afterSession
      Object {
    -   "calls": Array [
    -     "onError(sameSession=true, sameError=true)",
    -     "afterSession(sameSession=true)",
    -   ],
    +   "calls": Array [],
        "rejection": "rejected with the beforeSession error",
      }
Tests:       1 failed, 1 total
```
The rejection already matches. `calls` is empty because neither hook runs, which is exactly what the ticket reports.

**Spec and DoD:**
- I added the new guarantee to `specs/hal-engine-config-hooks/spec.md` under "Installing hooks through config", linked to the test at `#L21`. The `Status` row is unchanged.
- The old "recorded flaw" bullet under "Measured semantics" is still there. Until it's deleted the spec contradicts itself, so deleting it is a listed step in `.lore/dod.md`.
- The other steps listed there:
  - Move `beforeSession` inside the `try`.
  - Decide whether `afterSession` must be able to tell that the session never started, and write that answer into the spec.
  - Add the CHANGELOG entry.
- The existing hook tests in `chatOrchestrator.test.ts` and `config.test.ts` must stay green and unedited; they cover the case where `beforeSession` doesn't throw.

Two things I left out on purpose:
- **The `afterSession` decision:** the ticket asks for a decision and a spec sentence, which a test can't settle, so it's a step for the next round.
- **Spec anchor:** this repo has no spec-anchor stamping in `scripts/lore-list-tests.mjs`, so the test only cites the spec file in a header comment.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}