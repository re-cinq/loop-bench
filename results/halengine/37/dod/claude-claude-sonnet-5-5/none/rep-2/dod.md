# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are the real entry points and are callable today; they simply perform no validation, so the tests fail on behaviour.

## Done when these pass

- [ ] **Missing required property** — `execute('weather', {})` returns a result naming `location` as required; executor not called.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Wrong type** — rejection names path and expected type; neither the result nor any log line contains the value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Uncompilable schema** — `register` throws, message names the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Function-valued definition** — validated against the schema current at each call; extra properties pass through to the executor unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; validate in `execute`, return a `ToolResponse` on rejection (redacting values)
- [ ] Compile static schemas in `register`, naming the tool on failure
- [ ] Resolve and cache function-valued schemas per call by schema object
- [ ] Update docs, README, `.specify/spec.md`, CHANGELOG, one-line doc comment on `execute`
- [ ] Add own tests for: compile-once across ten calls, `Unknown tool` still throws, chatOrchestrator retry loop

## Out of scope

- Unknown-tool throw behaviour, output validation, authorization, retry/timeout/rate limiting.
- Pass-through of extra properties on valid input and `Unknown tool` throw already hold today, so they are not red here.