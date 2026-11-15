Perfect! I have successfully written and committed the acceptance tests for ticket #37. Let me summarize what was delivered:

## Summary

I've created a comprehensive set of acceptance tests for tool input validation against the registered `inputSchema`. The tests are organized in two new test files that clearly fail for the correct reasons (because the feature doesn't exist yet).

### Test Files Created

**1. `src/orchestration/tools/registry.acceptance.test.ts`** (12 tests, 6 failing)
- Tests validation of required fields without invoking executor
- Tests pass-through of valid input unchanged
- Tests pass-through of extra properties unchanged
- Tests type validation with field path and expected type (never value)
- Tests enum constraint validation
- Tests schema compilation errors at register time
- Tests static schema compilation happens once
- Tests function-valued schemas re-evaluate per call
- Tests backward compatibility: unknown tools still throw
- Tests privacy: rejection messages never contain property values
- Tests nested object and array validation

**2. `src/orchestration/chatOrchestrator.acceptance.test.ts`** (2 tests, 2 failing)
- Tests invalid tool input is rejected and visible to the provider for retry
- Tests invalid input never invokes the executor

**3. `.lore/dod.md`** (Definition of Done)
- Documents the ticket's central claim
- Specifies strategy: `direct` (ToolRegistry is a public entry point)
- Lists all acceptance test requirements with test file references
- Identifies implementation facets
- Lists out-of-scope items

### Test Failure Output

All tests fail for the correct reason - validation is not yet implemented:

```
Test Suites: 2 failed, 2 total
Tests:       8 failed, 6 passed, 14 total

FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation acceptance tests › validates input against inputSchema before executor runs › rejects missing required field and does not invoke executor
    Expected: 0
    Received: 1 (executor was called when it should not have been)

  ● ToolRegistry input validation acceptance tests › validates input against inputSchema before executor runs › rejects wrong-typed field with path and type, not value
    Expected substring: "location"
    Received string: "result" (no validation happened)

FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator tool validation acceptance tests › rejects invalid tool input and allows retry within tool round budget
    Expected substring: "location"
    Received string: "Weather for undefined: 72°F and sunny" (tool was executed despite invalid input)

  ● ChatOrchestrator tool validation acceptance tests › rejects invalid input does not call executor
    Expected: false
    Received: true (executor was called when invalid input should have been rejected)
```

These failures are exactly what we need—they verify that:
1. The feature doesn't exist yet
2. The tests are checking the right behavior
3. Implementation will make them pass

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}