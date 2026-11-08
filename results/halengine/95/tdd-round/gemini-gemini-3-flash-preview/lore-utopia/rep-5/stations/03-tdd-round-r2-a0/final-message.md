I have completed a TDD round to address the CI failures and finalize the implementation for ticket #95.

### Changes Summary

1.  **Architectural Refinement**: Promoted the `toError` coercion utility from a private function in `chatOrchestrator.ts` to an exported helper in `orchestratorHelpers.ts`. This allows direct unit testing and reuse across the orchestration layer.
2.  **New Unit Tests**: Created `src/orchestration/toError.test.ts` to explicitly validate the coercion of strings, objects, `undefined`, and `null` into `Error` instances with correct `message` and `cause` properties.
3.  **Test Consolidation**: Merged all non-`Error` rejection tests into `src/orchestration/onErrorNonError.acceptance.test.ts`. This resolved the `re-lint/no-duplicate-code` and `require-yield` failures while providing a single, comprehensive suite for these rejections.
4.  **Traceability Fixes**: Updated `specs/hal-engine-config-hooks/spec.md` with correct spec links and line numbers, matching the consolidated test titles to satisfy the `re-lint/require-spec-link` rule.
5.  **Cleanup**: Removed the redundant `src/orchestration/nonErrorCoercion.test.ts` and formatted all modified files according to project standards.

The round began with a "Red" state (newly added unit tests failing due to missing export), moved to "Green" by exporting the utility, and finished with a comprehensive "Refactor" to repair the broken CI build and improve test organization.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Refactored toError to shared helper and fixed lint/traceability failures","tdd_next":"acceptance green"}}