# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are public seams that exercise validation and executor invocation with real schemas and values. The acceptance contract observes returned tool responses and registration failures without validator spies or test doubles.

## Done when these pass

- [ ] **ToolRegistry input-schema validation** — rejects malformed model input before executor invocation, preserves valid input, validates dynamic definitions per call, rejects invalid static schemas, and preserves the unknown-tool throw.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validation at the registry boundary, returning redacted `ToolResponse` diagnostics for schema failures.
- [ ] Compile static schemas during registration and cache schemas resolved from function-valued definitions by resolved schema object.
- [ ] Preserve unknown-tool throws and pass schema-valid extra properties to executors unchanged.
- [ ] Update the tool documentation, README, repository spec, changelog, dependency manifest, and release migration note to state the validation boundary.

## Out of scope

- Unknown tool names as tool results, output validation, authorization, retries, timeouts, rate limiting, and tool implementations.