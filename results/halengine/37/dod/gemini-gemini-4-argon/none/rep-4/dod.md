# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator.processMessage` already exist at their public boundaries and can be called directly in tests to fail on the absent schema validation behaviour.

## Done when these pass

- [ ] **rejects malformed input with a ToolResponse, never invokes the executor, and never leaks offending values** — `ToolRegistry.execute` validates `input` against `definition.inputSchema` before calling the executor, returning a `ToolResponse` whose `result` names the missing required property or failed constraint without including any offending value in `result` or logs, and without invoking the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with extra properties through unchanged and validates against a dynamic schema per call** — Valid input (including undeclared extra properties) reaches the executor unchanged, a static tool's schema is compiled once across ten `execute` calls, and a function-valued `ToolDefinitionSource` validates against the schema returned on each call rather than using a stale cached schema.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time naming the tool when given an uncompilable schema** — `ToolRegistry.register` compiles a static `ToolDefinition.inputSchema` at registration time and throws an error naming the tool if compilation fails.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a schema rejection back to the provider so a corrected retry resolves processMessage** — When the model sends a malformed tool call during `processMessage`, the orchestrator feeds the rejection `ToolResponse.result` back to the provider as `tool_result` content so a corrected call on the next round resolves the turn, while an unknown tool name still throws `Unknown tool: <name>`.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` and compile a static `ToolDefinition.inputSchema` once in `ToolRegistry.register`, throwing an error naming the tool if compilation fails.
- [ ] Validate `input` in `ToolRegistry.execute` against the compiled static validator (or the schema resolved from a function `ToolDefinitionSource` on that call, cached by schema object) before calling `tool.execute`, keeping `execute`'s doc comment to a single line pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] On validation failure, return `{result}` naming the failing property paths and failed constraint (`required`, `type`, `enum`) without invoking the executor and without including offending property values in `result` or log fields.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` with inline `([validated by: ...])` links in `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Update `example/weather-tool.ts`, `docs/adding-a-tool.md` (`npm run docs:fix`), `README.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump `package.json` version MINOR.

## Out of scope

- Changing the unknown-tool behaviour (`Unknown tool: <name>` still throws).
- Injecting `additionalProperties: false`, coercing types, applying schema defaults, or adding an opt-out flag.
- Validating tool outputs, hallucination detection, per-tool authorization, or retry/timeout/rate-limiting around tool execution.