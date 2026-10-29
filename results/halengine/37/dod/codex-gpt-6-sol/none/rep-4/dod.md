# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` already expose the schema and execution boundary. The acceptance file exercises both through real definitions and executor functions.

## Done when these pass

- [ ] **rejects missing required input before invoking the executor** — missing fields return a readable tool result without running the executor; valid extra fields pass through unchanged and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong type without echoing the supplied value** — wrong types identify the field and constraint without disclosing the value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema when registering the tool** — a broken schema fails at registration and a valid static schema remains compiled across calls.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the current dynamic schema** — a function-valued definition's changed schema governs the next call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas at registration and cache validators by resolved schema object.
- [ ] Return a safe, path-specific `ToolResponse` for rejected input before executor invocation.
- [ ] Preserve valid input unchanged and keep unknown-tool throws.
- [ ] Feed rejected tool results into the existing bounded orchestrator loop.
- [ ] Update the tool documentation, changelog, runtime dependency, migration note, and minor version as the ticket specifies.

## Out of scope

- Tool output validation, authorization, retry and rate limiting, and changing the unknown-tool error.