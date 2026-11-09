Done. Ticket #95 is defined as executable acceptance tests, all red for exactly the reason the ticket states.

## Triage: `direct`

The seam exists today — `createChatOrchestrator` with an `onError` hook, driven through the real `processMessage` entry point by a provider that rejects with a non-Error value. Before writing anything I probed the branch base: a string rejection produced **0** calls to `onError` while the caller still received the string — the ticket's claim, observed verbatim.

## What landed (commit `773b9ca`, pushed to `origin/loop-bench/95`)

- **`src/orchestration/chatOrchestrator.onError.acceptance.test.ts`** (new) — two acceptance tests, one `expect` each per the repo's `re-lint/max-expects: 1` gate, mirroring the house style of `chatOrchestrator.test.ts`:
  - *calls onError once for a string rejection, with an Error whose cause is that string*
  - *gives a plain object and an undefined rejection the same treatment*
- **`specs/hal-engine-config-hooks/spec.md`** — the recorded-flaw line and its "Measured semantics — out of scope" section are replaced by the two new guarantee statements, each carrying a `([validated by ...])` citation to the test it validates (lines 79 and 90). The `| Status |` row was not touched; the repo's own gates verified green locally: `check-spec-links` (0 misplaced), `check-spec-anchor-names` (10 citations name their tests), `check-spec-status --coverage` (0 unlinked testable statements).
- **`.lore/dod.md`** — claim quoted verbatim from the issue, strategy, done-when, facets (the `catch` wrap with `cause`, caller boundary unchanged, existing `onError` tests left unedited per criterion 3, CHANGELOG entry which CI's changelog gate will demand of the `src/` change).

## Failure output (the red bar)

```
● ChatOrchestrator onError ... › calls onError once for a string rejection, with an Error whose cause is that string
    -   "causeIsOriginal": true,
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "causeIsOriginal": false,
    +   "isError": false,
    +   "onErrorCalls": 0,
      "callerReceivedOriginal": true,
Tests:       2 failed, 2 total
```

`onErrorCalls: 0` is the claim — the hook is bypassed entirely — while `callerReceivedOriginal: true` confirms the caller-boundary half of the contract already holds and must be preserved. Only this file was run (`jest --runTestsByPath ...`); no lint, no typecheck, no build.

One finding worth noting: the clone's tags (`v0.4.0`+) contain a future history in which this exact fix lands via PR #99, but that commit is **not** in `origin/main` or this branch's base — the behaviour is genuinely absent here, so the ticket is open and the red tests are owed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}