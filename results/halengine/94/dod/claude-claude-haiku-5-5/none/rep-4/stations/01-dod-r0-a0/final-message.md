Both acceptance tests are committed and pushed to `loop-bench/94` as `48da945`. The branch is not ahead of its upstream, and it already contains `origin/main`, so no merge was needed.

**Strategy: `direct`.** `processMessage` is already callable with a throwing `beforeSession` hook, so the tests reach the real seam.

**Tests** (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`):
1. `hands the same error and session to onError, and still rejects the caller with it`
2. `still runs afterSession, so a hook that released a resource in beforeSession is not skipped`

**Red bar**, from running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:

```
● ChatOrchestrator when beforeSession throws › hands the same error and session to onError, and still rejects the caller with it
    Expected  - 2
    + Received  + 2
      Object {
    -   "onErrorGotError": true,
    -   "onErrorGotSession": true,
    +   "onErrorGotError": false,
    +   "onErrorGotSession": false,
        "outcome": "span allocation failed",
      }

● ChatOrchestrator when beforeSession throws › still runs afterSession, so a hook that released a resource in beforeSession is not skipped
    - Expected  - 1
    + Received  + 1
      Object {
    -   "afterSessionCalled": true,
    +   "afterSessionCalled": false,
        "outcome": "span allocation failed",
      }

Tests:       2 failed, 2 total
```

The rejection already reaches the caller unchanged, so each failure is the missing `onError` or `afterSession` call and nothing else. The CI command for these tests is the Jest `test` script, `node --experimental-vm-modules node_modules/jest/bin/jest.js`, in the "Test" job of `.github/workflows/ci.yml`.

**Choices I made:**
- The ticket asks for one decision, whether `afterSession` should run after a failed `beforeSession`. I took its acceptance criterion as given: it does run. The spec must say that a hook cannot tell from `afterSession` alone whether the session started.
- `.lore/dod.md` is committed with the claim quoted, the strategy, the two tests, and the facets.
- I ran Prettier on the new test file and `dod.md`. I did not run the linter, typechecker, or full suite, as the instructions require.
- The amend added the Co-Authored-By line to the commit. I force-pushed with `--force-with-lease` to replace the first push, which lacked it. The branch is mine and had only that one new commit.

**Not done (implementation-round work):**
- Moving the `beforeSession` call inside the `try`.
- Replacing the flaw bullet in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and linking it to the tests. I did not add a `validated-by` link to the flaw line, since that line is being replaced.
- The CHANGELOG entry.
- Spec test-link stamping: I found no stamping mechanism in `scripts/lore-list-tests.mjs` to follow.

I did not use the `lore_*` tools.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}