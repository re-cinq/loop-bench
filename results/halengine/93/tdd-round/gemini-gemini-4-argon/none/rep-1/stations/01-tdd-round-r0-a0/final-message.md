Completed the TDD round for Ticket #93:

- **Red**: Added `accumulateUsage` unit test in `src/orchestration/orchestratorHelpers.test.ts` (1 red test of mine, 0 regressions).
- **Green**: Defined and exported `TotalUsageMetadata` in `src/types/ai.ts` (re-exported via `src/types/index.ts` and `src/index.ts`), implemented `accumulateUsage` in `src/orchestration/orchestratorHelpers.ts`, and updated `src/orchestration/chatOrchestrator.ts` to accumulate `totalUsage` across provider calls and pass it to `afterModelResponse`.
- **Refactor & Traceability**: Cited the new test in `specs/hal-engine-config-hooks/spec.md`, updated generated doc blocks in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`, documented the behavior and consumer impact in `CHANGELOG.md`, and ticked the completed facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do, under TotalUsageMetadata","tdd_next":"acceptance green"}}