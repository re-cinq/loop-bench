Perfect! I've successfully fixed the build issues. Here's a summary of what was done:

## Changes Made

Fixed the eslint errors in `src/orchestration/orchestratorHelpers.test.ts`:

1. **Added spec link comments** to all three `accumulateUsage` tests pointing to relevant spec statements in `specs/hal-engine-config-hooks/spec.md`:
   - Test for summing both operands defined → Line 18 of spec
   - Tests for handling undefined values → Line 19 of spec

2. **Split the problematic test** that had 2 expect calls into two separate tests:
   - "returns the defined side when accumulating undefined" (tests `accumulateUsage(undefined, usage)`)
   - "returns the defined side when next is undefined" (tests `accumulateUsage(usage, undefined)`)

This fixes all four linting errors that were preventing the build from passing:
- ✅ Missing spec links on 3 tests
- ✅ Test with 2 expect calls (max 1 per test)

The changes are minimal, focused, and directly address the CI failures identified in the red build.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added missing spec link comments to accumulateUsage tests and split test with multiple expect calls into separate tests"}}