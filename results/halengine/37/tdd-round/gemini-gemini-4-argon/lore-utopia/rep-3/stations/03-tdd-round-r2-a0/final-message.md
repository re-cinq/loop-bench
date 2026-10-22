Completed the final facet and resolved the CI findings on `a857184ce45bc4a01eea26c29b7a2dafc583c5b6`:

- **Red tests**: 0 of mine, 0 regressions (CI failures were `re-lint/no-duplicate-code` on `src/orchestration/tools/registry.test.ts` and the coverage floor on `src/orchestration/tools/` from missing unit tests for the remaining branches).
- **Changes**:
  - Eliminated duplicate test structure in `src/orchestration/tools/registry.test.ts` and added unit tests covering valid inputs with undeclared extra properties, `Unknown tool: <name>` errors, and function-valued `ToolDefinitionSource` schema caching/validation.
  - Added a unit test in `src/orchestration/chatOrchestrator.test.ts` validating that a schema-rejected tool call is fed back as a `tool_result` so the model can correct the call on the next round.
  - Updated `specs/hal-engine-tool-input-validation/spec.md` with full statement test citations and set its status to `Shipped`.
  - Updated `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in src/orchestration/tools/registry.test.ts and src/orchestration/chatOrchestrator.test.ts, link the remaining statements in specs/hal-engine-tool-input-validation/spec.md, and update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, adrs/ADR-002-response-validation.md, and CHANGELOG.md","tdd_next":"acceptance green"}}