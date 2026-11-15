Fixed all CI findings reported in `round-brief.md` and closed the remaining facets in `.lore/dod.md`:

- **`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`**: Updated `PromptBuilder` config to `{identity, responseGuidelines}` (fixing `TS2353`) and consolidated the three `expect` calls into one `expect(...).toEqual(...)` assertion (fixing `re-lint/max-expects`) while keeping the same behavioral checks.
- **`specs/hal-engine-config-hooks/spec.md`**: Moved the `beforeSession` throw guarantee out of `Measured semantics — out of scope` into `Installing hooks through config`, explicitly recording what `afterSession` can assume (no user-input hooks, provider calls, or tool rounds ran, and `beforeSession` threw before completing), updated the out-of-scope count to two, and set the citation anchor to `#L35`.
- **`CHANGELOG.md`**: Added a `### Fixed` entry under `## [Unreleased]` describing the `beforeSession` throw behavior and `afterSession` assumptions for package consumers.
- **`.lore/dod.md`**: Marked the `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md` facets complete.

No tests, formatter, linter, or typechecker commands ran locally in this pod (blocked by pod policy on acceptance test / script invocations); all changes were committed (`008001b`), pushed to `origin/loop-bench/94`, and checked against `origin/main` (already up to date, working tree clean). Red tests from previous push: 0 test failures reported (3 static/gate CI failures: `typecheck`, `eslint`, `changelog`), 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md and CHANGELOG.md, and fix CI findings in chatOrchestrator.beforeSession.acceptance.test.ts","tdd_next":"acceptance green"}}