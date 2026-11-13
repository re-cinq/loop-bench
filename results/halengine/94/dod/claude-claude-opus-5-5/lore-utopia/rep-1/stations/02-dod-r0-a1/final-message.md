The definition of done for #94 was already on the branch from an earlier round (commit `a668baf`, already pushed). I checked it rather than redoing it, and it holds up, so this round changed and committed nothing.

**Strategy: `direct`.** The test calls `createChatOrchestrator(...).processMessage(session)` with real hooks and a small in-memory provider, no mocks.

- **Test:** `src/orchestration/beforeSessionFailure.acceptance.test.ts`. One test checks three things: the caller still gets the original `beforeSession` error as a rejection, `onError` fires with that same session and error, and `afterSession` fires after it.
- **Spec:** `specs/hal-engine-config-hooks/spec.md` has a new "beforeSession failure" statement that links to this test at `#L19`, which is the line the test starts on.
- **`.lore/dod.md`:** quotes the ticket's claim, then lists the remaining steps. Those are moving the call inside `try`, deciding what `afterSession` can assume, replacing the old flaw line in the spec, and the CHANGELOG entry.

**Red bar.** I ran it with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/beforeSessionFailure.acceptance.test.ts`. A plain `npx jest` fails before running anything with "Must use import to load ES Module", because this repo's `npm test` adds that flag itself.
```
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● a beforeSession hook that throws › still rejects to the caller, and runs onError with (session, error) and then afterSession
    - Expected  - 8
    + Received  + 1
      Object {
        "calls": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorArgs": Array [ Object { "sameError": true, "sameSession": true } ],
    +   "onErrorArgs": Array [],
        "outcome": "rejected with the beforeSession error",
      }
Tests:       1 failed, 1 total
```
This is the ticket's own claim. The rejection already reaches the caller today, but neither `onError` nor `afterSession` runs, because `beforeSession` is awaited before the `try` opens at `src/orchestration/chatOrchestrator.ts:91`.

**Branch:** `origin/main` has nothing the branch is missing, so there was nothing to merge. `HEAD` and `origin/loop-bench/94` are the same commit (`a668baf`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}