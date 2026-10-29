# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `createChatOrchestrator().processMessage` are existing entry points that expose schema validation and retry behavior. The acceptance tests call these entry points with real definitions and input values.

## Done when these pass

- [ ] **rejects missing, wrong-typed and disallowed input before execution without revealing values** — invalid schema inputs return useful, value-free errors and never run the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes schema-valid input with unlisted properties through unchanged exactly once** — a preceding malformed call is rejected and valid input reaches the executor once without alteration.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid static schema at registration and keeps a compiled static schema for later calls** — startup catches a broken schema and repeated calls use the registered schema.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the current function-valued definition** — a changed dynamic schema rejects input that only the previous schema accepted.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a schema rejection to the provider so a corrected tool call can finish the conversation** — a rejected call becomes model-readable feedback and the corrected retry resolves.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime dependencies and compile static schemas during registration.
- [ ] Validate the current resolved schema before execution and return path-and-constraint errors without input values; preserve unknown-tool throws and accepted input unchanged.
- [ ] Keep validation failures in the tool loop as tool results, bounded by `maxToolRounds`.
- [ ] Update README, tool-author guidance, `.specify/spec.md`, the one-line `execute` comment, changelog, and minor version with the migration note.
- [ ] Run CI build, typecheck, lint, formatting, and tests after implementation.

## Out of scope

- Tool output validation, unknown-tool recovery, authorization, and retry or rate-limit policy.