Defined and pushed the ticket’s red acceptance contract using strategy `direct`.

- Added [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/319ccf698723/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts:12).
- Added [.lore/dod.md](/var/tmp/loop-bench/runs/319ccf698723/workspace/target/.lore/dod.md).
- Linked the normative guarantee in [spec.md](/var/tmp/loop-bench/runs/319ccf698723/workspace/target/specs/hal-engine-config-hooks/spec.md:22).
- Committed as `fb8cbe3` and pushed. Branch is synchronized with upstream.

Executed only:

```text
npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts
```

Expected red-bar output:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
● rejects unchanged and runs error and cleanup hooks when beforeSession throws

- Expected calls: onError, afterSession
+ Received calls: []

"sameRejection": true

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The unchanged rejection already passes; the test fails specifically because neither required hook runs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}