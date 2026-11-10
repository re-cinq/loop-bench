# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` are already public entry points with clean boundaries. The acceptance tests call `ToolRegistry` and `createChatOrchestrator` directly and fail today because `register` does not compile `inputSchema` and `execute` passes unvalidated input straight to the executor.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — `ToolRegistry.execute` validates `input` against the declared `inputSchema` before calling the executor, returning a `ToolResponse` whose `result` names the missing required field while leaving the executor uncalled.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the field path and expected type without the offending value** — `ToolRegistry.execute` rejects an input field whose runtime type violates the schema, naming the field path and expected type in `result` without leaking the offending value.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time when the inputSchema is uncompilable and names the tool** — `ToolRegistry.register` compiles a static tool's `inputSchema` eagerly and throws synchronously naming the tool when compilation fails.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves processMessage after a rejected tool call is retried with valid input on the next round** — a validation rejection flows back through `createChatOrchestrator` as a `ToolResponse` result visible to the provider on the next round, allowing a corrected retry to resolve `processMessage`.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` runtime `dependencies` (not `devDependencies` or `peerDependencies`) and ensure the built package imports cleanly.
- [ ] Compile static tool schemas once at `ToolRegistry.register` time (throwing synchronously with the tool name on invalid schema) and cache compiled validators per schema object for function-valued `ToolDefinitionSource` definitions.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor (`required`, declared types, `enum` only; no `additionalProperties: false` injection, type coercion, or default application), returning a `ToolResponse` naming the failing property paths and constraints without ever logging or returning offending property values.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` covering pass-through of extra properties, static single compilation across ten calls, dynamic function-valued schema changes across calls, no-value-leak in log lines, and preserving `Unknown tool: <name>` throw, citing all remaining statements in `specs/hal-engine-tool-input-validation/spec.md` and updating its status to `Shipped`.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump `package.json` version (MINOR).

## Out of scope

- Changing the `Unknown tool: <name>` throw to a returned tool response.
- Validating tool output, hallucination detection, or an evaluation harness.
- Per-tool authorization and retry, timeout, or rate limiting around tool execution.