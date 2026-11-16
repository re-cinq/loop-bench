# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry` (`register`, `execute`) and `createChatOrchestrator` (`processMessage`) already expose the real entry points with no missing seam. The acceptance tests call those entry points directly with real schemas, `setLogger`, and a scripted `AIProvider` and fail today because no schema compilation or input validation occurs.

## Done when these pass

- [ ] **returns a ToolResponse naming missing required fields without calling the executor, while passing valid input with extra properties unchanged** — `ToolRegistry.execute` rejects `{}` with a `ToolResponse` naming `location` as required without calling the executor, and passes valid input carrying extra properties (and an omitted defaulted field) to the executor verbatim
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed fields and invalid enum values with path and constraint, omitting offending and identifying values from result and logs** — `ToolRegistry.execute` rejects wrong-typed and invalid-enum inputs with field path and constraint while omitting all property values from both the returned `ToolResponse` and `setLogger` output
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time naming the tool for an uncompilable schema, and compiles a static schema once across ten execute calls** — `ToolRegistry.register` fails fast with the tool name on an uncompilable schema and does not re-read/recompile a static schema during repeated `execute` calls
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates a function-valued tool definition against the schema current at each call without using a stale cached schema** — a dynamic `ToolDefinitionSource` whose returned `inputSchema` changes between calls validates against the new schema rather than a stale cached validator
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a schema rejection as a tool_result so the provider can retry and resolve the message** — `ChatOrchestrator.processMessage` feeds a validation rejection back to the provider as a `tool_result` so a corrected retry resolves cleanly without throwing
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` (and update `package-lock.json`)
- [ ] Compile static schemas once in `ToolRegistry.register` (throwing with tool name on invalid schema) and cache dynamic `ToolDefinitionSource` compiled validators by resolved `inputSchema` object in `src/orchestration/tools/registry.ts`
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `{result}` `ToolResponse` naming failing property paths and constraints without leaking values in the result or logs, while keeping `Unknown tool: <name>` throwing
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` (including `Unknown tool: <name>` and schema-object cache reuse), and link them in `specs/hal-engine-tool-input-validation/spec.md` (updating `Status` to `Shipped` once all testable statements are cited)
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump `package.json` version by MINOR (and check `npm run verify` + `npm run build && node --input-type=module -e "import('./dist/index.js')"`)

## Out of scope

- Returning an unknown tool name to the model instead of throwing `Unknown tool: <name>`
- Validating tool output, hallucination detection, or an evaluation harness
- Per-tool authorization, `beforeToolCall` veto hooks, retry/timeout, or rate limiting around tool execution
- Implementing new concrete tools