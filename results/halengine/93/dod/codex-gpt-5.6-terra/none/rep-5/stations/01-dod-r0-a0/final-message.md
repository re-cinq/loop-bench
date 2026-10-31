Added and pushed red acceptance coverage in commit `e100c06`.

- New test: [chatOrchestratorUsage.acceptance.test.ts](/var/tmp/loop-bench/runs/c3bbeafc5389/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts:37)
- DoD: [.lore/dod.md](/var/tmp/loop-bench/runs/c3bbeafc5389/workspace/target/.lore/dod.md)
- Updated the cited spec behavior, without changing its status.

Ran only:

```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts
```

Actual red failure:

```text
Expected: {"inputTokens": 10, "outputTokens": 13, "totalTokens": 23}
Received: {"inputTokens": 7, "outputTokens": 11, "totalTokens": 18}
```

Branch is pushed and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}