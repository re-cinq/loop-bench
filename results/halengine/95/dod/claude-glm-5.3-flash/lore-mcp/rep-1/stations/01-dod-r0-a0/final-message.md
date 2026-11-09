Committed and pushed; the branch is up to date with its upstream and `origin/main` merged clean (already up to date).

## Summary

**Triage: `direct`** — the seam already exists: `createChatOrchestrator(provider, promptBuilder, undefined, {hooks})` is the real entry point, and `processMessage` flows straight through the `catch` that gates `onError` on `error instanceof Error` (`src/orchestration/chatOrchestrator.ts:150`).

**Delivered** (commit `4b5cfcf`, pushed to `loop-bench/95`):

- **`src/orchestration/chatOrchestrator.acceptance.test.ts`** — two acceptance tests (the ticket's two behavioural criteria): a provider rejecting with a string, and one rejecting with a plain object then with `undefined`. Each drives a full turn through `processMessage` with a recording `onError` and captures the caller's rejection value, asserting onError fired exactly once with an `Error` whose `cause` is the original (by identity) while the caller still receives the original value unchanged. The ticket's third criterion (an `Error` rejection reaches `onError` as the same instance) is pinned by the existing suite remaining unedited, per the ticket's own wording — recorded as a facet, not a duplicate test.
- **`specs/hal-engine-config-hooks/spec.md`** — the recorded-flaw line ("Measured semantics — out of scope") is replaced by the new guarantee statement citing the acceptance tests (criterion 4's first half; also mandatory because `re-lint/require-spec-link` gates CI on every test being cited).
- **`.lore/dod.md`** — verbatim claim, `direct` strategy, tests, facets, out of scope.

**Quoted failure output** — both tests fail for exactly the quoted claim ("bypasses `onError` entirely while still propagating to the caller"): `calls: 0` while `callerReceivesTheOriginal: true`.

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError for every rejection › calls onError for a rejection that is a string, wrapping it as the cause, and still rejects the caller with that string

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "callerReceivesTheOriginal": true,
    -   "calls": 1,
    -   "causeIsTheOriginal": true,
    -   "receivedAnError": true,
    +   "calls": 0,
    +   "causeIsTheOriginal": false,
    +   "receivedAnError": false,
      }

      66 |       causeIsTheOriginal: turn.received?.cause === thrown,
      67 |       callerReceivesTheOriginal: turn.rejection === thrown,
    > 68 |     }).toEqual({
         |        ^

  ● onError for every rejection › calls onError the same way for rejections that are a plain object and undefined

    - Expected  - 5
    + Received  + 5
    ...
        "objectCallerReceivesTheOriginal": true,
    -   "objectCalls": 1,
    +   "objectCalls": 0,
    ...
        "undefinedCalls": 1,
    +   "undefinedCalls": 0,

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Run command: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

**Still owed by the implementing round** (facets in `.lore/dod.md`): the one-line production change in the `catch` (wrap non-Errors with `cause`, call `onError` unconditionally, re-throw unchanged) and the `CHANGELOG.md` `## [Unreleased]` entry — which `scripts/check-changelog.sh` will demand the moment the `src/` change lands.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}