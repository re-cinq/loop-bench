# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already expose the exact public entry points where schema compilation, input validation, value-free error reporting, and tool-loop retry are observed. Four acceptance tests call those entry points directly and fail today because `register` never compiles `inputSchema` and `execute` invokes the executor without validating `input`.

## Done when these pass

- [ ] **rejects an uncompilable static inputSchema at registration, naming the tool** — `ToolRegistry.register` compiles a static tool's `inputSchema` at registration time and throws an error naming the tool when compilation fails.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a validation result without running the tool or leaking values** — `ToolRegistry.execute` rejects wrong-typed input before invoking the executor, returns a `ToolResponse` naming the failing field path and expected type, and omits the rejected value from both `result` and log output.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic schemas per call and forwards extra keys unchanged** — `ToolRegistry.execute` resolves a function-valued `ToolDefinitionSource` on each call to validate against the current schema (`required`, declared types, and `enum` only), while forwarding valid input with unlisted extra keys unchanged without defaults or coercion.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a rejected tool call back to the model so a retry can succeed** — schema rejection returns a `ToolResponse` rather than throwing, so `ChatOrchestrator.processMessage` sends the failure back as a `tool_result` on the next round and resolves once a retry passes validation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to runtime `dependencies` in `package.json` (and `package-lock.json`) and verify ESM dist import works cleanly.
- [ ] Compile static `inputSchema` once at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators by schema object reference for function-valued `ToolDefinitionSource` tools.
- [ ] Validate `input` in `ToolRegistry.execute` (`required`, declared types, `enum` only; no `additionalProperties: false`, type coercion, or default injection), returning a `ToolResponse` (`{result}`) and logging only failing property paths and constraints without property values, plus a single-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` (missing required field, extra property pass-through, wrong-typed field without value leak, registration-time error, dynamic schema per call, static compile-once across 10 calls, `Unknown tool: <name>` throw, identifying-value redaction) and the tool-loop retry test in `src/orchestration/chatOrchestrator.test.ts`, linking every new test in `specs/hal-engine-tool-input-validation/spec.md` and updating its status to `Shipped` when all statements are linked.
- [ ] Update `README.md`, `docs/adding-a-tool.md` (and `example/weather-tool.ts` if synced via `docs:check`), `.specify/spec.md`, `CHANGELOG.md`, and bump `package.json` / `package-lock.json` by a MINOR version.

## Out of scope

- Changing the `Unknown tool: <name>` throw in `ToolRegistry.execute` to a returned `ToolResponse` (tracked separately).
- Validating tool output, hallucination detection, or an evaluation harness.
- Per-tool authorization, `beforeToolCall` veto hooks, and retry, timeout, or rate limiting around tool execution.