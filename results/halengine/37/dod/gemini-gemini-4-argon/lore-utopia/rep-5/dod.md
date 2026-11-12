# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry` (`register`, `execute`) and `createChatOrchestrator` (`processMessage`) already exist at their public seams, so acceptance tests can call them directly today and fail on the missing schema validation and compile-time schema check.

## Done when these pass

- [ ] **rejects malformed input without calling the executor or leaking field values** — `ToolRegistry.execute` rejects input missing a `required` field or carrying a wrong property type / invalid `enum` value with a `ToolResponse` naming the field path and constraint, never invokes the executor on rejected input, never leaks rejected property values into `result` or log lines, and passes valid input with unlisted extra properties through to the executor unchanged.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time when a static inputSchema is uncompilable, naming the tool** — `ToolRegistry.register` compiles a static `ToolDefinition.inputSchema` at registration time and throws synchronously with a message naming the tool when the schema is invalid.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued tool definition against the schema returned for that call** — a function-valued `ToolDefinitionSource` is resolved on each `execute` call and validated against the `inputSchema` returned for that call rather than a stale cached schema from an earlier call.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **delivers a validation rejection as a tool_result so a corrected retry succeeds** — in `createChatOrchestrator`, a rejected tool call returns its `ToolResponse.result` in the next round's `tool_result` block without throwing or invoking the executor, allowing the provider to retry with valid arguments and `processMessage` to resolve.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to runtime `dependencies` in `package.json` and compile static tool schemas in `ToolRegistry.register`, throwing synchronously with the tool name when compilation fails.
- [ ] Validate `input` in `ToolRegistry.execute` against the compiled static validator or a WeakMap-cached validator for the schema returned by a function-valued `ToolDefinitionSource`, enforcing `required`, declared `type`, and `enum` without injecting `additionalProperties: false`, coercing types, or applying defaults.
- [ ] Return a `ToolResponse` whose `result` names the failing property paths and constraints (and never property values), log a structured rejection line without raw property values, and add the one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` covering every acceptance criterion (including single compilation across 10 static calls and the unchanged `Unknown tool: <name>` throw), link all statements in `specs/hal-engine-tool-input-validation/spec.md`, and update its status to `Shipped`.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump the package version (MINOR).

## Out of scope

- Turning `Unknown tool: <name>` into a `ToolResponse` instead of throwing.
- Validating tool output, hallucination detection, or an evaluation harness.
- Per-tool authorization (`beforeToolCall` hook or `ToolContext` access control).
- Retry, timeout, or rate limiting around tool execution.