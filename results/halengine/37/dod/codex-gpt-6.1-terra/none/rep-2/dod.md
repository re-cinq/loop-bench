# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The registry's public registration and execution methods expose the validation boundary directly.

## Done when these pass

- [ ] **rejects invalid input before execution without exposing values and preserves valid input** — Required fields, types, enums, privacy, pass-through, and unknown names follow the contract.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them** — Invalid static schemas fail at startup and valid schemas compile once.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema** — Changing definitions are validated per call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas on registration and cache resolved dynamic schemas.
- [ ] Reject malformed input as a value-free tool result before execution, preserving valid input.
- [ ] Verify the tool loop carries rejection text to a corrected retry.
- [ ] Update the named documentation, migration note, minor version and changelog; verify packaging and CI checks.

## Out of scope

- Tool output validation, authorization, execution retries and changing unknown-tool errors.