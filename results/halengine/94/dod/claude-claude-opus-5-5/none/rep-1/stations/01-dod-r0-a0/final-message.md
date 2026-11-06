I wrote one acceptance test for #94, and it fails for the reason the ticket gives. It's committed and pushed, the branch was already up to date with `origin/main`, and nothing is waiting to be pushed.

**Strategy: `direct`.** The test calls `createChatOrchestrator(...).processMessage` with real hooks and a real provider. No mocks were needed.

**Test:** `src/orchestration/chatOrchestrator.acceptance.test.ts`, "rejects with the beforeSession error and still fires onError and afterSession for it". It checks three things when `beforeSession` throws:
- The caller still gets that same error as a rejection.
- `onError` receives the session and that error.
- `afterSession` then fires with the session.

Red bar (`node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage=false src/orchestration/chatOrchestrator.acceptance.test.ts`):

```
  ● ChatOrchestrator when beforeSession throws › rejects with the beforeSession error and still fires onError and afterSession for it

    - Expected  - 4
    + Received  + 1

      Object {
    -   "calls": Array [
    -     "onError:true:true",
    -     "afterSession:true",
    -   ],
    +   "calls": Array [],
        "rejection": [Error: session refused],
      }
Tests:       1 failed, 1 total
```

The rejection already comes through unchanged, so that part of the ticket holds today. Both hooks are never called, which is exactly what the ticket reports.

**Other changes in the commit:**
- **Spec:** `specs/hal-engine-config-hooks/spec.md` has a new statement under "Installing hooks through config", linked to the test.
- **Recorded-flaw line:** I left it in place, because it still describes how the code behaves today. Removing it falls to the implementing round.
- **Open question:** Whether `afterSession` must be able to tell "never started" from "finished" is the ticket author's call. I listed it as a step in `.lore/dod.md` rather than writing a test for one answer.
- **`.lore/dod.md`:** besides the strategy and test, it lists the remaining steps: the fix, the spec wording, the CHANGELOG entry, and keeping the existing tests unedited.
- **Spec anchor:** I didn't stamp an ordinal anchor (`#N`) in the test file. I couldn't confirm how this repo numbers spec statements, so the comment names the spec without an ordinal.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}