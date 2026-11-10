# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` are already exported entry points, so the acceptance suite calls them directly and fails today because `register` never compiles `inputSchema` and `execute` invokes the executor unconditionally without validating `input`.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required property and never calls the executor** — calling `ToolRegistry.execute` with `{}` against a tool whose `inputSchema` requires `location` returns a `ToolResponse` whose `result` names `location` without invoking the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the property and expected type without leaking the offending value into the result or logs** — calling `ToolRegistry.execute` with a number where a string is required returns a `ToolResponse` naming the field (`ssn`) and expected type (`string`), skips the executor, and omits the offending value from both `response.result` and every emitted log line.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable schema at registration time and names the tool** — calling `ToolRegistry.register` with an invalid JSON Schema throws at registration time with a message naming the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued tool definition against the schema current at each call** — a function-valued `ToolDefinitionSource` whose returned `inputSchema` changes between calls validates `input` against the schema returned for that call rather than a stale cached validator.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a schema rejection back to the provider as a tool_result and resolves after a corrected retry** — in `ChatOrchestrator`, a rejected tool call returns a `ToolResponse` fed back to the provider as a `tool_result` message on the next round rather than throwing, and `processMessage` resolves once the model retries with valid input.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (not `peerDependencies` or `devDependencies`) and bump `version` (MINOR).
- [ ] Compile static tool schemas once at `ToolRegistry.register` (throwing an error naming the tool on an invalid schema) and compile function-valued `ToolDefinitionSource` schemas per call cached by the resolved schema object reference.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor (enforcing `required`, declared types, and `enum` only — no `additionalProperties: false` injection, no type coercion, no default application); on failure log and return a `ToolResponse` naming the failing property paths and constraints without ever including property values.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` covering pass-through of unlisted extra properties (`toEqual`), static schema single compilation across ten `execute` calls, and `Unknown tool: <name>` throw preservation, citing `specs/hal-engine-tool-input-validation/spec.md` and updating its `Status` to `Shipped`.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `example/weather-tool.ts`, `.specify/spec.md`, and `CHANGELOG.md` to match the enforced validation contract.

## Out of scope

- Changing the `Unknown tool: <name>` throw to a returned `ToolResponse` (tracked separately).
- Validating tool output, hallucination detection, or evaluation harnesses.
- Per-tool authorization, `beforeToolCall` veto hooks, or retry/timeout/rate-limiting around tool execution.