# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` are already public seams with direct callers; the acceptance tests invoke them with real tool definitions and schemas and fail today because `register` does not compile `inputSchema` and `execute` calls the executor without validating `input`.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — `ToolRegistry.execute` validates `input` against `inputSchema` before calling the executor, returning a `ToolResponse` describing the missing required property with `0` executor invocations
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field naming the property path and expected type without leaking any input value** — `ToolRegistry.execute` rejects wrong-typed properties with a `ToolResponse` naming the field path and expected type while omitting all property values from both the returned result and logger output
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws synchronously at register time when the inputSchema is uncompilable and names the tool** — `ToolRegistry.register` compiles a static tool definition's `inputSchema` eagerly and throws synchronously naming the tool when compilation fails
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **feeds a rejected tool call back to the provider as a tool_result so a corrected retry resolves processMessage** — `ChatOrchestrator.processMessage` forwards a schema rejection `ToolResponse` to the provider on the next tool round instead of throwing, allowing the model to retry with valid input and resolve the turn
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (configured without type coercion, default assignment, or `additionalProperties: false` injection)
- [ ] Compile static `ToolDefinition` schemas at `ToolRegistry.register` time (throwing synchronously with the tool name on invalid schema) and cache compiled validators by schema reference for function-valued `ToolDefinitionSource` definitions
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning `{result: '<what was wrong>'}` and logging only property paths and failed constraints (never input property values)
- [ ] Add `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` unit tests covering extra-property passthrough (`toEqual`), dynamic function-valued schema changes across calls, single compilation across ten static calls, `Unknown tool: <name>` throw preservation, and spec citations in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add the one-line JSDoc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md` and update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md`

## Out of scope

- Changing the `Unknown tool: <name>` throw to a returned `ToolResponse`
- Validating tool output or adding an evaluation harness
- Per-tool authorization or `beforeToolCall` veto hooks
- Retry, timeout, or rate limiting around tool execution