Added and pushed commit `ca7be41`.

- Strategy: `direct`
- New red acceptance tests: `src/orchestration/usageReporting.acceptance.test.ts`
- Added `.lore/dod.md` and spec traceability.
- Existing no-tool usage test passes unchanged.
- Branch is pushed and up to date with `origin/main`.

Failure confirms current behavior:

```text
Expected inputTokens: 60, outputTokens: 6, totalTokens: 66
Received inputTokens: 30, outputTokens: 3, totalTokens: 33
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}