Added and pushed the direct acceptance tests and spec in commit `5b06e24`. The branch is up to date with its upstream; `origin/main` was already merged.

The only test run was `src/orchestration/tools/registry.acceptance.test.ts`. It failed for the reported missing validation behavior:

```text
Expected pattern: /location/i
Received string:  "executed"

Expected pattern: /second/i
Received string:  "executed"

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 passed, 4 total
```

The two passing cases confirm valid extra properties pass through and unknown tool errors remain unchanged. No production code was changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}