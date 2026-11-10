Fixed the CI failures reported on commit `c3cd08a9719fc2b94390d5b6e91bcbe417f649a3`:

1. **Typecheck (`TS2353`)**: Corrected `PromptBuilderConfig` instantiation in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` from unknown properties (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) to `{identity: 'You are HAL.'}`.
2. **ESLint (`re-lint/max-expects`)**: Consolidated the 3 `expect` calls in `chatOrchestrator.beforeSession.acceptance.test.ts` into a single `expect` call asserting `{outcome, caughtError, afterSessionRan}` against expected values using `outcomeOf`.
3. **Spec Anchors**: Updated the acceptance test anchor line in `specs/hal-engine-config-hooks/spec.md` to `#L35` to match the exact test declaration line, verified by `scripts/check-spec-anchor-names.mjs`.
4. **Verification & Delivery**: Formatted changed files with Prettier, verified tests with Jest, committed changes, and pushed to `origin HEAD`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test invalid PromptBuilderConfig properties and re-lint/max-expects rule violation"}}