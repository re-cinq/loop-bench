I wrote two acceptance tests for #94, ran them, and both fail for the reason the ticket gives. The commit is pushed to `loop-bench/94`, and the branch is level with its upstream and with `origin/main`, so no merge was needed.

**Strategy: `direct`.** `processMessage` is the real entry point, and a throwing `beforeSession` is reachable through `OrchestratorHooks`, so no seam is missing.

**Files**
- `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts` (new): two tests.
  1. Runs `onError` with the same session and the same thrown `Error` instance, and the caller still gets the rejection.
  2. Runs `afterSession` after `onError`, giving the order `beforeSession`, `onError`, `afterSession`.
- `.lore/dod.md` (new): the claim quoted verbatim, the strategy, the two tests, the facets, and the out-of-scope list.

**Red output** (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`):

```
● runs onError with the same session and error, and the caller still gets the rejection
    - Expected
    + Received
      Object {
        "outcome": "allocation failed",
    -   "sameError": true,
    -   "sameSession": true,
    +   "sameError": false,
    +   "sameSession": false,
      }

● runs afterSession after onError, so a deployer can release what beforeSession allocated
    - Expected
    + Received
      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "allocation failed",
      }

Tests: 2 failed, 2 total
```

The rejection already reaches the caller with the same message, so the first test fails only on `onError`. Both failures are the missing hook calls, not a broken import or fixture.

**Choices I made**
- The ticket's "decide whether `afterSession` runs after a failed `beforeSession`" is answered as yes, since the acceptance criteria require it to fire. The tests pin that. The spec wording of what a hook can assume is left to the implementing round.
- I did not stamp a spec anchor. No spec statement exists yet for the new guarantee, so there is nothing for the `validated by` link to point at. The implementing round should add it when it writes the spec line.
- The Jest run needs `--experimental-vm-modules`, as the repo's `npm test` script sets. Without it, Jest refuses the ESM file.
- I ran Prettier on the two files and did not run lint, typecheck, or the build.

The branch is pushed and the tests are committed. The file ends with the result line below.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}