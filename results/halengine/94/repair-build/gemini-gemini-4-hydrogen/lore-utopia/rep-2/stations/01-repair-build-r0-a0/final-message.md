Fixed both CI failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and updated the shifted spec line anchor in `specs/hal-engine-config-hooks/spec.md`:

- Replaced invalid `PromptBuilderConfig` fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) with `{identity: 'You are HAL.'}` in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.
- Consolidated the three `expect(...)` calls in `'runs onError and afterSession when beforeSession throws'` into a single `expect({rejectedError, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`.
- Repointed the spec citation in `specs/hal-engine-config-hooks/spec.md` from `#L40` to `#L32`.
- Verified `npx prettier --check`, `npm run spec:names`, `npm run check:spec-links`, `node scripts/repoint-spec-anchors.mjs --check origin/main`, and Jest on `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` (1/1 passed); committed as `b2e4ec2`, pushed to `origin/loop-bench/94`, and confirmed `origin/main` is already up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Invalid PromptBuilderConfig properties and multiple expect calls violating re-lint/max-expects in src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts"}}