# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `ToolRegistry.register` and `execute` methods expose the validation boundary directly, including function-valued definitions. Tests use real schemas, executors and a logger sink without replacing production modules.

## Done when these pass

- [ ] **rejects malformed calls privately and passes valid input unchanged** — Required, type and enum rejection returns corrective text without executing; logs and responses omit identifying values; valid extra properties survive without coercion or defaults; unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — Invalid schemas throw with the tool name at startup; schema property reads occur during registration and do not recur during ten executions.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses the current dynamic schema and caches each resolved schema object** — Changed schemas immediately change acceptance, while repeated calls with the same schema reuse compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas at registration, naming the tool on compilation failure.
- [ ] Return value-free property/constraint diagnostics before execution for schema-invalid input; preserve valid input, response normalization and unknown-name errors.
- [ ] Resolve function-valued definitions per call and cache validators by schema object identity.
- [ ] Pin rejection followed by corrected retry through processMessage, including provider-visible rejection text and the existing round bound; resolve the ticket's request for a stub provider against this task's prohibition on stubs before adding that fixture.
- [ ] Add the one-line execute comment pointing to the contract; update README.md, docs/adding-a-tool.md and .specify/spec.md without source-text assertion tests.
- [ ] Add the consumer-facing changelog, MINOR version bump and migration note; CI proves the runtime import, build, types, lint and remaining suite.

## Out of scope

- Unknown-tool behavior changes, output validation, authorization, execution retries/timeouts/rate limiting, and tool implementations.
- New provider doubles: this task prohibits mocks and stubs, including the stub-provider fixture explicitly requested by the ticket.
- Descriptor tooling changes: .lore/test-commands.yml uses scripts/lore-list-tests.mjs, which currently emits only id/name/file; spec anchors are stamped in test comments and linked inline in the new spec.