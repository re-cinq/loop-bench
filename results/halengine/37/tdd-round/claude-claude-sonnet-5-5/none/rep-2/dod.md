# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute` and `createChatOrchestrator` already expose the exact entry points this ticket changes, so the acceptance tests call them directly today and fail because schema compilation and input validation are absent.

## Done when these pass

- [ ] **rejects input missing a required property with a ToolResponse and never calls the executor** — `ToolRegistry.execute` validates `input` against `inputSchema`, returns a `ToolResponse` naming the missing required property, and does not invoke the executor.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed property naming the field and expected type without leaking the offending value to the result or logs** — `ToolRegistry.execute` rejects a property with the wrong JSON Schema type without calling the executor, names the failing field path and expected type in `result`, and omits the offending property value from both `result` and emitted log lines.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time naming the tool when a static inputSchema cannot be compiled** — `ToolRegistry.register` compiles a static `ToolDefinition`'s `inputSchema` once at registration time and throws synchronously naming the tool when the schema is invalid.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a schema rejection as a tool_result in the orchestrator loop so the model can correct the call on the next round** — `createChatOrchestrator` feeds a schema-rejected tool call's `ToolResponse.result` back to the provider as a `tool_result` without invoking the executor on the invalid call, allowing the model to retry with valid arguments and complete the turn.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [x] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`) and bump the package version `MINOR`.
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
- [x] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.
  - [x] compile-once and unknown-tool unit tests (registry.test.ts, linked in spec); remaining: required/wrong-type/register-throws unit tests, no-leak logs, chatOrchestrator tool-loop, execute comment, docs

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.

- [ ] Remaining unit tests in registry.test.ts (required, wrong type, register throws, function-valued, compile-once, unknown tool, no-leak logs) and chatOrchestrator.test.ts; one-line doc comment on execute; docs/README/.specify/CHANGELOG/example/ADR-002 updates.

- [x] Unit test: function-valued schema validated per call (registry.test.ts, linked in spec).
- [ ] Remaining unit tests: required, wrong type, register throws, compile-once, unknown tool, no-leak logs, chatOrchestrator.test.ts tool-loop; one-line doc comment on execute; docs/README/.specify/CHANGELOG/example/ADR-002 updates.

- [x] CI repair: ajv default import (`AjvModule.Ajv`), error `cause`, acceptance-test lint shape, CHANGELOG entry.
- [x] CI repair 2: named `Ajv` import (fixes TS2353/TS2339), spec Status set to Shipped for eslint coverage rule.

- [x] CI repair 3: construct Ajv via `AjvModule.default` (named import fails at ESM runtime and in types).

- [x] CI repair 5: explicit AjvConstructor type so Options/ErrorObject typecheck (TS2353/TS2339).
- [x] CI repair 6: dropped ajv named type imports; local structural types for options/validator/issues (TS2353/TS2339).