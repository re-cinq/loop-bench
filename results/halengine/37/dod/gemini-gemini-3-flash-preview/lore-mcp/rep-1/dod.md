# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — The `ToolRegistry` class provides a clear entry point via its `execute` and `register` methods. The acceptance tests call these methods directly to verify validation behavior, schema compilation, and error reporting.

## Done when these pass

- [x] **validates input against schema and returns ToolResponse on failure** — `ToolRegistry.execute` validates input and returns a structured rejection instead of calling the executor when input is invalid.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [x] **passes through extra properties unchanged** — The validator does not strip or modify properties not explicitly listed in the schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [x] **rejects wrong-typed fields without leaking the value** — Error messages contain the failing path and constraint but never the offending value.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [x] **throws at registration time for invalid schemas** — `ToolRegistry.register` validates the schema at registration time to fail early.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [x] **validates function-valued tools against current schema** — Tools with dynamic definitions are validated against the schema resolved at the time of the call.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [x] **maintains Unknown tool throw** — The existing behavior of throwing for unregistered tools is preserved.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` dependencies.
- [ ] Implement schema compilation in `ToolRegistry.register`.
- [ ] Implement input validation in `ToolRegistry.execute`.
- [ ] Implement log/error redaction to avoid leaking values.
- [ ] Add tool-loop acceptance test in `chatOrchestrator.test.ts`.

## Out of scope

- Validating tool output.
- Hallucination detection.
- Per-tool authorization.
- Retry, timeout, and rate limiting around tool execution.