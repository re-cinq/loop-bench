Branch is pushed and up to date. Here's a summary:

---

**Strategy: `direct`** — the seam already exists (`createChatOrchestrator` → `processMessage`).

**Two acceptance tests** in `src/orchestration/beforeSession-error.acceptance.test.ts`, both red for the right reason:

```
FAIL src/orchestration/beforeSession-error.acceptance.test.ts
  ● beforeSession throws — HALEngine#94 › onError fires when beforeSession throws
    Expected: [Error: beforeSession failed]
    Received: undefined

  ● beforeSession throws — HALEngine#94 › afterSession fires when beforeSession throws
    Expected: true
    Received: false

Tests: 2 failed, 2 total
```

Both fail because `beforeSession` is called at line 91 of `chatOrchestrator.ts`, **before** the `try` block at line 93, so neither the `catch` (which calls `onError`) nor the `finally` (which calls `afterSession`) is reachable. That is exactly what the ticket reports.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}