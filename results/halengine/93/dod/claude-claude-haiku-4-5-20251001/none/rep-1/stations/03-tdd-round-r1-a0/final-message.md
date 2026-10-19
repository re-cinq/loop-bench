Branch is clean and up to date. The push landed successfully.

**Summary of what this round fixed:**

1. **Inter-file duplicate code** — Extracted `scriptedProvider`, `registryReturning`, `TOOL_CALL`, `STOP_FOR_TOOL`, `STOP_DONE` to a new shared `orchestratorTestHelpers.ts`, eliminating the duplication between `chatOrchestrator.test.ts` and `chatOrchestrator.acceptance.test.ts`.

2. **Intra-file duplicate code** — Refactored all 5 acceptance tests to use a `runWithUsageHook` helper, eliminating the repeated orchestrator setup boilerplate within the acceptance test.

3. **Missing spec links** — Added validated-by links in `specs/hal-engine-config-hooks/spec.md` for all 5 acceptance tests.

4. **Max-expects violation** — Removed the redundant `hookWasCalled` check from the "reports no usage when no rounds report any" test, leaving a single `expect(getUsage()).toBeUndefined()`.

5. **Shifted spec anchors** — Ran `repoint-spec-anchors.mjs` to update 9 spec link line numbers in architecture and tool-input-validation specs due to the 27-line removal.

6. **DoD facet closed** — Added JSDoc to `afterModelResponse` clarifying the usage is the accumulated sum across all rounds, and ticked the facet in `dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update type signature/documentation of afterModelResponse + fix all CI lint errors","tdd_next":"acceptance green"}}