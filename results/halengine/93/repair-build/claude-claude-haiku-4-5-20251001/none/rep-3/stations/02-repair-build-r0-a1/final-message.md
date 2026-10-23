Perfect! I've successfully fixed the CI build. Here's what I did:

## Summary of Changes

The CI build was failing with eslint errors about missing spec links and too many expect calls in tests. I made the following fixes:

### 1. **Added spec links to tests** (`src/orchestration/orchestratorHelpers.test.ts`)
   - Added `([validated by](specs/hal-engine-config-hooks/spec.md#L23))` to the "sums token fields" test
   - Added `([validated by](specs/hal-engine-config-hooks/spec.md#L24))` to two separate tests for the "one operand undefined" case
   - Added `([validated by](specs/hal-engine-config-hooks/spec.md#L25))` to the "both undefined" test

### 2. **Split the multi-case test**
   - The test "returns the defined side when one operand is undefined" was checking both the (undefined, value) and (value, undefined) cases
   - Split it into two separate, focused tests:
     - "returns the first when the second operand is undefined"
     - "returns the second when the first operand is undefined"
   - This satisfied the `re-lint/max-expects` rule (max 1 expect per test)

### 3. **Updated spec file** (`specs/hal-engine-config-hooks/spec.md`)
   - Updated line 24 to reference both new test lines
   - Updated line 25 to reference the new line number for the "both undefined" test

All tests pass (8 tests in total), and the changes are committed and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added spec links to usage accumulation tests and split multi-case test to satisfy eslint rules"}}