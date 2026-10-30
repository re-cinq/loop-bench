# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are existing public seams that expose both schema lifecycle and execution behavior without a mock or production change.

## Done when these pass

- [ ] **validates model input before invoking a tool and preserves valid input** — rejects required, type, and enum violations without invoking the executor or leaking rejected values; passes valid input and extra properties through unchanged exactly once; and preserves the thrown error for an unknown name
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and resolves dynamic schemas per call** — rejects a broken static schema at registration and uses each function-valued definition's current schema
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator as a runtime dependency and compile static schemas during registration.
- [ ] Validate resolved dynamic definitions per call with schema-object caching, returning redacted `ToolResponse` failures before execution.
- [ ] Keep unknown-tool failures thrown and point the one-line `execute` doc comment to the full validation spec.
- [ ] Update the tool loop coverage to show a rejected call can be corrected within the bounded retry loop.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and the minor-version migration note.

## Out of scope

- Tool output validation, authorization, hallucination detection, timeouts, rate limiting, and changing the unknown-tool error contract.