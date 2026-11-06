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

- [ ] (ajv ^8 is now in `dependencies` and the lockfile; the MINOR version bump is still pending) Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`) and bump the package version `MINOR`.
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time, throwing an error naming the tool on invalid schemas.
- [x] Cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`), validating against the schema current at each call.
- [x] A static tool's schema is compiled once across ten `execute` calls (pinned by a test).
- [ ] Pin the remaining acceptance-criteria tests that already pass against the current code: extra properties pass through unchanged exactly once, `Unknown tool: <name>` still throws, the orchestrator rejected-then-corrected retry in `chatOrchestrator.test.ts`; then the docs/README/.specify/ADR updates and the MINOR version bump.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.
- [x] `ToolRegistry.execute` rejects input missing a `required` property with a `ToolResponse` and never calls the executor (`src/orchestration/tools/registry.test.ts`; validator is compiled per call for now).
- [x] Rejection text for a wrong-typed property names the field path and expected type, and no log line or result carries the offending value.
- [x] `CHANGELOG.md` entry — `scripts/check-changelog.sh` fails CI on any `src/` change without one.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.
- [x] CI resolved `ajv` 6 at the root despite the lockfile pinning 8.20.0 (TS2693 / `no export named 'Ajv'` on 737a72e). `registry.ts` now default-imports `ajv` and takes `.default ?? module`, which works against both majors; if CI still fails on ajv, its install is not honouring `package-lock.json`.