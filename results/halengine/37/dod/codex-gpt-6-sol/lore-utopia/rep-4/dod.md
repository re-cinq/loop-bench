# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and the orchestrator's `processMessage` are callable today. The tests exercise their returned results and executor calls through those entry points.

## Done when these pass

- [ ] **returns a required-field result before execution and passes valid extra keys through unchanged** — Invalid input is returned as a correctable result; valid input and unknown names retain their contract.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong type with the property path and constraint but without the identifying value** — The result is useful to the model without echoing data.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable static schema at registration with the tool name** — Broken schemas fail at startup.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses the current schema from a function-valued definition on each call** — A changed schema takes effect for the next call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the provider so it can retry within the tool loop** — The model sees the rejection and the conversation resolves after correction.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate required, type, and enum using the registered JSON Schema before executor invocation; return a `ToolResponse` for rejection.
- [ ] Compile static schemas at registration and reuse them; resolve function-valued definitions per call and cache validators by schema object.
- [ ] Preserve valid extra properties and raw values without coercion or defaults; keep the unknown-tool throw.
- [ ] Include property paths and constraints in rejection text and logs without logging property values.
- [ ] Keep rejection within the orchestrator's bounded tool loop, and add the one-line `execute` comment pointing to the spec.
- [ ] Add the validator to runtime dependencies and verify the built package imports.
- [ ] Update README.md, docs/adding-a-tool.md, .specify/spec.md, CHANGELOG.md, and the MINOR version and migration note.

## Out of scope

- Unknown-tool response changes, tool output validation, authorization, retries, timeouts, rate limits, and tool implementations.