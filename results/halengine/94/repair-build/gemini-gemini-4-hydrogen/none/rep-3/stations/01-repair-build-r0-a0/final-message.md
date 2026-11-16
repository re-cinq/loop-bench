Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
- Replaced unknown `PromptBuilderConfig` fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) with `identity` and `responseGuidelines`.
- Consolidated the three `expect` calls into a single `expect({outcome, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`, and repointed the citation line in `specs/hal-engine-config-hooks/spec.md` from `#L40` to `#L35`.
- Formatted with `npx prettier --write`, verified `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` passes with Jest (1/1 passed), committed (`32f060a`), verified `origin/main` is up to date, and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilderConfig properties and consolidated assertions to satisfy max-expects in chatOrchestrator.beforeSession.acceptance.test.ts"}}