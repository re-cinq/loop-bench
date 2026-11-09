Done. The red bar is committed and pushed; here is the summary.

## What I did

**Triage: `direct`** — the seam already exists (`createChatOrchestrator` + `OrchestratorHooks` are the public entry point), so the acceptance tests drive a real `processMessage` turn and fail on behaviour, not on a missing module.

The ticket's central claim, verbatim: *"beforeSession is awaited before the try block opens, so a throw from it escapes before the catch and finally exist. Neither onError nor afterSession runs."*

**Deliverables** (commit `dd23ed1`, pushed to `loop-bench/94`, already up to date with `origin/main`):

- `src/orchestration/chatOrchestrator.acceptance.test.ts` — 2 acceptance tests through the real entry point. The first pins that a throwing `beforeSession` still rejects the caller with the thrown error while `onError` fires with the same session and error object before `afterSession` runs, and the provider is never reached. The second pins what a cleanup hook can assume afterwards — the session exactly as `beforeSession` left it, the turn never having started — which is the decision the ticket asks to be made explicit.
- `specs/hal-engine-config-hooks/spec.md` — replaced the recorded-flaw line (recorded by #83) with the new guarantee in a new "Failure semantics" section, citing both tests with the repo's `([validated by: …])` form. Anchors verified: `check-spec-anchor-names` reports 8/8 citations naming the tests they point at; statement coverage is 8 testable / 8 linked, so `| Status | Shipped |` still holds.
- `.lore/dod.md` — claim, strategy, tests, facets, out-of-scope.

**Failure output (run: `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`):**

```
● beforeSession failure semantics › runs onError then afterSession, and still rejects the caller with the thrown error, when beforeSession throws
    - Expected  - 4
    + Received  + 2
      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorSawThisError": true,
    -   "onErrorSawThisSession": true,
    +   "onErrorSawThisError": false,
    +   "onErrorSawThisSession": false,
        "outcome": "beforeSession failed",
```

```
● beforeSession failure semantics › hands afterSession the session exactly as beforeSession left it, the turn never having started
    -   "seenByAfterSession": Object { "entryRoles": Array ["user"], "sessionId": "s1" },
    +   "seenByAfterSession": undefined,
Tests:       2 failed, 2 total
```

Both fail for exactly the ticket's stated reason: `outcome: "beforeSession failed"` shows the rejection already reaches the caller unchanged, while `callOrder: ["beforeSession"]` and `seenByAfterSession: undefined` show neither hook runs. The sibling suite `chatOrchestrator.test.ts` is green and unedited (23 passed), pinning criterion 4.

**Findings for the implementing round** (in dod.md Facets, not test subjects): after the fix, the `finally` also means `commitStreamingEntries` and `saveSession` run for a failed `beforeSession` — the CHANGELOG entry should mention that too; and the two prose links left in "Measured semantics — out of scope" (`chatOrchestrator.ts#L150`, `#L148`) will go stale when the call moves.

**Where CI shows the red bar**: job `Verify`, step **"Test (with coverage floor)"**, running `npm run test:coverage`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}