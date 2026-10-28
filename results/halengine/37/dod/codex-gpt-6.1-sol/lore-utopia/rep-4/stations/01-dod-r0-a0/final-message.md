Committed and pushed `fc9f258` using strategy `direct`. Added three acceptance tests, the validation spec, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures included:

```text
- "invalidCalls": 0,
+ "invalidCalls": 3,
- "compiledAtRegistration": true,
+ "compiledAtRegistration": false,
- "resolutions": 5,
+ "resolutions": 0,

Tests:       3 failed, 3 total
```

The provider retry-loop check remains a documented facet; no stub provider was introduced.

Merged `origin/main` successfully; the working tree is clean and the branch is fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}