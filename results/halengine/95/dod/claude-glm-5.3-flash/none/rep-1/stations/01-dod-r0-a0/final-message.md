Done. Triage: **`direct`** — the seam already exists (`createChatOrchestrator` + a provider that rejects with a non-`Error` + an `onError` hook), so the acceptance tests call the real entry point and fail on behaviour today.

## What landed (pushed to `loop-bench/95`, in sync with upstream, based on current `origin/main`)

- **`src/orchestration/chatOrchestrator.acceptance.test.ts`** (new) — 2 acceptance tests covering AC 1–2: a string rejection must call `onError` exactly once with an `Error` whose `cause` is the string; a plain object and `undefined` must do the same by identity; both also pin that the caller still receives the original rejection unchanged (AC's "re-thrown value stays exactly what it is today").
- **`specs/hal-engine-config-hooks/spec.md`** — the recorded-flaw section ("gates `onError` on `error instanceof Error` … owned by no issue") is replaced by the new guarantee, citing the two tests; anchors verified with the repo's own `check-spec-anchor-names` (10/10 citations resolve). `| Status |` untouched.
- **`.lore/dod.md`** — verbatim claim, strategy, checklist, facets, out-of-scope.

AC 3 (an `Error` rejection reaches `onError` as the same instance) is deliberately not a new test — it holds today, so it's pinned in the dod by the existing `chatOrchestrator.test.ts` hooks tests remaining **unedited and green**.

## Red bar — actually run

Command: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● › calls onError once for a string rejection, with an Error whose cause is that string, and rejects the caller with it
    -   "hookReceivedAnError": true,
    -   "hookReceivedCause": "provider exploded",
    -   "onErrorCalls": 1,
    +   "hookReceivedAnError": false,
    +   "hookReceivedCause": "not an Error (undefined)",
    +   "onErrorCalls": 0,
        "callerRejection": "provider exploded",
  ● › treats a plain object and undefined the same way: each reaches onError once as its cause, unchanged to the caller
    -     "hookReceivedTheOriginalAsCause": true,
    -     "onErrorCalls": 1,
    +     "hookReceivedTheOriginalAsCause": false,
    +     "onErrorCalls": 0,
        "callerReceivedTheOriginal": true,
Tests:       2 failed, 2 total
```

`onErrorCalls: 0` while `callerRejection` still carries the original value — precisely the ticket's claim: the hook is bypassed, the caller still sees the rejection.

## Owed by the implementation round (in `.lore/dod.md` facets)

The `catch` fix in `src/orchestration/chatOrchestrator.ts` (wrap non-`Error`s, keep `cause`, re-throw untouched), plus the `CHANGELOG.md` `## [Unreleased]` entry — CI's `check-changelog.sh` will demand it the moment that non-test src file changes (my push touches only a `.test.ts`, which that gate excludes).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}