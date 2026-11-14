# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry` (`register`, `execute`) and `createChatOrchestrator` (`processMessage`) already expose the public entry points where tool schemas are registered and tool calls are executed, so the acceptance tests call them directly with real instances and fail today on absent validation.

## Done when these pass

- [ ] **returns a schema rejection to the model so a corrected retry runs the executor** — missing required fields resolve to a rejection `ToolResponse` naming the field without calling the executor, the orchestrator feeds that rejection to the next model round as a `tool_result`, and a corrected retry with an unlisted extra property and omitted defaulted field passes through to the executor unchanged.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the failing field and expected type while omitting values from result and logs** — a wrong-typed field skips the executor without coercing types, names the failing property path and expected type in `result` and logs, and leaks neither the offending value nor sibling identifying input values into `result` or log records.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time naming the tool when a static inputSchema is invalid** — `ToolRegistry.register` compiles a static `ToolDefinition`'s `inputSchema` eagerly and throws synchronously with the tool's name when compilation fails.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the schema a function-valued definition returns** — a function-valued `ToolDefinitionSource` resolves its current `inputSchema` on each `execute` call rather than reusing a stale schema from an earlier call, enforcing `enum` against the active schema.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` and compile static `inputSchema` objects once in `ToolRegistry.register`, throwing an error that names the tool when compilation fails.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor (enforcing `required`, types, and `enum` with no `additionalProperties: false` injection, coercion, or defaults), caching validators for function-valued `ToolDefinitionSource` schemas by schema reference.
- [ ] Format schema rejections as `{result}` naming failing property paths and constraints while omitting all property values from both `result` and structured log fields, and add the one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` (including single-compile across ten static calls and unchanged `Unknown tool: <name>` throw), link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md` (`Status` -> `Shipped`), and update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and the MINOR version if required.

## Out of scope

- Changing `Unknown tool: <name>` from a thrown error to a returned `ToolResponse`.
- Validating tool output, hallucination detection, or an evaluation harness.
- Per-tool authorization or `beforeToolCall` hook veto handling.
- Retry, timeout, or rate limiting around tool execution, and concrete domain tool implementations.