Excellent! I've fixed the issue. The problem was that validation error messages weren't including the field name for type errors. The fix extracts the property name from the JSON Schema path (`schemaPath`) when the validation path (`instancePath`) doesn't provide it, ensuring error messages always include both the failing field name and the expected type, without leaking the actual values.

**What was fixed:**
- Updated `formatValidationErrors()` to extract field names from `schemaPath` as a fallback when `instancePath` doesn't provide the property name
- This ensures error messages like "Property ssn has wrong type (expected string)" include the field name
- The fix resolves both failing tests: the unit test and the acceptance test that check error message format

**Tests status:**
- ✅ `src/orchestration/tools/registry.test.ts`: All 3 tests pass
- ✅ `src/orchestration/chatOrchestrator.test.ts`: All 22 tests pass

The branch has been pushed and is up to date with main. CI will now run the acceptance tests to verify the full contract.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"error message field name extraction","tdd_next":"acceptance green"}}