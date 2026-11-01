Committed and pushed `622fb68` using `direct`. Added three acceptance tests, spec links, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures include:

```text
- "rejectedCalls": 0,
+ "rejectedCalls": 3,
- "compiledAtRegistration": true,
+ "compiledAtRegistration": false,
- "currentRequired": true,
+ "currentRequired": false,

Tests:       3 failed, 3 total
```

The stub-provider retry test remains an explicit handoff item because this task prohibits stubs. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}