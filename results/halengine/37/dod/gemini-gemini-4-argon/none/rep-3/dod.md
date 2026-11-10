# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already expose the exact entry points this ticket changes, so the acceptance tests call them directly and fail today because `register` never compiles `inputSchema` and `execute` invokes the tool executor without validating `input`.

## Done when these pass

- [ ] **rejects input that violates a static schema without calling the executor or leaking the offending value to the result or logs** — `ToolRegistry.execute` validates `input` against a static `inputSchema` before calling the executor, returns a rejection `ToolResponse` naming the failing property and constraint when a required property is missing or has the wrong type, never invokes the executor, and omits the offending property value from both `result` and emitted log lines.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time naming the tool when a static inputSchema cannot be compiled** — `ToolRegistry.register` compiles a static tool definition's `inputSchema` at registration time and throws an error naming the tool when the schema is invalid.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates against the schema returned by a function-valued tool definition on each call rather than a stale cached schema** — `ToolRegistry.execute` resolves a function-valued `ToolDefinitionSource` on each call and validates `input` against the schema current at that call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a schema rejection back to the provider as a tool_result and resolves when the model retries with valid input** — in `ChatOrchestrator`, a rejected tool call returns its rejection `ToolResponse.result` into the next round's `tool_result` message rather than throwing, allowing the model to retry with valid arguments and `processMessage` to resolve.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` (and `package-lock.json`) and compile static `inputSchema` definitions at `ToolRegistry.register` time, throwing an error naming the tool when compilation fails.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor (supporting both static schemas compiled at registration and function-valued `ToolDefinitionSource` schemas resolved per call and cached by schema object), logging a warning and returning a rejection `ToolResponse` that names the failing property paths and constraints without including any property values.
- [ ] Add the one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` covering all acceptance criteria (missing required field, extra property pass-through without coercion or defaults, wrong-typed field without value leakage, uncompilable schema at `register`, dynamic function-valued definition, static schema compiled once across ten `execute` calls, unknown tool name throw, and orchestrator tool-loop retry) and link every test in `specs/hal-engine-tool-input-validation/spec.md` (updating its status to `Shipped`).
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump the version (MINOR).

## Out of scope

- Changing `execute`'s `Unknown tool: <name>` throw into a `ToolResponse` (tracked separately).
- Validating tool output, hallucination detection, or an evaluation harness.
- Per-tool authorization or `beforeToolCall` veto hooks.
- Retry, timeout, or rate limiting around tool execution.