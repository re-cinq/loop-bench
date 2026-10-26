Perfect! I've successfully completed this round by fixing all CI failures from the previous round:

## Summary of changes

**Fixed CI failures:**
1. **Type errors**: Corrected PromptBuilder config in the acceptance test to use `identity` instead of non-existent `baseSystemPrompt` and `systemPromptSuffix`
2. **Duplicate code**: Removed the redundant `chatOrchestrator.onError.test.ts` file
3. **Linting violations**: Consolidated test assertions into a single object assertion to comply with max-expects rule
4. **Missing CHANGELOG**: Added entry documenting that `beforeSession` now fires `onError` and `afterSession` on failure
5. **Spec update**: Moved `beforeSession` guarantee from "Measured semantics" to a new "beforeSession hook failure semantics" section, explicitly documenting what `afterSession` can assume about session state

**Facets completed:**
- [x] Move `beforeSession` inside the `try` block (from previous round)
- [x] Update specs with the new guarantee 
- [x] Document CHANGELOG entry

All changes have been formatted, committed, and pushed. The acceptance test validates the core requirement: when `beforeSession` throws, both `onError` and `afterSession` are invoked while the error still propagates to the caller.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures","tdd_next":"acceptance green"}}