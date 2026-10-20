Resolved the two CI failures from the previous push (0 red tests were regressions; 1 lint error was for the uncited acceptance test on this branch, and 1 changelog gate failure was for `src/orchestration/chatOrchestrator.ts`):

- Added the spec statement and `([validated by: counts reported rounds while leaving a turn with no reported usage undefined](../../src/orchestration/chatOrchestratorUsage.acceptance.test.ts#L67))` citation in `specs/hal-engine-config-hooks/spec.md`.
- Added the `CHANGELOG.md` entry under `## [Unreleased]` (`### Changed`) documenting `totalUsage` aggregation across tool rounds in `afterModelResponse` and its impact on existing consumers.
- Checked off the remaining facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"acceptance green"}}