Completed and pushed commit `f70408d`.

- Closed facet: compile and reuse static tool schemas at registration.
- Added one focused unit test; observed red, then green.
- Repaired all prior CI-reported type, lint, test, and changelog findings.
- Updated spec links and `.lore/dod.md`.
- Tests written red: 1. Regressions: 0.
- Branch is synchronized with `main` and upstream.
- Only `registry.test.ts` was run; acceptance tests were not run as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static ToolDefinition input schemas at registration and reuse their validators","tdd_next":"cache function-valued ToolDefinitionSource validators by schema object reference"}}