## Summary

I've completed this round by fixing the CI failures from the previous push:

**Changes made:**
1. **Fixed acceptance test typecheck error**: Updated `PromptBuilder` instantiation to use correct config properties (`identity` instead of `baseSystemPrompt`, removed invalid properties)
2. **Fixed acceptance test eslint error**: Refactored test assertions to use single `toEqual()` instead of multiple `expect()` calls (max-expects rule)
3. **Added spec validation links**: Updated `specs/hal-engine-config-hooks/spec.md` to include validated-by links for orchestrator hook tests that were missing them
4. **Updated DOD**: Marked the acceptance test fix facet as complete

The acceptance test should now compile and pass CI validation. The code change (moving `beforeSession` inside the `try` block) was already complete from the previous round, and is now properly validated by the fixed acceptance test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix acceptance test errors and add spec links to validate hooks","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}