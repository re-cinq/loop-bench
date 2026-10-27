Added the acceptance test in [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/2a508143a8cb/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts) and recorded the direct strategy in [.lore/dod.md](/var/tmp/loop-bench/runs/2a508143a8cb/workspace/target/.lore/dod.md). It fails for the ticket’s stated behavior: the original rejection reaches the caller, but neither hook runs.

The test output was:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● beforeSession failures › rejects with the original error and runs onError and afterSession for the session

    expect(received).toEqual(expected) // deep equality

    - Expected  - 29
    + Received  +  3

      Object {
    +   "afterSessionArgument": undefined,
    +   "events": Array [],
    +   "onErrorArguments": undefined,
        "receivedError": [Error: before session failed],
      }
```

Committed as `ccee3a5` and pushed to `origin/loop-bench/94`. `origin/main` was already merged, and the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}