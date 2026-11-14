Resolved all CI failures reported in `round-brief.md` (`typecheck` `PromptBuilderConfig` error and `re-lint/max-expects` in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, `re-lint/declare-near-use` in `src/orchestration/chatOrchestrator.test.ts`, and `check-changelog`), repointed the spec citation in `specs/hal-engine-config-hooks/spec.md` to `#L32`, added the consumer-facing `### Fixed` entry and migration note under `## [Unreleased]` in `CHANGELOG.md`, and ticked the final facet in `.lore/dod.md`.

- Tests run locally: this round ran no tests here (local test runner execution was denied by the pod's command policy).
- Red tests: 0 red tests were ours and 0 were regressions (only `typecheck`, `eslint`, and `changelog` failed on the previous push).
- Unrelated smells noticed (left untouched): `onError` in `src/orchestration/chatOrchestrator.ts` is gated on `error instanceof Error`, and `afterModelResponse` receives `lastUsage` rather than cumulative usage across tool rounds (#93).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document in the CHANGELOG what changes for an existing consumer.","tdd_next":"acceptance green"}}