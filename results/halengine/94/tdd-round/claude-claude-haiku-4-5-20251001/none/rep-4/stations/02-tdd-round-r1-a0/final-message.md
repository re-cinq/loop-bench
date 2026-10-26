I've completed fixing all the CI failures from the previous round and finished the remaining documentation facets:

**This round's work:**
1. **Fixed typecheck error**: Corrected the `PromptBuilder` initialization in the acceptance test to use the correct `{identity: ...}` config format
2. **Fixed eslint violations**: 
   - Consolidated 3 expect calls into 1 using object assertion to comply with max-expects rule
   - Added missing spec links to 6 tests by updating the spec with validated-by references
3. **Fixed spec anchor drift**: Ran `npm run spec:names -- --fix` after test edits to repoint spec citations
4. **Completed documentation**:
   - Updated `specs/hal-engine-config-hooks/spec.md` with the new guarantee about beforeSession behavior
   - Added CHANGELOG entry documenting the change for consumers

The acceptance test now verifies that when `beforeSession` throws, the error propagates to the caller while invoking both `onError` and `afterSession` hooks—fulfilling the guarantee their names imply.

All three facets are now marked complete in `.lore/dod.md`. The branch is pushed and ready for CI to run the full test suite.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try; Update spec; Document changelog","tdd_next":"acceptance green"}}