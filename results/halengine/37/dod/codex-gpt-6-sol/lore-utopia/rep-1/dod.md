# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are callable today, and `createChatOrchestrator` exposes the existing tool loop. The acceptance file exercises these entry points with registered tool definitions and a provider that issues two calls.

## Done when these pass

- [ ] **Registry input validation and recovery** — schema rejection, safe diagnostics, unchanged accepted input, registration failure, dynamic definitions, static validator reuse, and an orchestrator retry.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static JSON Schemas at registration; reject invalid schemas with the tool name.
- [ ] Resolve function-valued definitions for each call and cache compiled validators by resolved schema object.
- [ ] Return value-free validation errors for required, type and enum failures before invoking executors; retain the unknown-tool throw.
- [ ] Preserve accepted inputs, including extra keys, without coercion or defaults; keep rejected values out of logs.
- [ ] Feed rejection results through the bounded tool loop so a provider can retry.
- [ ] Add Ajv to runtime dependencies, update the tool docs and changelog, and make the minor-version migration note.
- [ ] Update the new spec's coverage status after implementation and keep its test anchors aligned.

## Out of scope

- Tool output validation, authorization, retry policies, rate limiting, and changing the unknown-tool behavior.