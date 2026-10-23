Perfect! I've successfully fixed both CI failures:

## Changes made:

1. **Fixed typecheck error** (line 30):
   - Changed `baseSystemPrompt` → `identity`
   - Changed `systemPromptSuffix` → `responseGuidelines`
   - Removed the non-existent `contextConfig` object

2. **Fixed eslint max-expects error** (line 40):
   - Split the single test with 3 expect calls into 3 separate tests:
     - Test 1: Verifies the error is rejected with correct message
     - Test 2: Verifies `onError` hook is called with the correct error
     - Test 3: Verifies `afterSession` hook is called

The branch is now up to date with main and all changes have been pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed typecheck error in PromptBuilderConfig properties and split test to comply with max-expects linting rule"}}