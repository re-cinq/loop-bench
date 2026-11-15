# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already exist with public entry points that accept real schemas, executors, and `AIProvider` implementations. The acceptance tests call those entry points directly today and fail because `inputSchema` is never compiled or checked.

## Done when these pass

- [ ] **rejects invalid input with path and constraint, calls executor zero times, and leaks no values** — missing `required` fields, wrong types, and invalid `enum` values return a `ToolResponse` naming the path and constraint, never call the executor, and omit all input values from `result` and logs.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **forwards valid input with extra properties unmodified without defaults or coercion** — valid inputs retain unlisted properties and skip schema defaults, while wrong-typed inputs are rejected rather than coerced.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration, rejects broken schemas, and throws on unknown tools** — static definitions compile once in `register`, throw naming the tool when uncompilable, and `execute` still throws `Unknown tool: <name>` for unregistered tools.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued tool definition against the schema current at each call** — a `ToolDefinitionSource` function whose returned schema changes between calls validates against the current schema rather than a stale cached one.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds schema rejection back to the provider and resolves after retry** — a malformed `tool_use` call in `createChatOrchestrator` feeds the rejection `ToolResponse` into the next round's `tool_result` without calling `onError` and resolves after the model retries with valid input.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (not `devDependencies` or `peerDependencies`) and verify `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits `0`.
- [ ] Compile static `inputSchema` once in `ToolRegistry.register` (throwing an error naming the tool on invalid schema) and cache dynamic `ToolDefinitionSource` validators by resolved schema object reference (`WeakMap`).
- [ ] Validate `input` in `ToolRegistry.execute` against the compiled validator (no `additionalProperties: false`, no coercion, no defaults), returning `{result}` naming failing paths and constraints without leaking input values in `result` or logs; keep `Unknown tool: <name>` throw unchanged.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` (including dynamic schema-object reference caching) and link the remaining statement in `specs/hal-engine-tool-input-validation/spec.md`, updating `| Status |` once all statements are linked.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump `package.json` MINOR version per the ticket checklist.

## Out of scope

- Returning an unknown tool name to the model instead of throwing `Unknown tool: <name>`.
- Validating tool output, hallucination detection, or an evaluation harness.
- Per-tool authorization on `ToolContext` or a `beforeToolCall` veto hook.
- Retry, timeout, and rate limiting around tool execution, or concrete tool implementations.