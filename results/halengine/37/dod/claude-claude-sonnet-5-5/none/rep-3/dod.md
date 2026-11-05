# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are the real entry points and can be called today; the acceptance tests fail because no validation happens.

## Done when these pass

- [ ] **rejects input missing a required property with a result naming it, without running the executor** — `execute('weather', {})` returns a ToolResponse naming `location`; executor call count 0.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming its path and expected type but never its value** — number for a string field is rejected with path and type, value absent.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — fail at startup, not mid-conversation.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call** — no stale cached schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add ajv to dependencies; validate in `execute`, returning a ToolResponse on failure
- [ ] Compile static schemas at `register`, naming the tool on failure
- [ ] Per-call resolve and cache by schema object for function-valued definitions
- [ ] Docs, README, .specify/spec.md, CHANGELOG per the ticket

## Out of scope

- The `Unknown tool: <name>` throw (unchanged), output validation, authorization, retry/timeout.
- Ticket criteria not pinned here (extra-property passthrough, compile-once count, orchestrator retry loop, log redaction, docs) are for the implementing rounds' own tests.