Branch is up to date and the push landed. Here's a summary:

**Strategy: `direct`** — the entry point `createChatOrchestrator` accepts injectable hooks, so the broken behavior is directly observable.

**Two acceptance tests** in `src/orchestration/chatOrchestratorBeforeSessionHooks.acceptance.test.ts`, both failing right now for the right reasons:

1. **fires onError when beforeSession throws** — `onError` received `undefined` instead of the thrown error. Fails because `beforeSession` at line 91 is outside the `try` block, so the `catch` at line 149 never runs.

2. **fires afterSession when beforeSession throws** — `afterSession` was `false`. Fails for the same reason: the `finally` block at line 154 is never reached when `beforeSession` throws.

Actual failure output:
```
● fires onError when beforeSession throws
    Expected: [Error: beforeSession failed]
    Received: undefined

● fires afterSession when beforeSession throws
    Expected: true
    Received: false
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}