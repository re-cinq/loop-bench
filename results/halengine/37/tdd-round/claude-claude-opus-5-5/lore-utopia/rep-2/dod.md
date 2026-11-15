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
- [ ] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.
- [x] `ToolRegistry.execute` rejects input missing a `required` property with a `ToolResponse` naming it (`'<prop>' is required`) and skips the executor — `src/orchestration/tools/registry.test.ts`; validators are compiled lazily in `execute` and cached in a `WeakMap` by schema object.
- [x] Compile a static tool's schema eagerly in `register` (throw naming the tool) — `src/orchestration/tools/registry.test.ts`; `register` meta-validates a static schema with `ajv.validateSchema` and throws `Invalid inputSchema for tool <name>: <reason>`.
- [x] Rejections for wrong type: `'<dotted.path>' must be <type>` built from ajv `params`, no value — `src/orchestration/tools/registry.test.ts`. Enum still uses the fallback `'<path>' <ajv message>`; assert the message names the path and expected type (current fallback is `'<instancePath>' <ajv message>`) and that no value leaks to result or logs.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.
- [x] CI resolved `ajv` 6 typings/runtime on 6afef2d and again on 97f8381 (cause not visible from the pod); registry now imports the namespace `default` and types ajv through local interfaces, building messages from `keyword`/`params`/path so ajv 6 and 8 behave alike. Was: (`'Ajv' only refers to a type`, no `instancePath`) although `package-lock.json` pins root `node_modules/ajv` at 8.20.0 (ajv 6 only nested under eslint); confirm on the next verdict and, if it persists, find what installs ajv 6 at the root in CI.
- [x] Enum rejection names the path and the allowed values (`'<path>' must be one of: a, b`) without the offending value — `src/orchestration/tools/registry.test.ts`.
- [x] CI eslint `re-lint/callee-below-caller`: `fieldPath` moved below `describeSchemaError`.
- [ ] Valid input with an unlisted extra property reaches the executor unchanged, exactly once (`toEqual`).