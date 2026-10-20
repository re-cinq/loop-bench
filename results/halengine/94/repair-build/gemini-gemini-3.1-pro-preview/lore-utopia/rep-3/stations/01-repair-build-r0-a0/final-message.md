I have reviewed the CI failures from the round brief and resolved them:

1. Fixed the `TS2353` type check failure in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` by passing `identity` to the `PromptBuilder` constructor instead of `baseSystemPrompt` and `systemPromptSuffix`.
2. Fixed the `re-lint/max-expects` lint error by implementing `outcomeOf` (adapted from `chatOrchestrator.test.ts`) to capture the rejection result and combine the 3 assertions into a single `expect(...).toEqual(...)` check.

After making the fixes, the file was formatted using `npx prettier --write` and the commits pushed to `origin HEAD`. The branch is also up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed TS2353 for PromptBuilderConfig and max-expects lint rule in acceptance test"}}