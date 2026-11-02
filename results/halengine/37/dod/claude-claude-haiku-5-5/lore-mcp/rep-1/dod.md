# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`.

**Strategy: `direct`** — `ToolRegistry.execute` and `ToolRegistry.register` are already the real entry points, and `createChatOrchestrator` drives the tool loop through them, so every acceptance test calls production code today and fails on behaviour (no validation). No new seam is needed.

## Done when these pass

- [ ] **returns a rejection naming a missing required property and never invokes the executor** — `execute('get_weather', {})` returns a result naming `location` as required, and the executor is called zero times
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed property with its path and expected type, never echoing the value** — `{location: 4815162342}` is rejected with a result naming `location` and `string`, and the result does not contain the value
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws a message containing `broken_tool`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the schema its source returns at that call, not a cached one** — after the source's schema changes to require `city`, a call without it is rejected naming `city`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **hands a rejected tool call to the model as a result, so a corrected retry completes the turn** — `processMessage` resolves with the provider's text, and the provider's second request carries the rejection text naming `location`
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` (not `peerDependencies` or `devDependencies`)
- [ ] Compile a static tool's schema once in `register`; resolve and compile a function-valued source per call, cached by the resolved schema object
- [ ] `execute` returns a `ToolResponse` with `result` describing the failure for input the schema rejects; the executor is never invoked on rejection
- [ ] Rejection text and log lines name failing property paths and the failed constraint, never a property value; a rejected payload with an identifying field produces no log line and no returned text containing that value
- [ ] `execute` keeps throwing `Unknown tool: <name>` for an unregistered name (passes today; keep it green)
- [ ] `execute` carries a one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md` and `.specify/spec.md` to match the new contract
- [ ] `CHANGELOG.md` entry written for npm readers
- [ ] Add a `src/orchestration/tools/registry.test.ts` pin that valid input with an unlisted extra property reaches the executor unchanged, exactly once (passes today; a guard against defaults or coercion being added)

## Out of scope

- Validating tool output
- Hallucination detection and an evaluation harness
- Per-tool authorization (a `ToolContext` concern owned by another issue)
- Retry, timeout and rate limiting around tool execution
- Changing the `Unknown tool: <name>` throw (tracked as "Return an unknown tool name to the model instead of throwing")
- Any concrete tool implementation, including `example/weather-tool.ts`
- The MINOR version bump and migration note in the PR body (owed by the implementation PR, not by a test)