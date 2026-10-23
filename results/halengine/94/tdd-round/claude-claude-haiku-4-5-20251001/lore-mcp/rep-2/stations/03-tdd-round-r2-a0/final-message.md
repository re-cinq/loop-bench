## Summary

I've completed Phase 1 (RED) and Phase 2 (GREEN) of the TDD loop:

### What was broken
The previous round moved `beforeSession` inside the `try` block and updated the spec, but the acceptance test had eslint errors:
1. Test had 2 expect calls (max 1 allowed per test)
2. Tests lacked spec validation links
3. Other tests in the suite also needed spec links
4. Tool-responses spec status was "Draft" but only 1 of 57 statements had validation links

### What I fixed
1. **Split the acceptance test** into two separate tests:
   - "rejects when beforeSession throws" - validates the rejection propagates to caller
   - "validates hooks fire when beforeSession throws" - validates onError and afterSession fire

2. **Added spec validation links**:
   - Added inline comments to both acceptance tests pointing to `specs/hal-engine-config-hooks/spec.md#L20`
   - Added inline comment to the usage-tracking test pointing to the hooks spec
   - Added inline comment to the validation-rejection test pointing to the tool-input-validation spec

3. **Updated the spec**:
   - Added new statement documenting that beforeSession throwing causes error to propagate, onError and afterSession to fire
   - Changed tool-responses spec status from "Draft" to "In Progress"

4. **Formatted all files** with prettier

All changes are committed and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Split acceptance test and add spec links","tdd_next":"acceptance green"}}