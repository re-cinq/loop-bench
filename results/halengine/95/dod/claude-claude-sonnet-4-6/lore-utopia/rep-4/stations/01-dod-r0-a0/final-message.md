Branch is up to date and pushed. Here's a summary of what was done:

**Strategy: `direct`** — the seam exists (`createChatOrchestrator` with `hooks.onError`) and the bug is in the `instanceof Error` guard at `chatOrchestrator.ts:L150`.

**Three acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts`, each using a provider that throws a non-Error value:

1. **String rejection** — `onErrorCalled: false, isError: false` (expected `true, true`) — `onError` is silently skipped
2. **Plain object rejection** — same failure pattern
3. **Undefined rejection** — same failure pattern

**Actual failure output (representative):**
```
● onError for non-Error rejections › calls onError with an Error whose cause is the string when the provider rejects with a string

  - "cause": "something went wrong",
  - "isError": true,
  - "onErrorCalled": true,
  + "cause": undefined,
  + "isError": false,
  + "onErrorCalled": false,
```

The failures are exactly because `error instanceof Error` is `false` for string/object/undefined, so `onError` is never called — the ticket's stated bug.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}