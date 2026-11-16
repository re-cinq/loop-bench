The branch is pushed and up to date. The two CI failures were both in the acceptance test file:

1. **typecheck**: `baseSystemPrompt` doesn't exist in `PromptBuilderConfig` — fixed by replacing the invalid config with `{identity: 'You are HAL.'}`.
2. **eslint `re-lint/max-expects`**: 3 expect calls exceeded the max of 1 — fixed by using the `outcomeOf` pattern (same as the existing `chatOrchestrator.test.ts`) to convert the rejection to a value and combine all three assertions into one `expect({outcome, caughtError, afterSessionRan}).toEqual({...})`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilderConfig fields and 3 separate expects; fixed to use identity and single combined expect"}}