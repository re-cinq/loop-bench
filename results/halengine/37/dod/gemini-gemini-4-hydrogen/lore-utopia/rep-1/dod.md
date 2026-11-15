# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already exist as public entry points. The acceptance tests invoke them directly with real schemas and inputs and fail today because schema validation is absent.

## Done when these pass

- [ ] **rejects missing required, wrong-typed, and disallowed-enum input before calling the executor without leaking offending values** — `ToolRegistry.execute` rejects missing `required`, wrong types, and disallowed `enum` values before invoking the executor, returning a `ToolResponse` naming the failing path and constraint without leaking offending values in `result` or logs.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with unlisted properties and omitted defaulted fields through unmodified while rejecting uncoerced type mismatches** — valid input with extra keys and omitted fields with schema `default` reaches the executor unchanged, while string-for-number mismatches are rejected without coercion.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws synchronously at register time for an uncompilable inputSchema and names the tool** — `ToolRegistry.register` compiles static schemas up front and throws synchronously naming the tool when `inputSchema` is invalid JSON Schema.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued ToolDefinitionSource against the schema returned on each call** — dynamic tool definitions resolve and validate against the current schema on every `execute` call rather than a stale schema.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns schema rejection to the model so it can retry with valid input and resolve** — `createChatOrchestrator` feeds the validation rejection `ToolResponse` back to the provider on the next round so a corrected retry resolves `processMessage` without invoking the executor on the invalid call.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator (`ajv`) to `package.json` `dependencies` and verify `npm run build` plus ESM `import('./dist/index.js')` succeeds.
- [ ] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing synchronously naming the tool on invalid schema) and cache per-object compiled validators for function-valued `ToolDefinitionSource`.
- [ ] Validate `input` in `ToolRegistry.execute` before calling the executor, returning `{result}` naming property paths and constraints without leaking input values in result or logs, and preserving `Unknown tool: <name>` throws.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing at `specs/hal-engine-tool-input-validation/spec.md` and add unit tests in `src/orchestration/tools/registry.test.ts` (including single-compile reuse and unknown-tool throw) and `src/orchestration/chatOrchestrator.test.ts`, linking the remaining spec statements and updating spec `Status` to `Shipped`.
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump version (MINOR) in `package.json` / `package-lock.json`.

## Out of scope

- Changing `Unknown tool: <name>` from a thrown `Error` to a returned `ToolResponse`.
- Validating tool output, hallucination detection, or evaluation harnesses.
- Per-tool authorization (`ToolContext` boundary) or `beforeToolCall` veto hooks.
- Retry, timeout, or rate limiting around tool execution, and concrete tool implementations.