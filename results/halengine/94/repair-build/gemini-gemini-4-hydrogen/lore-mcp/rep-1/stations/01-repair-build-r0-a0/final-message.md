Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and updated the shifted test line anchor in `specs/hal-engine-config-hooks/spec.md`:

- Replaced invalid `PromptBuilderConfig` fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) with `{identity: 'You are HAL.'}` (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`).
- Consolidated the three `expect` assertions into a single `expect({rejectedError, caughtError, afterSessionRan}).toEqual(...)` check to satisfy `re-lint/max-expects`.
- Formatted with `npx prettier --write`, repointed the citation anchor via `npm run spec:names:fix` (`#L40` → `#L32`), verified `npm run check:spec-links` and `node scripts/repoint-spec-anchors.mjs --check origin/main`, and ran `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` (1 passed) and `npm test -- src/orchestration/chatOrchestrator.test.ts` (24 passed).
- Committed (`e0f1ade`), pushed to `origin/loop-bench/94`, and confirmed `origin/main` is already up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed invalid PromptBuilderConfig properties and re-lint/max-expects violation in chatOrchestrator.beforeSession.acceptance.test.ts and updated its spec line anchor"}}