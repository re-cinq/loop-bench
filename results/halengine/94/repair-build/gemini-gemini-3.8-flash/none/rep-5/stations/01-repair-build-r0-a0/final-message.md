CI reported two failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
1. `typecheck`: `PromptBuilderConfig` does not have property `baseSystemPrompt`. Fixed by initializing `PromptBuilder` with `{identity: 'You are HAL.'}`.
2. `eslint`: `re-lint/max-expects` flagged 3 `expect` calls in a single test. Fixed by using `outcomeOf` to capture the rejection outcome and asserting `{outcome, caughtError, afterSessionRan}` in a single `expect(...).toEqual(...)`.

Also updated the spec citation anchor line in `specs/hal-engine-config-hooks/spec.md` to point to `#L36`, verified via `node scripts/check-spec-anchor-names.mjs` and Jest, formatted with Prettier, and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed PromptBuilderConfig initialization and combined multiple expect calls into one in beforeSession acceptance test"}}