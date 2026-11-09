Done. Both acceptance tests are committed and pushed, and both are red for exactly the reason the ticket states.

## Triage: `direct`

The seam already exists — `createChatOrchestrator(...).processMessage(session)` is the real entry point every hook fires through. The tests install a throwing `beforeSession`, a real recording provider (a double nowhere: it only records whether the turn reached it), and assert on behaviour. One test per guarantee, one `expect` each, matching the house style.

- `src/orchestration/chatOrchestrator.acceptance.test.ts` — **rejects with the thrown error and hands it to onError like any other failure**: the rejection still reaches the caller unchanged (already true today, asserted so it can't regress), and `onError` received the same session and the same error object.
- same file — **still runs afterSession, after onError, though no part of the turn happened**: `afterSession` fires after `onError`, gets the caller's session, and the turn reached nothing — no provider call, no other hook, no entry committed.

I also replaced the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with a new "A beforeSession that throws" section stating the guarantee and answering the ticket's open question — an `afterSession` may assume only that the turn began and ended — with the `([validated by …])` citations anchored on both tests (repointed via the repo's `check-spec-anchor-names --fix`, all 589 citations clean). Status row untouched and still consistent with coverage.

## Quoted failure output (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`)

```
● ChatOrchestrator when beforeSession throws › rejects with the thrown error and hands it to onError like any other failure
    - Expected  - 2
    + Received  + 2
    -   "onErrorGotTheSameError": true,
    -   "onErrorGotTheSession": true,
    +   "onErrorGotTheSameError": false,
    +   "onErrorGotTheSession": false,
        "outcome": "before session failed",

● ChatOrchestrator when beforeSession throws › still runs afterSession, after onError, though no part of the turn happened
    -   "afterSessionGotTheSession": true,
    +   "afterSessionGotTheSession": false,
        "entriesUntouched": true,
    -   "order": Array [
    -     "onError",
    -     "afterSession",
    -   ],
    +   "order": Array [],
        "outcome": "before session failed",
        "reachedProvider": false,

Tests:       2 failed, 2 total
```

Both fail on the missing hooks while `outcome: "before session failed"` already matches — the rejection path is intact, `onError`/`afterSession` never run. That is the ticket's claim, verbatim.

## Delivered

- Committed `1feea20` (`test(orchestrator): pin beforeSession failure path`), pushed to `origin/loop-bench/94`, branch up to date with `origin/main`, working tree clean.
- `.lore/dod.md` records the strategy, the two red tests, and the implementer's remaining facets: move the `beforeSession` call inside the `try`, add the CHANGELOG entry (the changelog gate will require it once non-test `src/` changes), and leave the existing non-throwing-path tests unedited.

One neighbouring observation, a finding only: the same shared `finally` also runs `saveSession` and `commitStreamingEntries`, so after the fix a failed `beforeSession` will persist the session too — harmless (nothing was modified) but worth a sentence in the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}