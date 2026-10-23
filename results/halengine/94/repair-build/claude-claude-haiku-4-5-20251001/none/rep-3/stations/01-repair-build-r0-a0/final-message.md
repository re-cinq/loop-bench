Perfect! I've successfully fixed both CI failures:

## Changes Made

1. **Fixed typecheck error** (line 30): Changed `baseSystemPrompt` to `identity` and removed invalid properties (`systemPromptSuffix`, `contextConfig`) that don't exist in `PromptBuilderConfig`

2. **Fixed eslint error** (max-expects rule): Split the single test with 3 expect calls into 3 focused tests:
   - Test 1: Verifies the error is thrown to the caller
   - Test 2: Verifies `onError` hook is called with the error
   - Test 3: Verifies `afterSession` hook is called

Each test now has exactly 1 expect call, satisfying the eslint max-expects rule of 1.

The changes are committed and pushed to the branch. The branch is up to date with `origin/main` with no merge conflicts.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilderConfig property name and split test into 3 focused tests to satisfy typecheck and max-expects rules"}}