Defined and pushed a direct acceptance test for ticket #94.

The test confirms the original error still rejects the caller while requiring `onError` and then `afterSession` to receive the same session/error context. The spec now states that `afterSession` cannot assume `beforeSession` completed.

Red-bar output:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts

- Expected events: onError, afterSession
+ Received events: []

"rejection": [Error: beforeSession failed]
```

Command run:

```bash
npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts --runInBand
```

Committed as `1ce5900` and pushed. The branch is current with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}