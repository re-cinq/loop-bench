# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` in `src/orchestration/tools/registry.ts` are the real entry points and can be called directly to observe schema compilation at registration and input validation before the executor runs.

## Done when these pass

- [ ] **ToolRegistry input validation returns a ToolResponse naming the missing required field and does not invoke the executor** — `execute` validates `input` against the tool's `inputSchema` before invoking the executor, returning a rejection `ToolResponse` naming the missing required `location` property with 0 executor calls
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry input validation rejects a wrong-typed field naming the field path and expected type while omitting the offending value from the result and logs** — `execute` rejects a wrong-typed property with a message naming the property path and expected type, without leaking the offending property value in either the returned `result` or any log line
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry input validation throws at register time when the inputSchema is uncompilable and names the tool** — `register` compiles a static tool's `inputSchema` eagerly and throws synchronously naming the tool when the schema is invalid
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (not `devDependencies` or `peerDependencies`) and configure it without `additionalProperties: false` injection, type coercion, or default application
- [ ] Compile static tool schemas once at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas), and resolve/compile function-valued `ToolDefinitionSource` schemas per call cached by the resolved schema object
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor; on failure, log and return a `ToolResponse` naming failing property paths and constraints without ever including offending property values, and add the one-line doc comment on `execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` covering extra-property passthrough (`toEqual`), function-valued schema updates across calls, single compilation across ten static calls, unknown-tool throw, and orchestrator retry round after a rejected tool call, citing each in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `example/weather-tool.ts` (if applicable via doc-blocks), and `CHANGELOG.md` (with MINOR bump / migration note) to match the new validation contract

## Out of scope

- Changing the `Unknown tool: <name>` throw to a returned `ToolResponse` (tracked separately)
- Validating tool output
- Hallucination detection and evaluation harness
- Per-tool authorization and `beforeToolCall` veto hooks
- Retry, timeout, and rate limiting around tool execution