# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, `setLogger`, and `createChatOrchestrator` already exist as direct entry points, so acceptance tests call the real registry and orchestrator seams without doubles.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required property and does not invoke the executor** — `ToolRegistry.execute` rejects missing required fields before calling the executor and names the missing property as required
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed or disallowed-enum fields naming path and constraint without leaking values** — type and `enum` rejections name the failing field path and expected constraint while omitting offending property values from both `ToolResponse.result` and logger output
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws synchronously at register time when inputSchema is uncompilable and names the tool** — `ToolRegistry.register` compiles static schemas up front and fails synchronously with the tool name on an uncompilable schema
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates a function-valued ToolDefinitionSource against the schema current at each execute call** — dynamic tool definitions resolve and validate against the schema returned at that call rather than a stale cached validator
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **resolves after a rejected tool call by returning the validation error to the model and passing the retry unchanged** — `createChatOrchestrator` feeds validation rejections back to the model so it can retry within `maxToolRounds`, and valid inputs with unlisted properties pass through without coercion or injected defaults
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator (`ajv`) to `package.json` `dependencies` (not `devDependencies` or `peerDependencies`) and ensure `npm run build` plus ESM import of `dist/index.js` succeeds
- [ ] Compile static tool `inputSchema` once at `ToolRegistry.register` time (throwing synchronously with the tool name on failure), and cache per resolved schema object for function-valued `ToolDefinitionSource`
- [ ] Validate `input` in `ToolRegistry.execute` against the resolved schema before invoking the executor, returning `{result: ...}` on failure with failing path and constraint and zero leaked input values in `result` or logs, while leaving `Unknown tool: <name>` throwing unchanged
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` (including single-compilation across repeated calls and `Unknown tool: <name>`) and `src/orchestration/chatOrchestrator.test.ts`, and link them in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md` (with MINOR bump / migration note in PR)

## Out of scope

- Changing `Unknown tool: <name>` from throwing to returning a `ToolResponse`
- Validating tool output, hallucination detection, or evaluation harnesses
- Per-tool authorization (`ToolContext` boundary) or `beforeToolCall` veto hooks
- Retry, timeout, or rate limiting around tool execution