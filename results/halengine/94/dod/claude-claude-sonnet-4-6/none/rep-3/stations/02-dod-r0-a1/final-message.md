Everything is already done and pushed. The acceptance tests from commit `626a5b9` are:

**Test 1: `onError fires when beforeSession throws`**
- Fails because `beforeSession` is awaited on line 91 of `chatOrchestrator.ts` *before* the `try` block, so the error escapes to the caller without passing through `catch`. `onError` never fires → `errorMessage` is `undefined`.

**Test 2: `afterSession fires when beforeSession throws`**
- Fails for the same structural reason — the throw bypasses `finally` entirely, so `afterSession` never fires → `afterSessionCalled` remains `false`.

Actual failure output:
```
● onError fires when beforeSession throws
  - "errorMessage": "before-session-exploded",
  + "errorMessage": undefined,

● afterSession fires when beforeSession throws
  - "afterSessionCalled": true,
  + "afterSessionCalled": false,
```

The branch is up to date with `origin/loop-bench/94` — all three files (`.lore/dod.md`, `specs/hal-engine-config-hooks/spec.md`, `src/orchestration/chatOrchestrator.acceptance.test.ts`) are already committed and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}