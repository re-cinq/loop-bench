Perfect! I've successfully fixed the red build. Here's what I did:

## Summary of Changes

Fixed two CI failures in the acceptance test for beforeSession throwing:

1. **Typecheck error (line 30)**: The test was using incorrect property names for `PromptBuilderConfig`:
   - Changed `baseSystemPrompt` → `identity`
   - Changed `systemPromptSuffix` → `domainContext`
   - Removed the `contextConfig` property which doesn't exist in the config

2. **ESLint error (line 40)**: The test had 3 expect statements (max is 1 per test):
   - Split the single test into 3 separate tests:
     - `rejects when beforeSession throws` — verifies the error is properly rejected
     - `fires onError when beforeSession throws` — verifies onError callback is called
     - `fires afterSession when beforeSession throws` — verifies afterSession callback is called

The changes are now committed and pushed to the branch. The branch is up to date with its upstream and ready for CI to re-judge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed typecheck error (wrong PromptBuilderConfig properties) and eslint max-expects violation (split test into 3)"}}