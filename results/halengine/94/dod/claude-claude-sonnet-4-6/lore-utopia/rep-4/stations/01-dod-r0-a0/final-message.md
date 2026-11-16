Branch is current and clean. Here's a summary of what was done and the actual test failure output:

---

**Strategy: `direct`** — `createChatOrchestrator` accepts an `OrchestratorHooks` argument today; the tests call it directly.

**Actual failure output:**

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession throws › onError fires when beforeSession throws

    expect(received).toBe(expected)
    Expected: [Error: before session failed]
    Received: undefined

  ● beforeSession throws › afterSession fires when beforeSession throws

    expect(received).toBe(expected)
    Expected: true
    Received: false

Tests: 2 failed, 2 total
```

Both tests fail because `beforeSession` is currently awaited at line 91, **before** the `try` block at line 93. When it throws, neither the `catch` (which calls `onError`) nor the `finally` (which calls `afterSession`) is ever entered.

**Files committed:**
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — 2 acceptance tests
- `specs/hal-engine-config-hooks/spec.md` — new `## beforeSession failure guarantees` section with spec statements and validated-by citations at L32 and L50
- `.lore/dod.md` — strategy, test list, facets, out-of-scope

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}