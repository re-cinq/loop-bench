# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already exist with their production signatures, so the acceptance tests invoke the real registry and orchestrator entry points directly and fail on the missing schema validation and compilation behaviour.

## Done when these pass

- [ ] **ToolRegistry input validation rejects a call missing a required field with a ToolResponse and never invokes the executor** — `ToolRegistry.execute` validates `input` against the tool's `inputSchema` before invoking the executor, returning a `ToolResponse` whose `result` names the missing required field without calling the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry input validation rejects a wrong-typed field naming the field path and expected type without leaking the value into the result or log** — `ToolRegistry.execute` rejects a wrong-typed field with a `ToolResponse` naming the field path and expected type, logs a warning in the `tool` category naming the failing property path without logging raw property values, and excludes the offending field value from the rejection text.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry input validation throws synchronously at register time naming the tool when a static inputSchema is uncompilable** — `ToolRegistry.register` compiles a static `ToolDefinition.inputSchema` once at registration time and throws synchronously naming the tool when the schema cannot be compiled.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry input validation validates each execute call against the schema returned by a function-valued definition at that call** — When a tool is registered with a function-valued `ToolDefinitionSource`, `ToolRegistry.execute` resolves the definition on each call and validates `input` against the `inputSchema` returned for that call.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry input validation delivers a validation rejection to the model as a tool result so the next round can retry with valid input** — In a `ChatOrchestrator` tool loop, a schema-rejected tool call returns a `ToolResponse` rather than throwing, delivering the rejection text to the provider in the `tool_result` block so the model can retry with valid arguments on the next round and resolve `processMessage`.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`, compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing synchronously with the tool name on an invalid schema), and resolve/cache function-valued `ToolDefinitionSource` schemas per `execute` call.
- [ ] Validate `input` in `ToolRegistry.execute` against `required`, declared types, and `enum` constraints without injecting `additionalProperties: false`, coercing types, or applying defaults.
- [ ] Return a `ToolResponse` describing the failing property paths and violated constraint on validation failure without invoking the executor, and log the failure in the `tool` category without logging or returning raw property values.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` with spec citations in `specs/hal-engine-tool-input-validation/spec.md`, and update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md`.

## Out of scope

- Changing `Unknown tool: <name>` from throwing to returning a `ToolResponse`.
- Validating tool output (`ToolResponse.result`).
- Hallucination detection and evaluation harness (ADR-002).
- Per-tool authorization and `beforeToolCall` hook veto semantics.
- Retry, timeout, and rate limiting around tool execution.