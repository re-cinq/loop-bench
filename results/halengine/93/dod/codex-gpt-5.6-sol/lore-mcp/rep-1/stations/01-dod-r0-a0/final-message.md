Defined and pushed the ticket’s acceptance contract using the `direct` strategy.

- Added one focused acceptance test in `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`.
- Added `.lore/dod.md`.
- Linked the test from the hooks spec.
- Commit: `0b81829`
- Branch is synchronized with its upstream and `origin/main`.

Command run:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts
```

Actual failure:

```text
Expected:
  {"inputTokens": 40, "outputTokens": 6, "totalTokens": 46}
Received:
  {"inputTokens": 30, "outputTokens": 4, "totalTokens": 34}

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The hook receives only the final provider call’s usage instead of the accumulated turn usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}