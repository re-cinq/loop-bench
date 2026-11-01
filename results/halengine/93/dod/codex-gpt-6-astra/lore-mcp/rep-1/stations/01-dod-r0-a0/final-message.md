Committed and pushed `28517f7` using `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`; no production code changed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failure excerpts:

```text
- "totalTokens": 85,
+ "totalTokens": 44,

- "totalTokens": 41,
+ "totalTokens": 28,

Tests:       2 failed, 2 total
```

Both failures demonstrate lost earlier-round usage. Existing tests remain untouched. Lore’s missing descriptor `spec` support is documented.

Branch is current with `origin/main`, pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}