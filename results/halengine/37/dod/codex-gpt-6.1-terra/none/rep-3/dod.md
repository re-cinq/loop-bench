# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The registry's public `register` and `execute` methods expose the reported behavior directly.

## Done when these pass

- [ ] **rejects missing and invalid fields without invoking the executor or exposing values** — Required, type and enum failures return safe, descriptive results before execution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with extra properties through unchanged exactly once** — Valid calls preserve input without defaults or coercion.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable static schema at registration with the tool name** — Invalid static schemas fail at startup.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema** — Dynamic schemas are resolved for each call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas once at registration and cache dynamic validators by schema object.
- [ ] Validate before execution and return safe constraint and property diagnostics, including in logs.
- [ ] Preserve unknown-tool errors and confirm the orchestrator can return a rejection to the provider for a corrected retry.
- [ ] Update the requested documentation, migration note, minor version and changelog; run the ticket's CI checks.

## Out of scope

- Tool output validation, authorization, retries, timeouts, rate limiting and changing unknown-tool behavior.