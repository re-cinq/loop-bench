Fixed the CI typecheck and eslint errors reported in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
1. Replaced unknown `PromptBuilderConfig` fields with `{identity: 'You are HAL.'}`.
2. Refactored the 3 `expect` calls into a single `expect` assertion using `outcomeOf` to satisfy `re-lint/max-expects`.
3. Repointed the spec citation in `specs/hal-engine-config-hooks/spec.md` to line 36.
4. Formatted the modified files with Prettier, verified tests and spec checks pass, and pushed to origin.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"PromptBuilderConfig invalid properties and max-expects lint error in acceptance test"}}