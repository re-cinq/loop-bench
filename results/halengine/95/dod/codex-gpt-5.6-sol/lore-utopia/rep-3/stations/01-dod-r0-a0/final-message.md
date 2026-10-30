Defined and pushed the `direct` acceptance contract in commit `8cc5f97`.

Added:

- Dedicated acceptance test covering string, plain-object, and `undefined` rejections.
- `.lore/dod.md` with scope, facets, and central claim.
- Spec guarantee linked to the acceptance test.

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

Expected red-bar output:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts

Expected:
"hookCallCount": 1
"hookReceivedError": true

Received:
"hookCallCount": 0
"hookReceivedError": false

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The assertions also confirm every original rejection still reaches the caller unchanged. The branch is current with `origin/main`, pushed, and `0` commits ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}