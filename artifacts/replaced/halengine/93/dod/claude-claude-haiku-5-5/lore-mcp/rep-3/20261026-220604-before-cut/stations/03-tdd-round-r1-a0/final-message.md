Branch is up to date and pushed. This round fixed all 4 ESLint errors (2 duplicate-code, 2 require-spec-link) and the changelog failure from the previous CI run, and also completed the type documentation facet.

**What was done:**
- Extracted `scriptedProvider` to `src/orchestration/scriptedProvider.test-utils.ts`, eliminating the duplicate between the two test files
- Updated all ~20 spec links in `hal-engine-architecture/spec.md`, `hal-engine-config-hooks/spec.md`, and `hal-engine-tool-input-validation/spec.md` that shifted when the import line was added and the duplicate removed
- Replaced the under-counting statement in `specs/hal-engine-config-hooks/spec.md` with the summed-usage description, with validated-by links for both acceptance tests at their new line numbers (L59, L69)
- Added one-line JSDoc comments on `OrchestratorHooks.afterModelResponse` and `UsageMetadata` clarifying the turn-total semantics
- Added the CHANGELOG entry under Unreleased → Changed

0 regressions — only moved a utility function; existing logic in `chatOrchestrator.ts` was untouched. The remaining open DoD facet is "Keep the no-tool-call path reporting exactly what it reports today" — CI's verdict on the existing test confirms this.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec links, duplicate-code, changelog, type doc","tdd_next":"acceptance green"}}