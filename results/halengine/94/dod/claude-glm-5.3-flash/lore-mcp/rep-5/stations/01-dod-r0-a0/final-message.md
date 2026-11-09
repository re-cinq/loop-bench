Branch pushed and in sync — `git status` reports `loop-bench/94...origin/loop-bench/94` with no ahead/behind, and the branch was cut at `origin/main`'s HEAD so no merge was owed.

## What I did

**Triage: `direct`** — the seam already exists. `createChatOrchestrator(..., {hooks})` + `processMessage` is the real caller path (the HTTP route at `src/transport/routes/chats.ts:106` calls exactly it), so the acceptance test installs a throwing `beforeSession` and observes the behaviour today.

**One acceptance test**, in a new file `src/orchestration/chatOrchestrator.acceptance.test.ts`, pinning the ticket's whole claim in one scenario: a throw from `beforeSession` still rejects the caller with that error (criterion 1, unchanged from today), `onError` receives the same session object and the very error thrown (criterion 2), then `afterSession` runs on a session the turn has not touched — no provider call, no appended entry, which is the "never allocated vs allocated and finished" answer the ticket asks to be recorded (criterion 3).

**Red bar, actual failure output** (run: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`):

```
    - Expected  - 8
    + Received  + 4

      Object {
    -   "afterSessionGotSameSession": true,
    +   "afterSessionGotSameSession": false,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorGotSameSession": true,
    -   "onErrorGotThrownError": true,
    +   "entriesSeenByAfterSession": undefined,
    +   "onErrorGotSameSession": false,
    +   "onErrorGotThrownError": false,
        "outcome": "beforeSession failed",
      }
```

It fails for exactly the ticket's stated reason: `callOrder` arrives as `["beforeSession"]` — neither `onError` nor `afterSession` runs — while `outcome` already reads `"beforeSession failed"`, confirming the rejection reaches the caller unchanged and only the hooks are missing.

**Also verified**: the existing pins for a non-throwing `beforeSession` (criterion 4) are green and unedited — `src/orchestration/chatOrchestrator.test.ts` 23/23, `src/config.test.ts` 11/11. The spec's recorded-flaw line is replaced by the new guarantee under a new "When `beforeSession` throws" section, citing the test (`#L34`, the `it(` declaration); the remaining two recorded-semantics bullets stay untouched. `.lore/dod.md` records the claim, strategy, tests and the implementation round's facets (the one-line source move, CHANGELOG entry, anchor repoint, CI gates).

**Finding for the implementation round** (not a test subject): on this path the `finally` will also run `commitStreamingEntries` and `saveSession` for a failed `beforeSession` — consistent with the `afterSession`-always-fires promise in CLAUDE.md, and noted as out of scope in the DoD.

Commit `19032fc` pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}