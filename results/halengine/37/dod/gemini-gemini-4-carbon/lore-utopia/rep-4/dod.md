# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already expose the exact seams where schemas are registered, tool inputs are validated before executors run, and rejection responses re-enter the provider tool loop.

## Done when these pass

- [ ] **enforces required and enum schemas and passes unlisted keys through unchanged** — `ToolRegistry.execute` enforces `required` and `enum` without calling the executor, and forwards valid input with unlisted extra keys unchanged without injecting `additionalProperties: false` or schema defaults
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field without leaking input values in results or logs** — `ToolRegistry.execute` rejects wrong-typed fields without coercing types or invoking the executor, names the failing property path and expected type, names the failing path in log lines, and omits both offending and identifying input values from `ToolResponse.result` and emitted log lines
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws naming the tool at registration time when a static schema is invalid** — `ToolRegistry.register` compiles a static `ToolDefinition`'s `inputSchema` up front and throws an error naming the tool on an invalid schema
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued tool against the schema returned on each call** — `ToolRegistry.execute` resolves a function-valued `ToolDefinitionSource` on each call and validates against its current `inputSchema` rather than a stale schema from an earlier call
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a validation rejection to the provider so a retry resolves the turn** — `createChatOrchestrator` sends a validation rejection's `result` back to the provider as a `tool_result` message rather than throwing, allowing a corrected retry on the next round to resolve `processMessage`
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (with `package-lock.json` updated) so compiled `dist/index.js` imports cleanly for package consumers
- [ ] Compile static tool schemas once in `ToolRegistry.register` (throwing with the tool name on compilation failure) and cache function-valued `ToolDefinitionSource` validators by resolved schema object reference
- [ ] Validate `input` in `ToolRegistry.execute` before calling `tool.execute`, returning `{result}` and logging only failing property paths and failed constraints (never property values), with a one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` (including single compilation across ten static `execute` calls, dynamic schema object-reference caching, and preserving the `Unknown tool: <name>` throw) and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and advance its status to `Shipped`
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md` (including the MINOR migration note for executors that previously saw malformed input)

## Out of scope

- Changing the `Unknown tool: <name>` throw for unregistered tool names into a returned `ToolResponse`
- Validating tool output, hallucination detection, or an evaluation harness
- Per-tool authorization against `ToolContext` or `beforeToolCall` veto hooks
- Retry, timeout, and rate limiting around tool execution, or concrete tool implementations