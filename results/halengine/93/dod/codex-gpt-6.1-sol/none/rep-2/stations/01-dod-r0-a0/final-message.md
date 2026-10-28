Committed and pushed `72ed4cd` using `direct`.

Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed. Ran only the new test file; it fails on usage under-counting:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
- "totalTokens": 85,
+ "totalTokens": 44,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Merged `origin/main`: already up to date. Working tree is clean and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}