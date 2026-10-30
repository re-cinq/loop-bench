# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are public behavioral seams that expose registration timing, validation responses, executor calls, and dynamic-definition resolution without production changes or test doubles.

## Done when these pass

- [ ] **returns value-redacted schema errors without invoking the executor** — malformed calls return actionable schema failures and never reach the executor, while valid input including unknown properties passes through exactly once and unchanged
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects broken static schemas at registration and validates each dynamic definition as resolved** — static schema errors surface at startup, dynamic schemas stay current, and unknown tools still throw
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validation at the registry boundary and return value-redacted rejection results.
- [ ] Compile static schemas during registration and cache dynamic schemas by resolved object identity.
- [ ] Preserve valid input exactly, including unknown properties, and preserve the unknown-tool exception.
- [ ] Carry rejection results through the bounded tool loop so a provider can correct a malformed call.
- [ ] Document the executor contract, migration note, dependency, version, and changelog changes required by the ticket.

## Out of scope

- Tool output validation, authorization, retry, timeout, rate limiting, and changing the unknown-tool exception.