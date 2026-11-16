Branch is pushed and up to date. Here's the actual failure output from running the 4 acceptance tests:

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › returns a ToolResponse naming the missing required field and never calls the executor
    Expected: { callCount: 0, mentionsLocation: true }
    Received: { callCount: 1, mentionsLocation: false }
    → executor was called (callCount 1, not 0); result is "sunny", not a rejection

  ● ToolRegistry input validation › rejects a wrong-typed field, naming the path and expected type, without the offending value
    Expected: { callCount: 0, mentionsString: true, containsValue: false }
    Received: { callCount: 1, mentionsString: false, containsValue: false }
    → executor was called with the wrong-typed input; result "sunny" doesn't mention "string"

  ● ToolRegistry input validation › throws at register time for a schema that cannot be compiled, naming the tool
    Expected pattern: /broken/
    Received function did not throw
    → register() silently accepts any schema today

  ● ChatOrchestrator tool loop with schema rejection › resolves processMessage when a tool call is rejected, with the rejection text visible to the provider
    Expected: { result: "done", rejectionMentionsLocation: true }
    Received: { result: "done", rejectionMentionsLocation: false }
    → tool result was "sunny" (executor ran), not a rejection mentioning "location"

Tests: 4 failed, 4 total
```

**Strategy: `direct`** — `ToolRegistry.execute` is the seam; the tests call it and the orchestrator directly. All 4 tests fail because schema validation is absent, not because of a missing import or fixture.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}