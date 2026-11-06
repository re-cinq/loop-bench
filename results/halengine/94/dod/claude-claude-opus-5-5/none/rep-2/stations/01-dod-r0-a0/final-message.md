I wrote one acceptance test for #94. It fails today for the reason the ticket gives, and it's committed and pushed to `loop-bench/94`. `git status` shows the branch level with its upstream, and merging `origin/main` brought in no changes.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage(session)` already accepts hooks, so the test drives it with a real provider and no doubles. A `beforeSession` hook that throws should leave the caller with the same rejection, call `onError` with the turn's session and the thrown error, and then call `afterSession`.

- **Test:** `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- **Run with:** `npm test -- src/orchestration/beforeSessionFailure.acceptance.test.ts`

```
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● a beforeSession hook that throws › still rejects to the caller, and runs onError with (session, error) and then afterSession
    - Expected  - 4
    + Received  + 2
      Object {
        "calls": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorError": [Error: allocation failed],
    -   "onErrorSessionIsTheTurnSession": true,
    +   "onErrorError": undefined,
    +   "onErrorSessionIsTheTurnSession": false,
        "rejection": [Error: allocation failed],
      }
Tests:       1 failed, 1 total
```

The rejection already matches today, which is the first acceptance criterion. What fails is exactly what the ticket reports: `onError` and `afterSession` never fire.

**Also committed:**
- **The spec:** `specs/hal-engine-config-hooks/spec.md` has a new statement linked to the test at line 24. `check-spec-links` reports nothing misplaced.
- **`.lore/dod.md`:** it records the strategy and the remaining steps. These are:
  - move the `beforeSession` call inside the `try`;
  - keep the existing orchestrator and config tests green without editing them;
  - remove the recorded-flaw line from the spec;
  - add the CHANGELOG entry.

**Left for whoever implements it:** the ticket asks for an explicit decision on whether `afterSession` needs to know the session never started. That's a design choice, not something the ticket specifies, so the test only requires that `afterSession` fires. The spec wording for that decision still has to be written.

**For whoever removes the flaw line:** the spec's "Measured semantics" section says it lists "three properties". Once that line goes, the count needs updating to two.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}