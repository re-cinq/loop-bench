# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are real entry points that can be called today with real tool definitions; the tests fail on missing validation behaviour.

## Done when these pass

- [ ] **rejects input missing a required property, naming it, without running the executor** — rejection is a returned `ToolResponse` naming `location`; executor call count is 0.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed property naming its path and type, never echoing the value in result or logs** — message names the field and expected type; the offending value appears in neither the result nor any log line.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register for an uncompilable schema, naming the tool** — fails at startup, not mid-conversation.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call** — no stale cached schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to dependencies; validate in `execute`, returning a `ToolResponse` on rejection
- [ ] Compile static schemas at `register`, naming the tool on failure
- [ ] Resolve and compile function-valued sources per call, cached by schema object
- [ ] Keep values out of messages and logs
- [ ] Orchestrator tool-loop test, docs, README, `.specify/spec.md`, CHANGELOG (ticket acceptance criteria)

## Out of scope

- Unknown-tool throw (unchanged; already green) and extra-property pass-through (already true today, so no red test; pin it in the implementation round).
- Compile-once across ten calls: unobservable without a spy on ajv; left to the implementing round.
- Validating tool output, authorization, retry/timeout.