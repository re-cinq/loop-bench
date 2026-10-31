Added and pushed commit `a192b9b`.

- New red acceptance test: `src/orchestration/onErrorNonError.acceptance.test.ts`
- Updated the hook spec citation and `.lore/dod.md`.
- Ran only `npm test -- src/orchestration/onErrorNonError.acceptance.test.ts`.

Actual failure:

```text
Expected onErrorCalls: 1
Received onErrorCalls: 0
```

This occurs for string, plain-object, and `undefined` rejections, while `callerReceivedOriginal` remains `true`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}