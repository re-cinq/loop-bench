The acceptance tests are committed and pushed to `loop-bench/94`, and the branch is not ahead of its upstream. Both tests fail, and they fail on the missing behaviour, not on setup.

Strategy: `direct`. `createChatOrchestrator` and `processMessage` are already the real entry points, so no seam is needed.

Quoted failure output, from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
● a beforeSession that throws › reaches onError with the thrown Error for the same session, and the caller still gets that rejection

    - Expected  - 6
    + Received  + 1

      Object {
    -   "onError": Array [
    -     Object {
    -       "message": "span allocation failed",
    -       "sameSession": true,
    -     },
    -   ],
    +   "onError": Array [],
        "outcome": "span allocation failed",
      }

● a beforeSession that throws › still runs afterSession, so a hook that releases what beforeSession allocated is not skipped

    - Expected  - 1
    + Received  + 1

      Object {
    -   "afterSessionCalled": true,
    +   "afterSessionCalled": false,
        "outcome": "span allocation failed",
      }

Tests:       2 failed, 2 total
```

The caller's rejection already matches today, so that part of the ticket is not a red test on its own; it is folded into the `onError` test. Both failures trace to the claim quoted in `.lore/dod.md`: the `beforeSession` throw escapes before `catch` and `finally`.

Files:
- `src/orchestration/chatOrchestrator.acceptance.test.ts` (new, two tests, Jest globals to match the repo's existing tests).
- `.lore/dod.md` (quotes the ticket's claim, names the strategy, lists the tests and facets).

Choices I made that you may want to check:
- **Decision on `afterSession`:** it runs after a failed `beforeSession`. That is what the ticket's leak scenario needs, since a deployer releases the allocation there. The spec should say the hook can't tell from `session` alone whether the turn started. The implementation round must record this in the spec.
- **Spec link:** I did not add a `validated by` parenthetical. The new guarantee statement does not exist in the spec yet, and the ticket's spec edit belongs to the implementation round.
- **Runner:** the repo is Jest, not Vitest. The Lore runner is `hal-engine-jest`, and the CI job is the `Test` step in `.github/workflows/ci.yml`.

I did not run prettier on `dod.md`, since the repo formats only `src`, `scripts` and `smoke` `.ts` files. The merge with `origin/main` produced no changes to push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}