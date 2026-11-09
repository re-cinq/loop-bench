Done. The branch carries the ticket's definition of done as two red acceptance tests, verified and pushed.

**Triage: `direct`** — the seam already exists: `createChatOrchestrator(..., {hooks}).processMessage()` is the real entry point, callable today, failing on behaviour rather than a missing module.

**What's on the branch** (`src/orchestration/beforeSessionError.acceptance.test.ts`, plus `.lore/dod.md` recording the strategy, facets and out-of-scope lines):

1. **hands the thrown Error to onError with the session, and the same rejection still reaches the caller** — criteria 1+2
2. **runs onError then afterSession, the same order as any other failed turn** — criterion 3

Criterion 4 is pinned by the existing tests (`chatOrchestrator.test.ts` × 2, `config.test.ts` × 1), which `git diff origin/main` confirms are unedited.

**Red bar, run here** with `NODE_OPTIONS="--experimental-vm-modules" npx jest --runTestsByPath src/orchestration/beforeSessionError.acceptance.test.ts`:

```
● a beforeSession that throws › hands the thrown Error to onError with the session, and the same rejection still reaches the caller
    - Expected  - 2
    + Received  + 2
      Object {
        "outcome": "beforeSession blew up",
    -   "receivedError": [Error: beforeSession blew up],
    -   "sameSession": true,
    +   "receivedError": undefined,
    +   "sameSession": false,
Tests:       2 failed, 2 total
```

Test 2 fails on `callOrder: ['beforeSession']` against the expected `['beforeSession', 'onError', 'afterSession']`. Both failures are the quoted claim verbatim — the rejection still reaches the caller, but `onError` never fires and neither cleanup hook runs, because `chatOrchestrator.ts:91` awaits `beforeSession` above the `try`.

**Delivery**: both commits pushed (`28d33b0` tests+dod, `8b512c2` prettier on dod.md); prettier run over the changed files; `origin/main` merged in — already up to date, so the branch merges clean and CI will run; `git status` reports the branch is up to date with `origin/loop-bench/94`. The fix round owes: move the `beforeSession` call inside the `try`, record the "how much of the turn happened" answer in `specs/hal-engine-config-hooks/spec.md` replacing the recorded-flaw line, and add a CHANGELOG entry — all listed as facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}