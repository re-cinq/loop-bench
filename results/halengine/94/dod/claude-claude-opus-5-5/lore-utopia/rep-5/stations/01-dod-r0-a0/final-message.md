I've written one acceptance test for #94. It fails for the reason the ticket gives, and it's committed and pushed to `loop-bench/94`. The branch was already up to date with `origin/main`, and `git status` shows it is not ahead of its upstream.

**Strategy: `direct`.** The test calls the real entry point, `createChatOrchestrator(...).processMessage(session)`. It installs a `beforeSession` that throws, plus recording `onError` and `afterSession` hooks, and uses a provider that answers normally so the hook's throw is the only failure in the turn.

**Test file:** `src/orchestration/beforeSessionFailure.acceptance.test.ts`. It checks three things at once:
- the caller's promise still rejects with the exact error `beforeSession` threw;
- `onError` gets the same session and error objects;
- the hooks fire in the order `beforeSession` → `onError` → `afterSession`.

**Red bar** (`NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/beforeSessionFailure.acceptance.test.ts`):
```
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● a beforeSession hook that throws › still rejects with its error, and fires onError with (session, error) and then afterSession
    - Expected  - 6
    + Received  + 1
      Object {
        "calls": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorArgs": Object {
    -     "sameError": true,
    -     "sameSession": true,
    -   },
    +   "onErrorArgs": undefined,
        "rejection": "rejected with the beforeSession error",
      }
Tests:       1 failed, 1 total
```
The rejection already matches, which pins the first acceptance criterion as unchanged. What fails is that neither `onError` nor `afterSession` runs, which is exactly what the ticket reports.

**Also in the commit:**
- **`.lore/dod.md`**: quotes the ticket's claim and lists the remaining work.
- **The spec, `specs/hal-engine-config-hooks/spec.md`**: a new "A failing `beforeSession`" statement linked to the test. `check-spec-anchor-names` and `check-spec-links` both pass.

**Left for the next round** (listed as checkboxes in the DoD):
- Move the `beforeSession` call inside the `try`.
- Decide and record in the spec what `afterSession` can assume about how much of the turn ran.
- Remove the old flaw bullet from the spec's "Measured semantics" section and update its "These three properties" wording to match.
- Add the CHANGELOG entry.
- Keep the existing tests unedited and passing.

One side effect the implementer should note: once `beforeSession` moves inside the `try`, its `finally` also saves the session through `saveSession`. So a failed `beforeSession` will cause a store write too, and the CHANGELOG entry should mention it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}