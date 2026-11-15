Perfect! The acceptance tests are now in place and failing for the right reasons. Let me provide a summary of what was created:

## Summary

I've written comprehensive acceptance tests for ticket #37 (Validate tool input against the registered inputSchema) according to the definition of done. The tests define what "DONE" means by verifying the specific behavior required:

### Test Files Created

**`src/orchestration/tools/registry.acceptance.test.ts`** — New test file with 9 acceptance tests covering:

1. **Rejects input missing a required field** — Executor is never invoked; error describes the failure
2. **Passes extra properties unchanged** — Undeclared fields are passed through without coercion
3. **Rejects wrong-typed fields** — Error names the field and expected type, never the value
4. **Throws on uncompilable schema** — Invalid schemas throw at registration time with tool name
5. **Validates function-valued schemas per call** — Uses current schema, not cached
6. **Validates static schemas consistently** — Same behavior across 10 calls
7. **Redacts identifying data** — Error messages name fields, not values
8. **Throws for unknown tool** — Unchanged existing behavior
9. **Rejects enum violations** — Field name in error, not the value

**`src/orchestration/chatOrchestrator.test.ts`** — Added test for tool-loop scenario:
- Verifies orchestrator handles rejected tool calls and retries within the tool-round budget

**`.lore/dod.md`** — Definition of Done document specifying:
- Central claim about validating input against inputSchema
- Strategy: `direct` (seam exists at `ToolRegistry.execute`)
- 10 specific acceptance tests and their locations
- Facets for implementation steps
- Out-of-scope items

### Test Failures (Expected)

All tests fail for the right reasons because validation is not yet implemented:

```
Test Suites: 1 failed, 1 total
Tests:       7 failed, 2 passed, 9 total
```

**Failed tests** all fail because the current implementation does not validate input — it calls the executor regardless of validation status. Once the feature is implemented using ajv validation, all tests will pass.

**Passing tests** are the ones that don't require validation to be blocked (e.g., "passes extra properties through" passes because it just checks the executor gets called with the same input).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}