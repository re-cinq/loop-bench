# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — A seam already exists in `ToolRegistry.execute`. I can call it with various inputs and verify that it validates them against the `inputSchema` and returns a `ToolResponse` on failure.

## Done when these pass

- [ ] **Validates input against inputSchema** — `ToolRegistry.execute` validates input and returns a `ToolResponse` with the error message if validation fails, and the executor is not called.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Throws on invalid schema at registration** — `ToolRegistry.register` throws if the provided schema is invalid (not a valid JSON schema or uncompilable).
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Passes extra properties through** — Valid input with unlisted extra properties is passed to the executor unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Rejected payload redacts values** — Rejection messages and log lines name failing property paths but never property values.
      `src/orchestration/tools/registry.acceptance.test.ts`
      `src/orchestration/tools/registry_logs.acceptance.test.ts`
- [ ] **Static schema compiled once** — A static tool's schema is compiled once across multiple calls.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Dynamic schema re-evaluates** — A tool with a function-valued definition is validated against the current schema.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Maintains Unknown Tool error** — `execute` still throws `Unknown tool: <name>` for unregistered names.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool loop retry** — A malformed tool call rejection result is fed back to the model so it can correct the call.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **One-line doc comment** — `ToolRegistry.execute` carries a one-line doc comment pointing to the spec.
      `src/orchestration/tools/registry.ts`

## Facets

- [x] Create `src/orchestration/tools/registry.acceptance.test.ts` with tests for basic validation.
- [x] Add test for invalid schema at registration.
- [x] Add test for extra properties passthrough.
- [x] Add test for value redaction in rejection messages.
- [x] Create `src/orchestration/tools/registry_logs.acceptance.test.ts` for log redaction validation.
- [x] Add test for static schema compilation optimization.
- [x] Add test for dynamic schema re-validation.
- [x] Add test for unknown tool name throw.
- [x] Update `chatOrchestrator.test.ts` with a tool-loop test for retry behavior (added as a new acceptance test file).
- [ ] Add one-line doc comment to `ToolRegistry.execute`.

## Out of scope

- Validating tool _output_.
- Hallucination detection.
- Per-tool authorization.
- Retry, timeout, and rate limiting around tool execution.
- Unknown tool name returning to model (stays as throw).