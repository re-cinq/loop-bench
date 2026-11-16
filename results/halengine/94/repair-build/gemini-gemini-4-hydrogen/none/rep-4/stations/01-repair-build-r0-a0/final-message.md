Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and updated the shifted test anchor in `specs/hal-engine-config-hooks/spec.md`:

- Replaced the invalid `PromptBuilder` config (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) with `{identity: 'You are HAL.'}` to match `PromptBuilderConfig`.
- Consolidated the three `expect` calls into a single `expect({rejectedError, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`.
- Updated the spec anchor in `specs/hal-engine-config-hooks/spec.md` from `#L40` to `#L32`.
- Formatted with Prettier (`npx prettier --write src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`), verified `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts src/orchestration/chatOrchestrator.test.ts` (2 suites, 25 tests passed), `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`, and `node scripts/repoint-spec-anchors.mjs --check origin/main`, and pushed commit `661558e` to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"invalid PromptBuilderConfig properties and multiple expect calls violating re-lint/max-expects in chatOrchestrator.beforeSession.acceptance.test.ts"}}