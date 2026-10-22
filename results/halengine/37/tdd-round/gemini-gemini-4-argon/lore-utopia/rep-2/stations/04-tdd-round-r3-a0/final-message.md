This round resolved all CI findings on `9dcc4d7` and closed the final facet in `.lore/dod.md`:

- **CI findings fixed**:
  - `typecheck`: Switched `src/orchestration/tools/registry.ts` to `import * as ajv from 'ajv'` so `Ajv` resolves cleanly under `NodeNext` without colliding with the nested `eslint/node_modules/ajv` v6 ambient `export = ajv` declaration.
  - `eslint`: Reordered private helpers (`getValidator`, `resolveDefinition`, `compileSchema`) below `execute` in `ToolRegistry` to satisfy `re-lint/callee-below-caller`.
  - `test` (coverage threshold on `src/orchestration/tools/`): Added unit test coverage in `src/orchestration/tools/registry.test.ts` for `get`, `getDefinitions`, `getPromptInstructions`, `getExamplePrompts`, `has`, and structured `ToolResponse` normalization (0 red tests were regressions; the CI test step failed solely on the `src/orchestration/tools/` coverage threshold).
- **Final facet completed**:
  - Added the tool-loop recovery unit test in `src/orchestration/chatOrchestrator.test.ts` and linked it in `specs/hal-engine-tool-input-validation/spec.md`.
  - Updated `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `docs/spikes/spike-ai-response-validation.md` to reflect that `ToolRegistry.execute` enforces `inputSchema` before invoking the executor.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in src/orchestration/tools/registry.test.ts and src/orchestration/chatOrchestrator.test.ts, link the remaining statements in specs/hal-engine-tool-input-validation/spec.md, and update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, adrs/ADR-002-response-validation.md, and CHANGELOG.md.","tdd_next":"acceptance green"}}