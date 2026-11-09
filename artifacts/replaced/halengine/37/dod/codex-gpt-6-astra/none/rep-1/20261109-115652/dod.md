# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The existing `ToolRegistry.register` and `ToolRegistry.execute` methods accept real schemas and executors. Tests observe returned results, executor inputs, the injected logging sink, and schema-property reads without replacing the registry or validator.

## Done when these pass

- [ ] **rejects malformed calls privately and passes accepted input unchanged** — Missing required fields, incorrect types and invalid enum members return useful private errors without executor calls; valid input retains extra keys and no defaults are inserted; unknown tool names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — Invalid schemas fail immediately naming the tool; a valid schema is consumed at registration and not reread during ten executions.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches by schema identity** — Changing a function-valued definition changes validation immediately; returning to a previously compiled schema reuses it.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator and reject invalid static schemas at registration, naming the tool.
- [ ] Return private validation errors before invoking executors; preserve valid inputs without coercion or defaults and retain the unknown-tool exception.
- [ ] Resolve dynamic schemas per call and cache compilation by schema identity.
- [ ] Verify the orchestrator correction loop and five-round bound once a permitted provider fixture is available: the ticket requests a stub provider, but this task explicitly forbids mocks and stubs, and the built-in mock provider cannot emit tool calls.
- [ ] Point the one-line execute comment to the new contract; update README.md, docs/adding-a-tool.md and .specify/spec.md.
- [ ] Add the npm-facing changelog, MINOR version change and migration note; CI verifies runtime packaging and the full quality checklist.

## Out of scope

- Tool output validation, authorization, transport error changes, execution retries, timeouts and rate limits.
- Production implementation in this acceptance-test commit; documentation and packaging changes remain implementation facets rather than source-text assertions.
- Exact validator implementation internals: schema getter reads expose compilation/reuse without a compiler spy.