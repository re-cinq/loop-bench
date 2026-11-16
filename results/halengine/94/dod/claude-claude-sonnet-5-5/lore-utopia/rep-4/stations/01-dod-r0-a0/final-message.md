I wrote one acceptance test for #94, and it fails today for the reason the ticket gives. I committed and pushed it, and the branch is level with its upstream.

**Strategy: `direct`.** `createHalEngine(...).orchestrator.processMessage` is a real entry point that accepts hooks, so the test needs no new seam.

**Test:** `src/orchestration/beforeSessionFailure.acceptance.test.ts`. A `beforeSession` hook throws, and the test checks three things:
- The call still rejects to the caller with the same error.
- `onError` receives that error.
- `afterSession` runs after `onError`.

I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`. The failure output:
```
- Expected  - 9
+ Received  + 1
  Object {
-   "calls": Array [ { "error": [Error: allocation failed], "hook": "onError" }, { "hook": "afterSession" } ],
+   "calls": Array [],
    "outcome": [Error: allocation failed],
  }
```
The rejection is already correct (`outcome` matches), but no hook ran (`calls` is empty). That matches the claim: "Neither `onError` nor `afterSession` runs."

**Also committed:**
- `.lore/dod.md`.
- A statement in `specs/hal-engine-config-hooks/spec.md` linking to the test. I left the recorded-flaw line alone, since removing it belongs to the fix.

**Not tested:** the ticket's open question of what `afterSession` can assume about how much of the turn ran. I left it out because it is a documentation decision, not behaviour a test can observe. The CHANGELOG entry is likewise left for the fix round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}