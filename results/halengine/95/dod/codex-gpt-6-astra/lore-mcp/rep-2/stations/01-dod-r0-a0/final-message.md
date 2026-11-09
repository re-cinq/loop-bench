Committed and pushed `966e6ac` using `direct`. Added one acceptance test, spec linkage, and `.lore/dod.md`; no production changes. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure for all three non-Error values:

```diff
- "hookCalls": 1,
+ "hookCalls": 0,
  "originalRejection": true,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The test exercises the shared catch through a real lifecycle callback, without provider doubles.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}