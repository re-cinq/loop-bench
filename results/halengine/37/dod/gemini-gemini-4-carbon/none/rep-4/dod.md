# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, `createChatOrchestrator`, and `setLogger` already expose the exact public seams needed to register static and function-valued tool definitions, execute malformed and valid inputs, capture log lines, and drive the orchestrator tool loop directly.

## Done when these pass

- [ ] **enforces required and enum on execute while passing extra keys through unchanged** — `ToolRegistry.execute` returns a rejection `ToolResponse` naming the missing required property or failing enum field with zero executor calls, and passes valid input (including unlisted extra keys, with no injected defaults or coercion) through unchanged.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **names failing paths and expected types while redacting values from results and logs** — `ToolRegistry.execute` rejects wrong-typed and identifying payloads naming the failing field path and expected type, invokes the executor zero times, and emits no input property value in either `ToolResponse.result` or `log` output.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time naming the tool when a static schema cannot be compiled** — `ToolRegistry.register` compiles a static `ToolDefinition.inputSchema` immediately and throws synchronously with a message naming the tool when compilation fails.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates a function-valued tool definition against the schema current at each call** — `ToolRegistry.execute` resolves a function-valued `ToolDefinitionSource` per call and validates against the schema returned for that call rather than a stale earlier schema.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **feeds a schema rejection back through the orchestrator loop so retry resolves** — `ChatOrchestrator.processMessage` surfaces a rejected tool call's `ToolResponse.result` to the provider on the next round and resolves once the retried call satisfies `inputSchema`.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to runtime `dependencies` in `package.json` (syncing `package-lock.json`) and bump `version` to `0.4.0` (MINOR).
- [ ] Compile static `ToolDefinition.inputSchema` once at `ToolRegistry.register` time, throwing an error naming the tool when schema compilation fails.
- [ ] Resolve and compile function-valued `ToolDefinitionSource` schemas on `ToolRegistry.execute`, caching compiled validators by resolved schema object reference.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor (`required`, declared types, and `enum` only — without injecting `additionalProperties: false`, coercing types, or applying defaults), returning a `ToolResponse` and logging only failing property paths and constraints, never property values.
- [ ] Add a one-line JSDoc comment on `ToolRegistry.execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`, while preserving `Unknown tool: <name>` throw for unregistered tool names.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` (including static schema compiled once across ten `execute` calls and `Unknown tool: <name>` throw) and `src/orchestration/chatOrchestrator.test.ts`, cite every added test in `specs/hal-engine-tool-input-validation/spec.md`, and update its `Status` row to `Shipped`.
- [ ] Update `README.md`, `docs/adding-a-tool.md` (and `example/weather-tool.ts` if synced via `docs:check`), `.specify/spec.md`, and `CHANGELOG.md` (`## [Unreleased]` including the MINOR migration note).

## Out of scope

- Returning a `ToolResponse` instead of throwing `Unknown tool: <name>` for unregistered tool names.
- Validating tool output, hallucination detection, or an evaluation harness.
- Per-tool authorization, `beforeToolCall` veto hooks, and retry, timeout, or rate limiting around tool execution.