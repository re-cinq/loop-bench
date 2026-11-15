## Summary

This round fixed all spec link validation errors that were blocking the CI build. The previous round had implemented the core feature (coerceToError function) and acceptance tests for issue #95, but left linter errors related to missing/incorrect test validation links in the spec files.

**Changes made:**
- Updated `specs/hal-engine-architecture/spec.md`: Corrected test line references for 11 tests to match their current locations in the moved test file
- Updated `specs/hal-engine-config-hooks/spec.md`: Added the coerceToError test link and fixed acceptance test line references  
- Updated `specs/hal-engine-tool-input-validation/spec.md`: Corrected test line reference

All tests now have correct validated-by links pointing from the spec statements to their test implementations. The eslint `require-spec-link` checks now pass with zero warnings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"linter spec-link fixes","tdd_next":"acceptance green"}}