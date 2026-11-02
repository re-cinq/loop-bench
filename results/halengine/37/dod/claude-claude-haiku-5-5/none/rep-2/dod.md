# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are already the real entry points, so the acceptance tests call them directly and fail on behaviour. No seam is missing.

## Done when these pass

- [ ] **rejects input missing a required property and names it, without calling the executor** — a tool requiring `location` called with `{}` returns a result naming `location`, and the executor is never invoked
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed property naming its path and expected type, never the offending value** — a number where a string is required is rejected with a message naming `location` and `string`, without the value, and the executor is never invoked
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] `execute` validates `input` against the resolved `inputSchema` and returns a `ToolResponse` on rejection, without calling the executor
- [ ] `register` compiles a static schema once and throws, naming the tool, for an uncompilable schema
- [ ] A function-valued definition is validated against the schema current at each call
- [ ] Rejection messages name property paths and constraints, never values, in returned text and logs
- [ ] `chatOrchestrator` round-trips a rejected call and a corrected retry without rejecting `processMessage`
- [ ] `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `CHANGELOG.md` and the `dependencies` entry for `ajv` are updated

## Out of scope

- Changing the `Unknown tool: <name>` throw (pinned as-is, tracked separately)
- Validating tool output, hallucination detection, evaluation harnesses
- Per-tool authorization and `beforeToolCall` veto
- Retry, timeout and rate limiting around tool execution
- Any concrete tool implementation
- Injecting `additionalProperties: false`, type coercion, defaults, or an opt-out flag