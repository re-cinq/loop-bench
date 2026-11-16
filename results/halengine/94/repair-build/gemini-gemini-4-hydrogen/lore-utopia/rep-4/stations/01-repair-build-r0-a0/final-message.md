Fixed both CI findings in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and updated the spec anchor line in `specs/hal-engine-config-hooks/spec.md` (`#L40` → `#L32`):
- Replaced unknown `PromptBuilderConfig` fields (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`) with `{identity: 'You are HAL.'}`.
- Consolidated the three `expect` calls into a single `expect({rejectedError, caughtError, afterSessionRan}).toEqual(...)` assertion to satisfy `re-lint/max-expects`.

Verified with `npx prettier --check`, `node scripts/check-spec-anchor-names.mjs --fix`, `node scripts/repoint-spec-anchors.mjs --check origin/main`, and Jest on `chatOrchestrator.beforeSession.acceptance.test.ts` + `chatOrchestrator.test.ts` (25 passed, 25 total). Committed as `648ab24` and pushed to `origin/loop-bench/94` (`origin/main` already up to date).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilderConfig type error and re-lint/max-expects violation in chatOrchestrator.beforeSession.acceptance.test.ts"}}