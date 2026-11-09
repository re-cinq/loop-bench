# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The registry's public registration and execution methods expose the missing validation directly.

## Done when these pass

- [ ] **rejects invalid input and passes valid input through unchanged** — Required, type and enum failures return a readable result without calling the executor; accepted input remains unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid static schema when the tool is registered** — A broken schema fails at registration and identifies the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the current dynamic schema** — A changed dynamic schema governs subsequent calls.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas at registration and cache dynamic schemas by resolved schema object.
- [ ] Return value-free validation errors with property paths and constraints, and keep values out of logs.
- [ ] Preserve unknown-tool errors and pass accepted input through without coercion, defaults or extra-property restrictions.
- [ ] Verify a rejected call can be corrected in the existing bounded tool loop.
- [ ] Update the documentation, changelog, minor version and PR migration note as specified in the ticket.

## Out of scope

- Tool output validation, authorization, unknown-tool behavior changes, and execution retries or timeouts.