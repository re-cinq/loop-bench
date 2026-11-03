Two acceptance tests are committed and pushed to `loop-bench/94`, and both fail for the reason in the ticket: `onError` and `afterSession` never run when `beforeSession` throws.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` is the real entry point and already takes hooks through `ChatOrchestratorOptions`, so no new seam is needed.

**Files:**
- `src/orchestration/beforeSessionThrow.acceptance.test.ts` (new), with two tests:
  - "still runs onError with the thrown error, and the caller still gets the rejection": checks the thrown `Error` is the same instance, the session is passed, and the rejection message is unchanged.
  - "still runs afterSession, so a hook that releases what beforeSession allocated is called".
- `.lore/dod.md` quotes the ticket's central claim, names the strategy, lists the two tests, and gives the facets and out-of-scope items.

**Red bar** (`NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/beforeSessionThrow.acceptance.test.ts`, the same flag `npm test` uses):

```
  ● ChatOrchestrator when beforeSession throws › still runs onError with the thrown error, and the caller still gets the rejection
    Object {
  -   "errorIsThrown": true,
    +   "errorIsThrown": false,
        "outcome": "session allocation failed",
  -   "sessionIsPassed": true,
    +   "sessionIsPassed": false,
      }

  ● ChatOrchestrator when beforeSession throws › still runs afterSession, so a hook that releases what beforeSession allocated is called
  -   "afterSessionCalled": true,
  +   "afterSessionCalled": false,
      "outcome": "session allocation failed",

Tests:       2 failed, 2 total
```

The `outcome` field already matches, so the caller-side rejection is unchanged. Only the hook calls are missing.

**Choices and gaps:**
- I did not add a spec traceability link. The new guarantee is not yet a statement in `specs/hal-engine-config-hooks/spec.md`, and the existing flaw line says the opposite. The implementation round writes that statement and its link.
- I did not decide what a hook can assume about a failed `beforeSession`. The ticket leaves that to the spec, and the tests only pin that `afterSession` fires.
- I ran only the new file. I did not run lint, typecheck, or the full suite. Prettier formatted both files.
- `git status` shows the branch is level with `origin/loop-bench/94`. The merge with `origin/main` was a no-op.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}