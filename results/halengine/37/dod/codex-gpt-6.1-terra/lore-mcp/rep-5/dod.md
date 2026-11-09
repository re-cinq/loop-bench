# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The registry's public registration and execution methods expose the validation boundary directly. The named validation spec does not yet exist, so its observable contract is recorded alongside the tests.

## Done when these pass

- [ ] **rejects invalid input before execution while preserving valid input** — Required, type and enum violations return readable errors before execution; accepted input passes through unchanged and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a malformed static schema at registration with the tool name** — Invalid static schemas fail at registration.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamically resolved schema without exposing input values** — Dynamic schemas are current per call and rejection text and logs do not disclose values.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas at registration and cache dynamic schemas by resolved object; add the validator as a runtime dependency.
- [ ] Validate required fields, types and enum without coercion, defaults or excluding extra properties; return safe, descriptive results before execution.
- [ ] Verify compilation reuse across ten calls and a corrected retry through the real tool loop; keep unknown-name errors unchanged.
- [ ] Update the registry comment, documentation, system spec, changelog, minor version and PR migration note as specified in the ticket.
- [ ] Run the ticket's CI checks and cite any additional tests in the spec.

## Out of scope

- Tool output validation, unknown-tool handling changes, authorization, execution retries, timeouts, rate limits and tool implementations.