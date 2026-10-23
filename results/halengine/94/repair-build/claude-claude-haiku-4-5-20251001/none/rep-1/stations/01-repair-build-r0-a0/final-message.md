## Summary

I've successfully fixed the RED build on branch `loop-bench/94`. The build was failing on two checks:

### Issues Fixed

1. **Typecheck Error** (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:30`)
   - **Problem**: Invalid PromptBuilder config using non-existent properties (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`)
   - **Fix**: Changed to the correct config format: `identity: 'You are HAL.'`

2. **Eslint Error** (`re-lint/max-expects` violation)
   - **Problem**: Test had 3 separate expect calls (max allowed is 1)
   - **Fix**: Consolidated all three assertions into a single `expect().toEqual()` call that validates:
     - The error is thrown with the correct message
     - The `onError` hook is called with the thrown error
     - The `afterSession` hook is called

### Verification

All checks now pass:
- ✓ typecheck
- ✓ eslint
- ✓ prettier:check

The test maintains full coverage of the acceptance criteria: verifying that `onError` and `afterSession` both fire when `beforeSession` throws, as required by ticket #94.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilder config property names and consolidated test expectations to comply with max-expects linter rule"}}