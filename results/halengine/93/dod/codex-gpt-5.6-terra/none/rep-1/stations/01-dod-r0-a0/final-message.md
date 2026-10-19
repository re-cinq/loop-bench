Added and pushed red acceptance coverage in commit `f4ba18f`.

- New test: [chatOrchestratorUsage.acceptance.test.ts](/var/tmp/loop-bench/runs/28cacb25eef5/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts)
- DoD: [dod.md](/var/tmp/loop-bench/runs/28cacb25eef5/workspace/target/.lore/dod.md)
- Updated spec anchor: [spec.md](/var/tmp/loop-bench/runs/28cacb25eef5/workspace/target/specs/hal-engine-config-hooks/spec.md)

Ran only:

```text
npm test -- src/orchestration/chatOrchestratorUsage.acceptance.test.ts
```

Actual red failure:

```text
Expected: {"inputTokens": 71, "outputTokens": 10, "totalTokens": 81}
Received: {"inputTokens": 37, "outputTokens": 5, "totalTokens": 42}
```

The second test also fails correctly: expected reported-round total `9/5/14`, received only final reported usage `7/4/11`. Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}