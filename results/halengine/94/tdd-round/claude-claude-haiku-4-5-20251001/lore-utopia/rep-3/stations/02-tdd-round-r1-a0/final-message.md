Completed the round. Fixed all CI failures from the previous round:

**Changes made:**
1. **Fixed TypeScript error**: Corrected PromptBuilder config to use `identity` instead of non-existent `baseSystemPrompt`
2. **Fixed ESLint errors**: 
   - Removed duplicate unit test file (`chatOrchestrator.beforeSession.test.ts`)
   - Reduced test from 3 expect calls to 1 by combining assertions into a single object assertion
3. **Updated spec**: Moved beforeSession error handling out of "out-of-scope" section into its own section documenting it as a guaranteed behavior owned by #94
4. **Updated CHANGELOG**: Added entry documenting the behavior change for consumers
5. **Marked facets**: Ticked all three remaining facets as complete in `.lore/dod.md`

All commits pushed and branch is up-to-date with origin/main. The acceptance test validates that beforeSession throws properly reach both onError and afterSession hooks.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession","tdd_next":"acceptance green"}}