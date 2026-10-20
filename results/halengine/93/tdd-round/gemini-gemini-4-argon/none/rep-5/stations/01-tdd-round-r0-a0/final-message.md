Completed one red-green-refactor round for ticket #93:

- Wrote a failing unit test in `src/orchestration/orchestratorHelpers.test.ts` (`sums reported round usage and leaves an unreported turn undefined`) and verified it failed in RED phase, then passed in GREEN phase (0 regressions, 1 new test).
- Exported `TurnUsage` (`src/types/ai.ts`, `src/types/index.ts`, `src/index.ts`) and typed `OrchestratorHooks.afterModelResponse` with `totalUsage?: TurnUsage`.
- Implemented `accumulateUsage` in `src/orchestration/orchestratorHelpers.ts` and wired `totalUsage` across tool rounds in `src/orchestration/chatOrchestrator.ts`.
- Updated `specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-architecture/spec.md`, `CLAUDE.md`, `CHANGELOG.md`, and `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with TurnUsage, sum reported round usage across tool rounds, and update specs and CHANGELOG","tdd_next":"acceptance green"}}