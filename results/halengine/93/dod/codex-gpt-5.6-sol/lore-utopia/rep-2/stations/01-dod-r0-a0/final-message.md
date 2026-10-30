Implemented and pushed the `direct` acceptance contract in commit `188f1ad`.

- Added [chatOrchestratorUsage.acceptance.test.ts](/var/tmp/loop-bench/runs/bdd33ea74422/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts:59).
- Added [.lore/dod.md](/var/tmp/loop-bench/runs/bdd33ea74422/workspace/target/.lore/dod.md).
- Linked the acceptance test from the updated [hook specification](/var/tmp/loop-bench/runs/bdd33ea74422/workspace/target/specs/hal-engine-config-hooks/spec.md:28).
- Branch is synchronized with `origin/main` and its upstream.

Executed only:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts
```

Expected failure:

```text
FAIL src/orchestration/chatOrchestratorUsage.acceptance.test.ts

Expected everyRound: {inputTokens: 71, outputTokens: 10, totalTokens: 81}
Received everyRound: {inputTokens: 37, outputTokens: 5, totalTokens: 42}

Expected someRounds: {inputTokens: 48, outputTokens: 7, totalTokens: 55}
Received someRounds: {inputTokens: 37, outputTokens: 5, totalTokens: 42}

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}