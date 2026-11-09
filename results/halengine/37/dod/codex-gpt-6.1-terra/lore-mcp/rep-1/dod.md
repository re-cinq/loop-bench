# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The registry's public register and execute methods provide the real entry point for observing schema validation and executor calls.

## Done when these pass

- [ ] **rejects invalid input and passes valid input through unchanged** — Required fields, types and enums are enforced without changing accepted input or exposing rejected values.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid static schema when the tool is registered** — Invalid static schemas fail at registration with the tool named.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the current dynamic definition** — Dynamic schemas are resolved for each execution.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas once at registration and dynamic schemas per resolved schema object.
- [ ] Reject invalid input with a value-free tool result before execution, preserving valid input and unknown-tool errors.
- [ ] Return validation feedback through the tool loop for a corrected retry and keep logs free of input values.
- [ ] Update the requested documentation, migration note, minor version and changelog; verify the dependency is packaged.

## Out of scope

- Tool output validation, authorization, unknown-tool error changes, execution retries and actual tool implementations.