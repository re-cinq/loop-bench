# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is already a public behavioral seam, and the existing orchestrator accepts a real `ToolRegistry` plus an `AIProvider` implementation. The tests exercise both entry points without changing production code.

## Done when these pass

- [ ] **validates calls before execution without changing valid input or disclosing values** — rejects missing and wrong-typed fields before execution, preserves valid input including extra keys, redacts values, and retains the unknown-tool throw
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles and checks a static schema at registration only** — rejects a broken static schema at registration and does not revisit it during ten executions
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema** — resolves and validates changing function-valued definitions per call
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a schema rejection to the model so it can correct the call** — keeps a malformed call inside the bounded tool loop and permits a corrected retry to resolve
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema dependency and compile static schemas during `register`.
- [ ] Resolve dynamic definitions per execution and cache validators by resolved schema object.
- [ ] Return value-redacted validation failures as `ToolResponse` values before invoking executors, while preserving unknown-tool throws and valid input exactly.
- [ ] Document the execution contract with the required one-line code comment, README and tool-author guidance, and update `.specify/spec.md`.
- [ ] Add the npm-facing changelog entry and record the MINOR migration note in the PR body.

## Out of scope

- Tool-output validation, unknown-tool recovery, authorization, retry policy, timeouts, rate limiting, and changes to individual tool implementations.