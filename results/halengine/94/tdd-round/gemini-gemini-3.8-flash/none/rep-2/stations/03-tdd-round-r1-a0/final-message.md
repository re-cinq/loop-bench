Addressed the CI failures reported on the previous push for `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
- Replaced the invalid properties on `PromptBuilderConfig` with `{identity: 'You are HAL.'}` to resolve TS2353.
- Captured rejection outcome via `outcomeOf` and consolidated assertions into a single `expect(...).toEqual(...)` to satisfy `re-lint/max-expects`.
- Updated the traceability link in `specs/hal-engine-config-hooks/spec.md` to point to `#L35`.
- Formatted changed files with Prettier, committed, verified sync with `origin/main`, and pushed to upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI typecheck and eslint errors in beforeSession acceptance test","tdd_next":"acceptance green"}}