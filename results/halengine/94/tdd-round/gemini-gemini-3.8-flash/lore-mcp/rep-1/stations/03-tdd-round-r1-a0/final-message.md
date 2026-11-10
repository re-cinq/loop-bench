Resolved the CI failures reported in `round-brief.md` for `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
- Fixed the `PromptBuilderConfig` type error by passing `{identity: 'You are HAL.'}`.
- Resolved the `re-lint/max-expects` lint error by capturing the rejection with `outcomeOf` and asserting the outcome, `caughtError`, and `afterSessionRan` in a single `expect(...).toEqual(...)` call.
- Repointed the spec citation in `specs/hal-engine-config-hooks/spec.md` to `#L37`.
- Verified the unit test `runs onError then afterSession when it throws, and still rejects to the caller` in `src/orchestration/chatOrchestrator.test.ts` (1 passed, 0 failures, 0 regressions).
- Formatted, committed, pushed, and merged `origin/main` cleanly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"resolve CI typecheck and eslint findings in acceptance test","tdd_next":"acceptance green"}}