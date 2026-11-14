# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, `setLogger`, and `createChatOrchestrator` already expose the exact public entry points this ticket specifies, with no signature changes owed. All four acceptance tests call the real `ToolRegistry` and `ChatOrchestrator` entry points today and fail because `inputSchema` is neither compiled at registration nor checked before invoking the executor.

## Done when these pass

- [ ] **throws at registration time naming the tool for an invalid schema** — `ToolRegistry.register` compiles a static tool's `inputSchema` at registration time and throws synchronously naming the tool when the schema cannot be compiled.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects invalid input with path and constraint without leaking values** — `ToolRegistry.execute` enforces `required`, declared `type`, and `enum` before invoking the executor, returning a `ToolResponse` whose `result` names the failing property paths and constraints while omitting every property value from both `result` and emitted log lines.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against a function-valued definition current schema** — a function-valued `ToolDefinitionSource` resolves on each call and validates against the schema returned at that call rather than a stale registration-time schema.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns schema rejections to the model and passes valid retries unchanged** — in the `ChatOrchestrator` tool loop, a malformed tool call returns a rejection `ToolResponse` fed back as `tool_result` rather than throwing, and a corrected retry carrying unlisted extra fields (while omitting an optional field with a schema `default`) reaches the executor unchanged once.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator (`ajv`, verified clean under `npm run check:audit`) to `package.json` `dependencies` and compile static `inputSchema` once in `ToolRegistry.register`, throwing with the tool name on invalid schemas, while caching function-valued `ToolDefinitionSource` validators by resolved schema object.
- [ ] Validate `input` in `ToolRegistry.execute` (`required`, declared `type`, `enum` only — no `additionalProperties: false`, no type coercion, no default injection) and return `{result}` naming failing paths and constraints with zero property values in `result` or `log` output.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` (including single compilation across ten `execute` calls and `Unknown tool: <name>` still throwing) and `src/orchestration/chatOrchestrator.test.ts`, cite the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and flip its status to `Shipped`.
- [ ] Add a one-line JSDoc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`, and update `README.md`, `docs/adding-a-tool.md` + `example/weather-tool.ts` (synced via `check-doc-blocks`), `.specify/spec.md`, `specs/hal-engine-architecture/spec.md`, and `adrs/ADR-002-response-validation.md`.
- [ ] Bump `package.json` + `package-lock.json` by a `MINOR` version and record the new runtime validation contract and migration note in `CHANGELOG.md`.

## Out of scope

- Changing the `Unknown tool: <name>` throw for unregistered tool names.
- Validating tool output or model text responses, hallucination detection, or an evaluation harness.
- Per-tool authorization (`beforeToolCall` is a separate issue).
- Retry, timeout, or rate limiting around tool execution, and any concrete tool implementation.