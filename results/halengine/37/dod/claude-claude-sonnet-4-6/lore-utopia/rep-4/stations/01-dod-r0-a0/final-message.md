Branch is pushed and up to date. The red bar is confirmed.

---

**Strategy: `direct`** — `ToolRegistry.execute` exists as a callable seam; the tests call it directly and assert on the absence of validation behaviour that isn't implemented yet.

**Actual failure output:**

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● returns ToolResponse naming the missing required field, executor not called
    Expected: {executorCalled: false, namesField: true}
    Received: {executorCalled: true, namesField: false}
    → executor IS called today (no validation guard)

  ● rejects a wrong-typed field naming its path and type without exposing the offending value in result or logs
    Expected: {namesField: true, namesType: true, valueInResult: false, valueInLogs: false}
    Received: {namesField: false, namesType: false, ...}
    → executor IS called, no rejection message produced

  ● throws at registration time for an uncompilable schema, naming the tool
    Expected: .toThrow('broken-tool')
    Received: function did not throw
    → register() does no schema compilation today

  ● validates against the current schema per execute call for function-valued definitions
    Expected: {executorCallCount: 1, secondRejected: true}
    Received: {executorCallCount: 2, secondRejected: false}
    → both calls reach the executor; no per-call validation

FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● resolves processMessage when a tool call fails validation and the rejection text reaches the provider on retry
    Expected: {finalText: 'done', rejectionMentionsQuery: true}
    Received: {finalText: 'done', rejectionMentionsQuery: false}
    → executor called with {} (missing 'query'), returns 'found it'; provider sees that, not a validation error
```

**Tests run:**
```
node --experimental-vm-modules node_modules/jest/bin/jest.js \
  src/orchestration/tools/registry.acceptance.test.ts \
  src/orchestration/chatOrchestrator.acceptance.test.ts --no-coverage
```

5 tests, 5 failed, 0 passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}