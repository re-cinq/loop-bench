# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator.processMessage` already exist and can be called directly with real tool definitions and schemas.

## Done when these pass

- [ ] **ToolRegistry input validation rejects a call missing a required field with a ToolResponse and never invokes the executor** — `ToolRegistry.execute` validates `input` against `inputSchema` before calling the executor, returning a `ToolResponse` naming the missing required property (`location`) without invoking the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **ToolRegistry input validation rejects a wrong-typed field without leaking the offending value in the response or logs, and passes valid input with extra properties unchanged** — A field with the wrong type is rejected with a message naming the field path and expected type without including any offending value in the returned `result` or log output, and valid input carrying unlisted extra properties reaches the executor unmodified.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **ToolRegistry input validation throws at register time naming the tool for an uncompilable static schema and validates function-valued definitions against the current call schema** — `ToolRegistry.register` compiles a static tool's `inputSchema` eagerly and throws an error naming the tool when compilation fails, while a function-valued `ToolDefinitionSource` validates each `execute` call against the schema returned on that call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **ToolRegistry input validation returns the schema rejection to the model as a tool_result on the next round so the orchestrator loop recovers on retry** — When a tool call fails schema validation during `ChatOrchestrator.processMessage`, the rejection is returned to the provider as a `tool_result` message on the next round rather than throwing out of the turn, allowing a corrected retry to succeed.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to runtime `dependencies` in `package.json` and compile tool `inputSchema` definitions in `ToolRegistry` (at `register` time for static definitions, throwing with the tool name on invalid schemas, and cached by schema object reference for function-valued definitions).
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning `{result: '<what was wrong>'}` naming the failing property paths and constraints without ever logging or returning offending property values, and add the one-line JSDoc comment on `execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` covering static single-compilation across ten calls, unknown tool throws, value redaction, extra-property pass-through, and tool-loop retry, citing `specs/hal-engine-tool-input-validation/spec.md` and flipping its status to `Shipped`.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `example/weather-tool.ts` (if synced with doc blocks), `.specify/spec.md`, and `CHANGELOG.md` to document runtime schema validation and the minor-version migration note.

## Out of scope

- Changing the `Unknown tool: <name>` throw in `ToolRegistry.execute` to a returned `ToolResponse`
- Validating tool output, hallucination detection, or evaluation harnesses
- Per-tool authorization or `beforeToolCall` veto hooks
- Retry, timeout, or rate limiting around tool execution