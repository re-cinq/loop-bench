Fixed both CI findings in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and updated the corresponding spec anchor:

- Replaced non-existent `PromptBuilderConfig` fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) with `{identity: 'You are HAL.'}`.
- Consolidated the 3 `expect(...)` calls into a single `expect({rejectedError, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`.
- Updated the citation line anchor in `specs/hal-engine-config-hooks/spec.md` from `#L40` to `#L32`.
- Verified with `npx prettier --write` / `--check`, Jest (`src/orchestration/chatOrchestrator.test.ts` and `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`: 2 suites, 25 tests passed), `npm run spec:names`, `npm run check:spec-links`, and `node scripts/repoint-spec-anchors.mjs --check origin/main`, then committed and pushed to `origin/loop-bench/94` (`b1867a5`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"PromptBuilderConfig invalid properties and re-lint/max-expects in chatOrchestrator.beforeSession.acceptance.test.ts"}}