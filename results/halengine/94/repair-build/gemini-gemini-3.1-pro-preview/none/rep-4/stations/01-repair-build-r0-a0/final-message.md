I have fixed the two CI failures reported on the latest commit (`c3cd08a9719fc2b94390d5b6e91bcbe417f649a3`):
1. **typecheck:** The `PromptBuilder` initialization in `chatOrchestrator.beforeSession.acceptance.test.ts` was using outdated properties (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). I updated them to `identity` and `responseGuidelines` to match the `PromptBuilderConfig` interface.
2. **eslint (`re-lint/max-expects`):** The acceptance test had three `expect` statements. I consolidated them into a single `expect(...).toEqual(...)` assertion by wrapping the promise evaluation in a `try-catch` block.

I ran `npm run typecheck`, `npm run eslint`, and `npm run test` locally and confirmed that all checks now pass. I also verified the code formatting with `prettier` and pushed the fix to `origin`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed typecheck (PromptBuilder args) and eslint (max-expects rule) errors in acceptance test"}}