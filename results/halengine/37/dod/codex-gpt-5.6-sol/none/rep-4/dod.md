# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are existing public seams for schema lifetime and execution behavior, and the existing orchestrator accepts a provider and registry for the bounded retry path.

## Done when these pass

- [ ] **rejects invalid private input before execution and passes valid extra properties through unchanged** — required and type failures are safe tool results, while valid input is neither coerced nor stripped
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a broken schema when registering its named tool and preserves the unknown-tool error** — broken static schemas fail at startup without changing unknown-name behavior
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps using the schema compiled when a static tool was registered** — ten executions reuse the registration-time schema rather than recompiling a mutated object
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each function-valued definition against the schema resolved for that call** — dynamic definitions do not reuse a stale schema
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejection to the model so it can correct the call within the tool loop** — malformed input does not reject the conversation and the next round sees the actionable result
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator as a production dependency and compile static schemas during registration.
- [ ] Validate resolved definitions before execution, returning path-and-constraint errors without values and preserving valid input unchanged.
- [ ] Cache dynamic validators by resolved schema object while resolving function-valued definitions per call.
- [ ] State the registry contract in its one-line source comment, public documentation, system specification, changelog, and migration note.
- [ ] Keep unknown-tool errors unchanged and verify the package build/import and full CI gates.

## Out of scope

- Tool output validation, authorization, execution retries, timeouts, rate limiting, and changing the unknown-tool error into a tool result.