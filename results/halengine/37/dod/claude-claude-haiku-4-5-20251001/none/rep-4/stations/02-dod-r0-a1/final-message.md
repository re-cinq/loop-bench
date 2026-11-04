Perfect! All acceptance tests are now complete and committed. Here's the final summary:

## Definition of Done Complete

I've written comprehensive acceptance tests that define exactly what needs to be implemented for ticket #37. The tests are failing as expected because the validation feature hasn't been implemented yet.

### Test Coverage

**Created `src/orchestration/tools/registry.acceptance.test.ts`** with 9 tests:

1. **rejects input missing a required field and returns ToolResponse without calling executor** — FAILING ✗
2. **passes valid input with all required fields through to executor unchanged** — PASSING ✓
3. **passes through extra properties that are not in the schema** — PASSING ✓
4. **rejects wrong-typed field with message naming field and type, not the value** — FAILING ✗
5. **throws at registration time for an uncompilable schema** — FAILING ✗
6. **validates function-valued tool definitions against the schema at call time** — FAILING ✗
7. **compiles a static tool schema once across multiple execute calls** — PASSING ✓
8. **still throws Unknown tool for unregistered tool name** — PASSING ✓
9. **does not include field values in rejection messages for security** — FAILING ✗

**Updated `src/orchestration/chatOrchestrator.test.ts`**:
- Added spec citation to integration test: **returns a validation rejection to the model and retries with corrected input** — PASSING ✓

### Spec and Citations

Created `specs/hal-engine-tool-input-validation/spec.md` with testable statements. Every test includes a spec citation comment like:
```
// ([validated by tool-input-validation-rejects-missing-required](specs/hal-engine-tool-input-validation/spec.md#L14))
```

### Current Test Results

```
Test Suites: 1 failed, 1 total
Tests:       5 failed, 4 passed, 9 total
```

The 5 failing tests validate the validation logic that needs to be implemented. The 4 passing tests use valid input and verify existing behavior is preserved. When the validation feature is implemented in `ToolRegistry.execute`, all tests will pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}