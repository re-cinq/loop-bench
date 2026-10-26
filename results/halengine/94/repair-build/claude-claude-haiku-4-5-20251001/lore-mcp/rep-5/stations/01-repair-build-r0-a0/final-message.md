Perfect! Both issues have been fixed and verified. Here's a summary of what was done:

## Fixes Applied

1. **Fixed typecheck error** (`TS2353`):
   - The test was instantiating `PromptBuilder` with invalid properties: `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`
   - Updated to use the correct property `identity` instead, matching the actual `PromptBuilderConfig` interface

2. **Fixed eslint error** (`re-lint/max-expects`):
   - The test had 3 separate `expect` calls which exceeded the maximum of 1
   - Refactored to use a try-catch block and consolidated all assertions into a single `expect` call with an object comparison

## Changes Made

- **File**: `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`
  - Simplified PromptBuilder config to just `{identity: 'You are HAL.'}`
  - Changed from multiple expect statements to a single consolidated assertion
  - Verified: typecheck passes, eslint passes, prettier formatting is correct

The commit has been pushed and the branch is up to date with the base branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed typecheck error (invalid PromptBuilder config) and eslint error (too many expect calls)"}}