# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry` (`src/orchestration/tools/registry.ts`) and `createChatOrchestrator` (`src/orchestration/chatOrchestrator.ts`) already expose the real registration, execution, logging (`setLogger`), and tool-loop seams, so the acceptance tests call those entry points directly.

## Done when these pass

- [ ] **throws at registration when a static inputSchema fails to compile, naming the tool** — `ToolRegistry.register` compiles static `inputSchema` eagerly and throws an error naming the tool when compilation fails
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects schema-invalid input without calling the executor and without leaking input values** — `ToolRegistry.execute` returns a `ToolResponse` naming the failing path and constraint, leaves the executor uncalled, and omits input values from both the response and logs
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates dynamic tool definitions against the current schema and passes unlisted properties through unchanged** — function-valued `ToolDefinitionSource` validates against the current schema per call, enforces `enum`, and passes unlisted keys without stripping, coercion, or default injection
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles a static tool schema once across repeated executions** — static `inputSchema` compiles once at `register` time rather than per `execute` call
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a validation rejection to the model so the orchestrator tool loop can retry and resolve** — `createChatOrchestrator` feeds the `ToolResponse` rejection back to the model as a `tool_result` so the loop can retry and resolve
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (and lockfile) and compile/cache JSON Schema validators in `src/orchestration/tools/registry.ts` (static at `register`, function-valued cached by resolved schema object)
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` naming failing paths and constraints with zero input values in returned text or logs, while keeping `Unknown tool: <name>` throwing
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` (including `Unknown tool: <name>`) and `src/orchestration/chatOrchestrator.test.ts` and link remaining unlinked statements in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add the one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md` per issue #37

## Out of scope

- Changing `Unknown tool: <name>` from throwing to returning a `ToolResponse`
- Validating tool output, hallucination detection, or evaluation harnesses
- Per-tool authorization or `beforeToolCall` veto hooks
- Retry, timeout, or rate limiting around tool execution