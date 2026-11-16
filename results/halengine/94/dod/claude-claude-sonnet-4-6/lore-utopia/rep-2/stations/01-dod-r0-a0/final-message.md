Branch is up to date and pushed. Here's what landed:

**Strategy: `direct`** — The seam already exists. `createChatOrchestrator` accepts `OrchestratorHooks`, and `processMessage` is the callable entry point.

**Two failing acceptance tests** in `src/orchestration/beforeSession-error.acceptance.test.ts`:

**Actual failure output:**
```
● beforeSession error handling › onError fires when beforeSession throws

  - "receivedErrorMessage": "beforeSession failed",
  + "receivedErrorMessage": undefined,

● beforeSession error handling › afterSession fires when beforeSession throws

  - "afterSessionCalled": true,
  + "afterSessionCalled": false,
```

Both fail for exactly the reason the ticket states: `beforeSession` is awaited at line 91 of `chatOrchestrator.ts`, before the `try` block at line 93, so its error escapes before `catch` (which runs `onError`) and `finally` (which runs `afterSession`) exist.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}