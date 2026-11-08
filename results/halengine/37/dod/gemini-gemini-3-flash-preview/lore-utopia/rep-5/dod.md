# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — The `ToolRegistry` is the central point for tool execution and already exists as a class. I can instantiate it and call its `execute` method directly to verify validation behavior.

## Done when these pass

- [ ] **Validation failure returns ToolResponse** — `ToolRegistry.execute` returns a `ToolResponse` with the error in `result` and does not call the executor when input is invalid.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Extra properties pass through** — Input with extra properties (not in schema) is passed to the executor unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Error message content** — Rejection messages name the field path and expected type but NEVER the offending value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Register throws for invalid schema** — `register` throws immediately if the provided JSON Schema is uncompilable.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Function-valued definition validation** — Dynamic tool definitions are validated against their most recent schema.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Static schema compilation caching** — A static tool's schema is compiled only once for performance.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Unknown tool still throws** — `execute` continues to throw for unregistered tool names.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Orchestrator handles rejection** — `ChatOrchestrator` processes a validation rejection as a normal tool result, allowing the model to retry.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` dependencies
- [ ] Implement schema compilation in `ToolRegistry.register` and `ToolRegistry.execute`
- [ ] Implement validation logic in `ToolRegistry.execute`
- [ ] Update `ChatOrchestrator` to handle retries (though it might already if it's just a `ToolResponse`)
- [ ] Update documentation (README, spec.md, adding-a-tool.md)

## Out of scope

- Validating tool output.
- Coercing types or applying defaults.
- Opt-out flag for validation.
- Changing `Unknown tool` throw to a return.