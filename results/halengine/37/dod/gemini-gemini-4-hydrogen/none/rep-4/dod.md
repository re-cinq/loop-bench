# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` in `src/orchestration/tools/registry.ts`, together with `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts`, already expose the exact public seams through which schemas are registered, tool inputs are executed, and tool-loop rounds recover from tool responses.

## Done when these pass

- [ ] **returns a ToolResponse naming the failing property and constraint without calling the executor or leaking values** — missing `required`, wrong type, and invalid `enum` inputs return a descriptive `ToolResponse`, leave executor calls at 0, and never echo offending input values in the returned text or log lines
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with extra properties through unmodified without coercing types or applying defaults** — extra keys and raw types pass through unchanged while string-for-number is rejected rather than coerced
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time naming the tool when its inputSchema cannot be compiled** — invalid JSON Schema fails fast in `register` with an error naming the tool
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued tool definition against the schema returned on each call** — a dynamic `ToolDefinitionSource` re-resolves and validates against the latest schema rather than a stale cached one
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves when a rejected tool call is retried with valid input and exposes the rejection to the provider** — `createChatOrchestrator` feeds the rejection `ToolResponse` back to the provider as a `tool_result` so a valid retry succeeds and `processMessage` resolves
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (ensuring `npm run build` and ESM import of `dist/index.js` succeed)
- [ ] Compile static tool schemas once at `ToolRegistry.register` time (throwing with the tool name on uncompilable schemas) and cache function-valued `ToolDefinitionSource` schemas by resolved schema object
- [ ] Validate `input` against the compiled validator in `ToolRegistry.execute` (enforcing `required`, types, and `enum` without `additionalProperties: false`, coercion, or defaults) and return a redaction-safe `ToolResponse` on failure without invoking the executor or logging values
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`, plus unit tests in `src/orchestration/tools/registry.test.ts` (including static compile-once caching and `Unknown tool: <name>`) and `src/orchestration/chatOrchestrator.test.ts`
- [ ] Update `specs/hal-engine-tool-input-validation/spec.md` citations/status, `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md`, and bump version (MINOR)

## Out of scope

- Returning an unknown tool name to the model instead of throwing `Unknown tool: <name>`
- Validating tool output, hallucination detection, or an evaluation harness
- Per-tool authorization (`ToolContext` boundary) or a `beforeToolCall` veto hook
- Retry, timeout, and rate limiting around tool execution, or new tool implementations