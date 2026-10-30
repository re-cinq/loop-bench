Defined and pushed the ticket’s executable DoD using strategy `direct`.

- Added [nonErrorRejection.acceptance.test.ts](/var/tmp/loop-bench/runs/7120fe87e83f/workspace/target/src/orchestration/nonErrorRejection.acceptance.test.ts:27).
- Added [.lore/dod.md](/var/tmp/loop-bench/runs/7120fe87e83f/workspace/target/.lore/dod.md).
- Replaced the spec’s recorded flaw with the linked guarantee.
- Committed as `7a9d964` and pushed.
- Branch is current with `origin/main` and its upstream.

Test command:

```text
npm test -- --runTestsByPath src/orchestration/nonErrorRejection.acceptance.test.ts --runInBand
```

Expected red-bar output:

```text
FAIL src/orchestration/nonErrorRejection.acceptance.test.ts

- "causeIsOriginal": true,
- "hookCallCount": 1,
- "hookReceivedError": true,
+ "causeIsOriginal": false,
+ "hookCallCount": 0,
+ "hookReceivedError": false,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The caller already receives the original rejection unchanged; the failure specifically shows that `onError` is skipped for the non-`Error` rejection.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}