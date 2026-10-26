Perfect! I've completed this round of work. Here's a summary of what was done:

## Summary

This round focused on fixing CI failures from the previous round and documenting the behavior change in the spec and changelog.

### Changes Made:

1. **Fixed CI Errors:**
   - **eslint**: Fixed by moving the `beforeSession` guarantee statement from "Measured semantics — out of scope" to the main spec section, and adding proper validation links for both the unit test (at line 116) and acceptance test (at line 34)
   - **spec-names**: Fixed line number references in validation links (line 194 → 213 for "replaces system prompt")

2. **Updated `specs/hal-engine-config-hooks/spec.md`:**
   - Moved the `beforeSession` behavior from "out of scope" to a documented guarantee
   - Documented that when `beforeSession` throws, both `onError` and `afterSession` fire
   - Added validation links for both the acceptance test and the unit test

3. **Updated `CHANGELOG.md`:**
   - Added entry documenting that `beforeSession` is now called inside the `try` block
   - Explained that `onError` and `afterSession` now fire on `beforeSession` throws
   - Noted the benefit: deployers won't leak resources allocated in `beforeSession`

4. **Updated `.lore/dod.md`:**
   - Marked all facets as complete

The acceptance test "runs onError and afterSession when beforeSession throws" validates that the feature works correctly. All changes have been committed and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec and changelog updated","tdd_next":"acceptance green"}}