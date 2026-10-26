Perfect! I've successfully fixed both CI failures:

## Summary of fixes

**Fixed Issues:**

1. **Typecheck error** (line 30): Corrected `PromptBuilderConfig` properties used in the test
   - Changed `baseSystemPrompt` → `identity`
   - Changed `systemPromptSuffix` → `responseGuidelines`  
   - Removed unsupported `contextConfig` object

2. **Eslint error** (max-expects violation): Split the single test with 3 expect calls into 3 separate focused tests
   - Each test now has only 1 expect assertion
   - Tests verify the three aspects of the behavior:
     - Rejection is propagated to the caller
     - `onError` hook fires with the error
     - `afterSession` hook fires even after `beforeSession` throws

The branch is now clean and up to date with origin/main, with all changes committed and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilder config properties and split test to comply with eslint max-expects rule"}}