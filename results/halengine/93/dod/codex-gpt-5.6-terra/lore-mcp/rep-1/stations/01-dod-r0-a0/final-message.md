Added and pushed red acceptance coverage in commit `f0e4230`.

- New test: `chatOrchestrator.usage.acceptance.test.ts`
- Updated the hook spec with its validation link.
- Added `.lore/dod.md` using `direct` strategy.
- Targeted test run only: `npm test -- src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

Actual failure:

```text
Expected: {"inputTokens": 9, "outputTokens": 14, "totalTokens": 23}
Received: {"inputTokens": 7, "outputTokens": 11, "totalTokens": 18}
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}