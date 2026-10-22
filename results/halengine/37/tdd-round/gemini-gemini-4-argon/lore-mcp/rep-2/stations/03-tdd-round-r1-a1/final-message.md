Completed the final facet for Ticket #37:

- Added unit tests in `src/orchestration/tools/registry.test.ts` (valid input with undeclared extra properties passed through unchanged once without applying defaults, `Unknown tool: <name>` thrown for unregistered tools, static schema compilation verified across 10 `execute` calls, and camelCase property keys) and `src/orchestration/chatOrchestrator.test.ts` (tool-loop recovery when a schema rejection is returned to the provider as a `tool_result` and retried).
- Tightened `src/orchestration/tools/registry.ts` helper branches so all new validation branches are covered.
- Linked all remaining statements in `specs/hal-engine-tool-input-validation/spec.md` and updated its status to `Shipped`.
- Updated `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, `CHANGELOG.md`, and `.lore/dod.md`.
- Red tests from the round brief: 2 acceptance tests were ours (from commit `5002006` prior to `ToolRegistry.execute` validation), 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in src/orchestration/tools/registry.test.ts and src/orchestration/chatOrchestrator.test.ts, link the remaining statements in specs/hal-engine-tool-input-validation/spec.md, and update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, adrs/ADR-002-response-validation.md, and CHANGELOG.md","tdd_next":"acceptance green"}}