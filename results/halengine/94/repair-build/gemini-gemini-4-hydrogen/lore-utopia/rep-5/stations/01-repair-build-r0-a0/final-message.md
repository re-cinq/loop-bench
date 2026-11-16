Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and updated the shifted test line anchor in `specs/hal-engine-config-hooks/spec.md` (`#L40` -> `#L35`):

- Replaced invalid `PromptBuilderConfig` fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) with `identity` and `responseGuidelines`.
- Combined the three `expect` assertions into a single `expect(...).toEqual(...)` check to satisfy `re-lint/max-expects`.
- Verified Prettier formatting, `npm run spec:names`, `node scripts/repoint-spec-anchors.mjs --check origin/main`, `npm run check:spec-links`, and Jest (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and `src/orchestration/chatOrchestrator.test.ts`: 2 suites, 25 tests passed), then committed and pushed `86414d3` to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed invalid PromptBuilderConfig properties (TS2353) and 3-expect re-lint/max-expects violation in chatOrchestrator.beforeSession.acceptance.test.ts and updated spec anchor"}}