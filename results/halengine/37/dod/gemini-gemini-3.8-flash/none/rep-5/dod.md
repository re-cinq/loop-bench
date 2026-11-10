# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — A seam already exists in `ToolRegistry.register` and `ToolRegistry.execute`. The acceptance tests call these entry points directly with real tool definitions and schemas, failing because input validation and registration-time compilation are absent.

## Done when these pass

- [ ] **rejects schema-invalid input with a ToolResponse describing the failure without invoking the executor** — missing required properties return a rejection `ToolResponse` naming the missing property and the executor is never called.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed input with an error naming the property without exposing values** — wrong-typed fields return a rejection naming the property path and constraint, without leaking property values in the response.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time when a static tool declares an uncompilable inputSchema** — registering a static tool definition with an invalid JSON schema throws an error at registration time naming the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` for JSON Schema validation.
- [ ] Compile and validate static tool `inputSchema` in `ToolRegistry.register`, throwing an error naming the tool on uncompilable schema.
- [ ] Validate dynamic tool `inputSchema` per-call with caching by schema object.
- [ ] Validate `input` against compiled schema in `ToolRegistry.execute` before calling the executor, returning a rejection `ToolResponse` on failure.
- [ ] Format validation error messages to include property paths and failing constraints without including input values.
- [ ] Pass valid input (including unlisted extra properties) through to executor unchanged.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and tool-loop retry test in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Update documentation (`README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`) and add a one-line doc comment pointing to spec on `execute`.
- [ ] Add entry to `CHANGELOG.md` and bump minor version.

## Out of scope

- Throwing on unknown tool name remains unchanged (`execute` still throws `Unknown tool: <name>`).
- Validating tool output or structured return values.
- Hallucination detection and evaluation harnesses.
- Per-tool authorization and access control (`beforeToolCall` hook).
- Tool execution retry, timeouts, and rate limiting.
- Modifying actual tool implementations in `example/`.