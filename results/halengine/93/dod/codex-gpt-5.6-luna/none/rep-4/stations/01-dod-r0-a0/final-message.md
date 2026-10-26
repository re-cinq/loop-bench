Added and pushed commit `ab18263`.

- Acceptance tests: [usageReporting.acceptance.test.ts](/var/tmp/loop-bench/runs/049a3d693625/workspace/target/src/orchestration/usageReporting.acceptance.test.ts)
- DoD: [.lore/dod.md](/var/tmp/loop-bench/runs/049a3d693625/workspace/target/.lore/dod.md)
- Strategy: `direct`
- Branch is up to date with upstream.

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/usageReporting.acceptance.test.ts
```

Both tests fail because the hook receives only the final round:

```text
Expected: { inputTokens: 34, outputTokens: 20, totalTokens: 54 }
Received: { inputTokens: 23, outputTokens: 13, totalTokens: 36 }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}