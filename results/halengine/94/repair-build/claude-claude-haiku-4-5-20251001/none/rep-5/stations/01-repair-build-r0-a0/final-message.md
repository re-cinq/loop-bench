Excellent! All checks pass. The build is now green.

## Summary

Fixed the red build for ticket #94 by addressing three failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:

1. **Typecheck error**: Fixed incorrect `PromptBuilderConfig` field names:
   - Changed `baseSystemPrompt` → `identity`
   - Changed `systemPromptSuffix` → `responseGuidelines`
   - Removed non-existent `contextConfig`

2. **ESLint max-expects error**: Consolidated the test to use a single `expect` call with `toMatchObject`, checking error rejection, `onError` invocation, and `afterSession` execution in one assertion.

3. **ESLint require-spec-link error**: Added the missing spec link comment and updated `specs/hal-engine-config-hooks/spec.md` to reference the correct test line number (L52 instead of L40).

All checks now pass (typecheck, eslint, prettier).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilderConfig field names and consolidated test to pass typecheck and eslint"}}