Branch is up to date and pushed. Here's a summary of what was done:

**Strategy: `direct`** — the seam exists; `createChatOrchestrator` accepts an `onError` hook and the rejection path is reachable by supplying a provider whose `sendMessage` throws a non-Error value.

**New file: `src/orchestration/chatOrchestrator.acceptance.test.ts`** — 3 acceptance tests, all failing for the right reason:

```
● onError for non-Error rejections › calls onError with ... string, and rethrows unchanged
  - Expected: count: 1, isError: true, cause: "provider failure string"
  + Received: count: 0, isError: false, cause: undefined

● onError for non-Error rejections › calls onError with ... plain object, and rethrows unchanged
  - Expected: count: 1, isError: true, cause: {code: "PROVIDER_ERR"}
  + Received: count: 0, isError: false, cause: undefined

● onError for non-Error rejections › calls onError with ... undefined, and rethrows unchanged
  - Expected: count: 1, isError: true
  + Received: count: 0, isError: false
```

Each fails because `onError` is never called (`count: 0`) when it should be called once (`count: 1`) — directly caused by the `error instanceof Error` guard at `chatOrchestrator.ts:150`. The `actual` rejection value is correct in all cases (original value is rethrown), confirming the rethrow half works and only the `onError` call is missing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}