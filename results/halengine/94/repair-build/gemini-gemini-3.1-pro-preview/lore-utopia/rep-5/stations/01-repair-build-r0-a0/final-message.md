I have addressed the CI findings for the `loop-bench/94` branch.

1. **Typecheck Failure**: Updated the `PromptBuilder` instantiation in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to provide properties (`identity`, `responseGuidelines`) that match `PromptBuilderConfig`, instead of the outdated `baseSystemPrompt`/`systemPromptSuffix`.
2. **ESLint Failure**: Addressed the `re-lint/max-expects` rule in the same test by catching the error using a `try/catch` block and making a single `expect(...).toEqual(...)` assertion on an object that encapsulates the caught errors and the boolean flag, instead of relying on three separate `expect` calls. 

I formatted the file with `prettier` using `npm run prettier`, verified the test locally with `npm run test`, and pushed the commit to the branch. The branch has also been updated with `origin/main` without conflicts.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed typecheck failure (PromptBuilderConfig types) and eslint failure (max-expects rule) in chatOrchestrator.beforeSession.acceptance.test.ts"}}