Branch is clean and pushed. The round fixed all CI failures from the previous push:

- **Duplicate code** between the two test files: extracted `scriptedProvider`, `registryReturning`, and constants to `chatOrchestratorFixtures.ts`, imported by both test files
- **Internal duplication** in the acceptance test: added `runAndCaptureUsage` helper (callee-below-caller) to replace 11-13 line repeated patterns in tests 1, 3, and 4
- **Missing spec links** for 3 acceptance tests (now at L38, L61, L73) and 3 `addUsage` unit tests (L29, L35, L41 in `orchestratorHelpers.test.ts`): added spec statements in `specs/hal-engine-config-hooks/spec.md`
- **Rotten spec links**: fixed `chatOrchestrator.ts#L148→#L149` and `acceptance.test.ts#L52→#L21`
- **Shifted spec links**: `repoint-spec-anchors.mjs` updated 9 architecture spec links and 1 tool-input-validation spec link

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: duplicate code, missing spec links, rotten spec anchors","tdd_next":"acceptance green"}}