## Summary

I have successfully defined DONE for ticket #37 as executable acceptance tests that fail for the right reasons. Here's what was delivered:

### Files Created/Updated

1. **`src/orchestration/tools/registry.acceptance.test.ts`** (250 lines)
   - 9 comprehensive acceptance tests covering input schema validation
   - Tests verify: required fields, type checking, enum validation, data privacy, static schema compilation, function-valued schema re-evaluation, and unknown tool handling

2. **`.lore/dod.md`** 
   - Definition of done with "direct" strategy (the seam exists in `ToolRegistry.execute`)
   - Lists 9 test acceptance criteria
   - Outlines 8 implementation facets
   - Clearly scopes out-of-scope work

3. **`src/orchestration/chatOrchestrator.test.ts`** (updated)
   - Added tool-loop test verifying rejected input followed by retry

### Test Results

**6 tests failing (the ones requiring implementation):**

1. **rejects input missing a required field** — Executor called when it should not be (callCount = 1, expected 0), result doesn't contain field name 'location'

2. **rejects wrong-typed field** — Type mismatch not detected, result is 'executed' instead of containing 'count' and 'number'

3. **does not include property values** — No validation, result is 'executed' instead of containing field name 'apiKey' (and NOT containing secret value)

4. **function schema re-validated per call** — Schema change not detected, result is 'executed with text' instead of containing 'number'

5. **rejects invalid enum value** — Enum violation not caught, result is 'executed' instead of containing 'units'

6. **throws at register time** — Uncompilable schema accepted instead of throwing

**3 tests passing** — tests for executor being called and unknown tool names staying unchanged.

All failures occur **because the validation feature is not yet implemented**, which is exactly what we need. The tests define the complete behavior to be built.

```
Test Suites: 1 failed, 1 total
Tests:       6 failed, 3 passed, 9 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}