# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies` — not a second, hand-written schema in a different format, since the schema already has to match what is handed to the providers.

**Strategy: `direct`** — `ToolRegistry.execute` is already the real caller-facing seam. The acceptance tests register real tools and call the registry directly, without mocks or production-code changes.

## Done when these pass

- [ ] **rejects schema-invalid input without invoking the executor or exposing the offending value** — missing required and wrong-typed input returns a descriptive `ToolResponse`, leaves the executor untouched, and redacts the offending value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **forwards valid input with an extra property unchanged exactly once** — valid input and undeclared properties reach the executor unchanged in one call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and resolves function-valued schemas for each execution** — invalid static schemas fail at registration with the tool name, and changing definition sources are validated against the schema current to each call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the registry acceptance tests against the existing `ToolRegistry` seam.
- [ ] Add the missing spec statements and link each acceptance test to its contract.
- [ ] Implement schema validation, safe rejection responses, static compilation, and per-call dynamic schema resolution in a later round.

## Out of scope

- Unknown-tool behavior, tool output validation, orchestrator retry-loop integration, documentation, dependency/build checks, and migration/versioning work are not pinned by these direct registry tests.