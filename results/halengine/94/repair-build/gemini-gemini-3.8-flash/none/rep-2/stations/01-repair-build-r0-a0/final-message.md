Fixed the CI failures reported on commit `c3cd08a9719fc2b94390d5b6e91bcbe417f649a3`:

1. **Typecheck (TS2353)**: Fixed `PromptBuilder` configuration in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to use valid `PromptBuilderConfig` (`{identity: 'You are HAL.'}`).
2. **ESLint (`re-lint/max-expects`)**: Replaced multiple assertions in the acceptance test with a single `expect(...).toEqual(...)` assertion evaluating the outcome, caught error, and `afterSessionRan`.
3. **Spec traceability**: Updated the citation anchor in `specs/hal-engine-config-hooks/spec.md` to reference the relocated test at `#L36`, verified with `scripts/check-spec-anchor-names.mjs` and `scripts/check-spec-links.mjs`.
4. **Validation**: Verified unit and acceptance tests with Jest and formatted changed files with Prettier. Changes pushed to `origin/loop-bench/94` and branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"PromptBuilderConfig invalid properties and re-lint/max-expects failure in chatOrchestrator.beforeSession.acceptance.test.ts"}}