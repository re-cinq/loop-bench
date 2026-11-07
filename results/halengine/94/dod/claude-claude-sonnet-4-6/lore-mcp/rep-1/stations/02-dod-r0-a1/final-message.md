The branch is already clean and up to date. A previous round already committed both the acceptance tests and the `.lore/dod.md`. Everything is in order.

**Summary:**

The acceptance tests for ticket #94 are already written, committed, and failing for the right reason on branch `loop-bench/94` (commit `032b536`).

**Tests (both failing):**

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● when beforeSession throws › onError fires with the thrown error when beforeSession throws
    Expected: [Error: beforeSession failed]
    Received: undefined

  ● when beforeSession throws › afterSession fires even when beforeSession throws
    Expected: true
    Received: false
```

Both fail because `beforeSession` is called on line 91 of `chatOrchestrator.ts` **before** the `try` block opens (line 93), so a throw escapes before `catch`/`finally` exist — exactly the bug the ticket reports.

**Strategy: `direct`** — `createChatOrchestrator` accepts `OrchestratorHooks` directly, so the tests call it with a throwing `beforeSession` and observe whether `onError` and `afterSession` subsequently fire.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}