Branch is up to date and pushed. Here's what this round fixed:

**CI failures resolved:**
- `re-lint/no-duplicate-code`: exported `scriptedProvider` from `chatOrchestrator.test.ts` and imported it in `turnUsage.acceptance.test.ts`, eliminating the 17-line duplicate
- `re-lint/require-spec-link`: added 4 spec statements in `specs/hal-engine-config-hooks/spec.md` for the `addUsage` tests in `orchestratorHelpers.test.ts` (lines 29, 33, 38, 43)
- `changelog`: added `afterModelResponse` summed-usage entry under `### Changed`

**Facets completed:**
- Spec link line numbers updated: `#L70→#L57`, `#L76→#L63` for shifted `turnUsage.acceptance.test.ts`
- JSDoc added to `afterModelResponse` in `OrchestratorHooks` interface and CLAUDE.md
- Under-counting bullet deleted from "Measured semantics"; "These two properties" updated to "This property"
- `chatOrchestrator.ts#L150→#L151` reference updated after JSDoc insertion

0 regressions; 0 tests written (round was CI-failure repair + documentation facets).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"JSDoc on afterModelResponse + spec links for addUsage + delete under-counting bullet + CHANGELOG","tdd_next":"acceptance green"}}