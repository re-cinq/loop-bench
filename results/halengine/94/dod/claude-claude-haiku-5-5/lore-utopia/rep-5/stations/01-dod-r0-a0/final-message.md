Two acceptance tests are committed and pushed to `loop-bench/94`, both red for the reason the ticket gives. Strategy is `direct`: `processMessage` is the real entry point and the hooks already flow through `ChatOrchestratorOptions.hooks`.

**Tests** (`src/orchestration/beforeSessionFailure.acceptance.test.ts`)
1. Rejects the caller with the same `beforeSession` error and passes that error and session to `onError`.
2. Still runs `afterSession`, with the session, after a `beforeSession` throw.

I chose "afterSession runs" because the ticket's criteria say it fires. The spec should record that a hook can assume the session never reached the provider, which is a doc item, not a test.

**Red run:** `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/beforeSessionFailure.acceptance.test.ts`

```
  ● beforeSession that throws (HALEngine#94) › rejects the caller with the beforeSession error and passes that same error and session to onError
    expect(received).toHaveLength(expected)
    Expected length: 1
    Received length: 0
  ● beforeSession that throws (HALEngine#94) › still runs afterSession, with the session, after a beforeSession throw
    expect(received).toHaveLength(expected)
    Expected length: 1
    Received length: 0
Tests:       2 failed, 2 total
```

The rejection assertion (`rejects.toBe(failure)`) already passes, so the caller-visible behaviour is unchanged as the ticket requires. Both failures are the missing `onError` and `afterSession` calls, not import or fixture errors.

**Other notes**
- `.lore/dod.md` quotes the ticket's central claim and lists the facets. The spec and CHANGELOG edits are left as facets for the implementation round, not made here.
- I did not add a `([validated by ...])` parenthetical to the spec. The only `beforeSession` statement there is the flaw line, which the implementation replaces.
- Prettier was run on both changed files. I did not run lint, typecheck, or the full suite.
- `origin/main` merged cleanly into the branch, and `git status` reports the branch in sync with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}