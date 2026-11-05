I added one acceptance test for #94. It fails today for the reason the ticket gives, and it is committed and pushed. The branch merges cleanly with `origin/main` and is not ahead of its upstream.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` already takes hooks, so the test can call it with a throwing `beforeSession`.

**The test** is in `src/orchestration/beforeSessionFailure.acceptance.test.ts`. It makes `beforeSession` throw and checks three things:
- The same error still rejects to the caller.
- `onError` receives the session and the thrown error.
- The hooks run in the order `beforeSession`, `onError`, `afterSession`.

I ran it with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/beforeSessionFailure.acceptance.test.ts`. This is the failure output:

```
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● a beforeSession hook that throws › reaches the caller as a rejection and still runs onError, then afterSession, with the same error
    - Expected  - 4
    + Received  + 2
      "calls": Array [ "beforeSession",
    -     "onError",
    -     "afterSession",
      ],
    -   "onErrorError": [Error: allocation failed],
    -   "onErrorSessionId": "s1",
    +   "onErrorError": undefined,
    +   "onErrorSessionId": undefined,
      "rejection": [Error: allocation failed],
```

The rejection is already correct. `onError` and `afterSession` are the parts that don't run, which is what the ticket reports.

**Other changes:**
- `.lore/dod.md` opens with the ticket's central claim, quoted verbatim.
- I added a statement to `specs/hal-engine-config-hooks/spec.md` with a validated-by link to the new test. I left the old recorded-flaw line in place for the implementer to replace.
- There is no `scripts/spec-links/reanchor.mjs` in this repo, so I set the `#L26` anchor by hand.
- I found no mechanism for stamping a spec anchor into the test lister, so the test carries none beyond the spec link.

**Left for the implementation round:**
- The ticket asks the implementer to decide whether `afterSession` should be able to tell a failed `beforeSession` from a finished turn, and to record the answer in the spec. The test pins only that `afterSession` fires.
- The CHANGELOG entry is also owed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}