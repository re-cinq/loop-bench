# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already exist as the real entry points, so the acceptance tests exercise them directly with real `ToolRegistry` and `AIProvider` instances and fail today because `inputSchema` is never compiled or checked.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field or enum constraint without calling the executor** — `ToolRegistry.execute` rejects missing required properties and invalid enum values with a `ToolResponse` naming the field and skips invoking the executor
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field naming path and expected type without coercing or leaking values** — wrong-typed values are not coerced and rejected payload values never appear in the returned `result` or any log line
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time for a schema that cannot be compiled and names the tool** — `ToolRegistry.register` compiles static `inputSchema` definitions at registration and throws with the tool name on invalid schemas
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates dynamic tool definitions against the current schema and forwards extra properties unmodified** — function-valued `ToolDefinitionSource` validates against the current schema per call, and valid inputs keep unlisted properties without injecting schema defaults
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a validation rejection to the provider so processMessage resolves on a corrected retry** — `ChatOrchestrator` feeds the `ToolResponse` rejection back to the provider as a `tool_result` so a corrected retry succeeds within the tool loop
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (not `devDependencies` or `peerDependencies`) and verify `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits `0`.
- [ ] Compile static tool `inputSchema` once at `register` time (throwing an error naming the tool on compilation failure) and cache compiled validators for function-valued `ToolDefinitionSource` by resolved schema object.
- [ ] Validate `input` in `ToolRegistry.execute` enforcing `required`, declared types, and `enum` without `additionalProperties: false`, type coercion, or default injection; return `{result: ...}` without logging or echoing offending values.
- [ ] Keep `Unknown tool: <name>` throw unchanged for unregistered tools and add a one-line doc comment on `ToolRegistry.execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add `src/orchestration/tools/registry.test.ts` (including static compile-once across ten `execute` calls and unknown-tool throw) and `chatOrchestrator.test.ts` coverage, citing all remaining spec statements in `specs/hal-engine-tool-input-validation/spec.md` and advancing its status to `Shipped`.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md` (with migration note), and bump `package.json` MINOR version, then pass `npm run verify`.

## Out of scope

- Changing `Unknown tool: <name>` from a throw to a returned `ToolResponse`
- Validating tool output, hallucination detection, or evaluation harnesses
- Per-tool authorization, `beforeToolCall` veto hooks, retries, timeouts, or rate limiting
- Implementing domain tools against the validated contract