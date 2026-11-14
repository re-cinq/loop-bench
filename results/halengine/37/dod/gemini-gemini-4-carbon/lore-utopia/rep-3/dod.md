# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` are already public seams in `src/orchestration/tools/registry.ts` and `src/orchestration/chatOrchestrator.ts`, so the acceptance tests exercise them directly with real values and fail on the missing schema validation behaviour.

## Done when these pass

- [ ] **validates input against inputSchema in execute without invoking the executor or logging rejected values, while forwarding valid input unchanged** — rejects missing `required`, wrong `type`, and disallowed `enum` inputs as `ToolResponse` objects naming the failing property path and constraint without calling the executor or leaking any property value into returned text or logs, forwards valid input with unlisted extra keys unchanged without applying schema defaults, and preserves `Unknown tool: <name>` throws for unregistered tools.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time when a static tool declares an uncompilable inputSchema, naming the tool** — compiles a static `ToolDefinition`'s `inputSchema` during `register` and throws synchronously with the tool's name when compilation fails.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates a function-valued tool definition against the schema returned on each call rather than a stale cached schema** — resolves a function-valued `ToolDefinitionSource` on each `execute` call and validates against that call's `inputSchema` instead of reusing an earlier call's schema.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **feeds a schema rejection back through the orchestrator tool loop as a tool_result so the model can retry and resolve** — returns the validation failure through `createChatOrchestrator` as a `tool_result` message so the model corrects its arguments on the next round and `processMessage` resolves without rejecting.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to runtime `dependencies` in `package.json` (`package-lock.json` updated to match) and confirm `npm run check:audit` stays clean.
- [ ] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache validators for function-valued `ToolDefinitionSource` schemas by schema identity without recompiling unchanged schemas.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor (`required`, declared `type`, and `enum` only — no `additionalProperties: false` injection, type coercion, or default application), returning a `ToolResponse` naming failing property paths and failed constraints while omitting all input values from both returned strings and logs.
- [ ] Document `ToolRegistry.execute` with a single-line JSDoc comment pointing to `specs/hal-engine-tool-input-validation/spec.md` and update `docs/adding-a-tool.md` so the guide reflects automatic registry input validation.
- [ ] Add unit coverage in `src/orchestration/tools/registry.test.ts` (including single compilation across ten static `execute` calls) and tool-loop retry coverage in `src/orchestration/chatOrchestrator.test.ts`, linking all remaining statements in `specs/hal-engine-tool-input-validation/spec.md` and updating its status to match coverage.

## Out of scope

- Validating tool output or adding hallucination/sanity evaluation harnesses.
- Per-tool caller authorization or `beforeToolCall` veto hooks.
- Retry, timeout, or rate-limiting wrappers around tool execution, and concrete domain tool implementations.