# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are public, synchronous/async seams that can be driven with real definitions and executors. The acceptance file exercises the registry directly without test doubles.

## Done when these pass

- [ ] **ToolRegistry input validation** — rejects malformed schema input before execution, preserves schema-valid input, validates static schemas at registration, and resolves dynamic schemas per call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validation to `ToolRegistry.register` and `ToolRegistry.execute`, returning a redacted `ToolResponse` for rejected input.
- [ ] Cache compiled static schemas and cache function-defined schemas by their resolved schema object.
- [ ] Document the validation and retry contract in the requested user-facing documents and changelog.

## Out of scope

- Unknown tool-name handling, output validation, authorization, retry policy, timeouts, rate limiting, and tool implementation changes.