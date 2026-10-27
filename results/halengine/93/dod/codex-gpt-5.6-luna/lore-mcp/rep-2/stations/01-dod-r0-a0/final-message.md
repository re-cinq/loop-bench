Added and pushed commit `1e69d6b`.

- Strategy: `direct`
- Added two failing acceptance tests in `usageReporting.acceptance.test.ts`.
- Added `.lore/dod.md` and spec traceability link.
- Existing no-tool test remains unedited.
- Branch is synchronized with upstream.

Failure excerpt:

```text
Expected: { inputTokens: 60, outputTokens: 9, totalTokens: 69 }
Received: { inputTokens: 30, outputTokens: 4, totalTokens: 34 }

Test Suites: 1 failed, Tests: 2 failed
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}