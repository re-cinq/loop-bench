# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already expose the exact entry points this feature acts through without requiring any signature changes. Each acceptance test exercises those real seams today and fails because `ToolRegistry` neither compiles `inputSchema` at registration nor validates `input` before invoking the executor.

## Done when these pass

- [ ] **ToolRegistry inputSchema validation rejects invalid input without invoking the executor or leaking values** — calling `ToolRegistry.execute` with a missing `required` property, a wrong-typed property, or a disallowed `enum` value never invokes the executor, returns a `ToolResponse` whose `result` names the failing field path and constraint, and omits every input property value from both `result` and emitted log entries.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **ToolRegistry inputSchema validation throws at registration time naming the tool when a static schema is invalid** — passing a static `ToolDefinition` with an uncompilable `inputSchema` to `ToolRegistry.register` throws synchronously with the tool's name in the error message.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **ToolRegistry inputSchema validation validates a function-valued tool definition against each call current schema** — a function-valued `ToolDefinitionSource` whose returned `inputSchema` changes between calls validates `execute` against that call's current schema rather than a stale registration-time schema.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **ToolRegistry inputSchema validation feeds a schema rejection back to the model so a retry succeeds with extra keys intact** — inside `createChatOrchestrator`, a rejected tool call returns its failure description to the provider as a `tool_result` without aborting `processMessage`, and the model's corrected retry reaches the executor once with unlisted extra keys preserved and no schema defaults injected.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to runtime `dependencies` in `package.json` (and sync `package-lock.json`), enforcing `required`, declared types, and `enum` without `additionalProperties: false`, type coercion, or default injection.
- [ ] Compile static tool schemas once in `ToolRegistry.register` (throwing an error naming the tool on an uncompilable schema) and resolve/compile function-valued `ToolDefinitionSource` schemas per `execute` call cached by resolved schema object reference.
- [ ] Validate `input` in `ToolRegistry.execute` before calling the executor, returning `{result}` naming failing property paths and constraints while omitting all property values from `result` and log lines, and add the one-line JSDoc comment pointing to `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` (including static schema compile-once across ten `execute` calls and `Unknown tool: <name>` throw preservation), link every statement in `specs/hal-engine-tool-input-validation/spec.md`, and update its `Status` row to `Shipped`.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump `package.json` version (MINOR) to reflect enforced tool input validation.

## Out of scope

- Changing `Unknown tool: <name>` from a thrown error to a returned `ToolResponse`
- Validating tool output, hallucination detection, or an evaluation harness
- Per-tool authorization, `beforeToolCall` veto hooks, or retry, timeout, and rate limiting around tool execution
- Concrete domain tool implementations