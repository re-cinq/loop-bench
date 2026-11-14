# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already expose the exact public entry points this ticket changes, so the acceptance tests invoke them directly with real schemas and payloads and fail on the absent validation behaviour.

## Done when these pass

- [ ] **rejects wrong-typed input without running executor or leaking values** — `ToolRegistry.execute` rejects wrong-typed input before calling the executor, names the failing property path (`location`) and expected type (`string`), and never leaks either the offending value or another identifying field value in the returned `result` or emitted logs.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws naming the tool when registering an uncompilable static schema** — `ToolRegistry.register` compiles a static `ToolDefinition.inputSchema` at registration time and throws an error naming the tool when compilation fails.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates against dynamic schemas while preserving extra input keys** — a function-valued `ToolDefinitionSource` validates against the schema resolved at each `execute` call (enforcing `enum`) while passing valid input and unlisted extra keys through to the executor unchanged without applying schema defaults.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns missing-required rejections in the tool loop so retries resolve** — missing `required` fields return a `ToolResponse` rather than throwing, so `ChatOrchestrator.processMessage` hands the rejection text naming the missing field back to the provider on the next round and resolves after a corrected retry.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` runtime `dependencies` (and sync `package-lock.json`), configured with `strict: false` and without `coerceTypes`, `useDefaults`, or injected `additionalProperties: false`.
- [ ] Compile static `inputSchema` once in `ToolRegistry.register` (throwing an error naming the tool on invalid schema) and cache dynamic `ToolDefinitionSource` validators by resolved schema object reference.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning `{result}` and logging failing property paths and constraints without ever serialising input property values, and add the one-line doc comment on `execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` covering static-schema single compilation across ten `execute` calls, preserved `Unknown tool: <name>` throws, and the remaining ticket cases, citing `specs/hal-engine-tool-input-validation/spec.md` and flipping its `Status` to `Shipped` once every statement is cited.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump `package.json` version by MINOR.

## Out of scope

- Converting `Unknown tool: <name>` from a thrown error into a returned `ToolResponse`.
- Validating tool output, hallucination detection, or an evaluation harness.
- Per-tool authorization against `ToolContext`, `beforeToolCall` hooks, and retry, timeout, or rate limiting around tool execution.