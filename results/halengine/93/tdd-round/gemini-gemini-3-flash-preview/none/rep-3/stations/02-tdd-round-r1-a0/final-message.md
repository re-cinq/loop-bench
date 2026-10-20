I have fixed the lint errors and missing spec links reported by CI, which were blocking the "acceptance green" phase. I consolidated common test helpers into a new `orchestratorUsageTestSupport.ts` file to resolve code duplication, replaced `any` with the explicit `TurnUsage` type, and removed overly long comments in the unit tests.

I also added the missing validation statements to `specs/hal-engine-config-hooks/spec.md` and updated the spec links in both the acceptance and unit test files to ensure full traceability. All spec links were verified using the `repoint-spec-anchors.mjs` script, and the files were formatted with Prettier.

I verified the logic with the unit tests in `src/orchestration/chatOrchestratorUsage.test.ts` and confirmed that existing orchestrator tests in `src/orchestration/chatOrchestrator.test.ts` remain green as a regression guard.

0 red tests were mine, and 0 regressions were found in the existing test suite.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance green","tdd_next":"acceptance green"}}