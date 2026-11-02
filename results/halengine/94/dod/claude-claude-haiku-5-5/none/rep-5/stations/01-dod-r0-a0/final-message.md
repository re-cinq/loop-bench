The acceptance test is written, runs red for the ticket's stated reason, and is pushed to `loop-bench/94`. The branch is level with its upstream and already contains `origin/main`, so the merge step produced nothing.

**Triage: `direct`.** `createChatOrchestrator` takes `hooks` and `processMessage` is the real entry point, so the test drives the real code path.

**The test** (`src/orchestration/chatOrchestrator.acceptance.test.ts`, one test):
- A `beforeSession` that throws, with `onError` and `afterSession` installed.
- Expects the hook order `beforeSession → onError → afterSession`, `onError` receiving the session and the thrown error, and the caller still getting that same error.

**Red run.** I ran it with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
    - Expected  - 18
    + Received  +  1

      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorArgs": Array [
    ...
    +   "onErrorArgs": Array [],
        "rejection": [Error: beforeSession refused the turn],
      }

Tests:       1 failed, 1 total
```

The rejection already matches, so the only failing part is the missing `onError` and `afterSession`, which is the ticket's claim.

**Decisions I made:**
- The test asserts that `afterSession` does run after a failed `beforeSession`. That is my reading of the ticket's "decide one question". The spec wording still has to record it, and the hook cannot tell "never allocated" from "allocated and finished" yet.
- I did not add a `validated by` link on the spec's recorded-flaw bullet. That bullet is the statement the ticket says to replace, so the link belongs with the new guarantee line in the fix round.
- The spec-anchor stamping isn't wired: `scripts/lore-list-tests.mjs` has no `spec` field, so there was nothing to stamp.

**Other things:**
- `.lore/dod.md` has the claim quoted verbatim, the `direct` strategy, the one test, and facets for the code move, the spec line, and the CHANGELOG entry.
- The repo's test runner is Jest, not Vitest, and the file name matches Jest's `*.test.ts` pattern.
- I formatted the file with Prettier and did not run lint or typecheck.
- CI's `hal-engine-jest` job runs this test by selector `src/orchestration/chatOrchestrator.acceptance.test.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}