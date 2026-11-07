# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — The acceptance tests call `ToolRegistry.execute` and `createChatOrchestrator` to observe validation behavior, rejection formatting, redaction, and performance (caching) directly.

## Done when these pass

- [x] **rejects missing required property and does not call executor** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **passes through extra properties unchanged** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **rejects wrong-typed field and redacts the value** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **throws at registration time for uncompilable schema** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **validates against current schema for function-valued definitions** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **asserts a static tool schema is compiled once across ten execute calls** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **redacts input values from logs and results** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **throws Unknown tool for unregistered names** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **asserts ajv is in dependencies** — `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **drives a rejected tool call followed by a corrected retry** — `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Add missing acceptance tests to `src/orchestration/tools/registry.acceptance.test.ts`.
- [x] Ensure all tests link to `specs/hal-engine-tool-input-validation/spec.md`.
- [x] Verify all tests fail for the right reasons.

## Out of scope

- Implementation of the validation logic.
- Validating tool output.
- Authorization or rate limiting.