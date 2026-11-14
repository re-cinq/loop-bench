# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, `createChatOrchestrator`, and `setLogger` already expose the exact seams this ticket specifies against, so the acceptance tests invoke the real entry points directly and fail today because `inputSchema` is neither compiled at registration nor validated before calling the executor.

## Done when these pass

- [ ] **rejects input violating required or enum without calling the executor, while passing valid extra keys through unchanged** — `ToolRegistry.execute` returns a `ToolResponse` naming the failing property and skips the executor when `required` or `enum` fails, and forwards valid input (including unlisted extra properties, with no defaults injected) unchanged to the executor.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the failing field and expected type on a type mismatch without exposing input values in the result or logs** — a wrong-typed property returns a `ToolResponse` naming the field path and expected type without calling the executor, and neither the returned `result` nor any emitted log entry contains any value from the rejected payload.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time naming the tool when a static inputSchema cannot be compiled** — `ToolRegistry.register` compiles static schemas eagerly and throws an error naming the offending tool when its `inputSchema` is invalid.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued tool definition against the schema returned for each call rather than a stale one** — dynamic `ToolDefinitionSource` functions resolve and validate against each call's returned `inputSchema` object (cached by schema object identity).
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a validation failure as a tool_result so the next orchestrator round can correct the call and resolve** — `ChatOrchestrator.processMessage` feeds a schema rejection `ToolResponse` back to the provider as a `tool_result` so the model can retry with valid arguments and resolve the turn within `maxToolRounds`.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` (syncing `package-lock.json`) and verify ESM/bundler smoke compatibility (`smoke/index.mjs`, `smoke/types.ts`).
- [ ] Compile static `inputSchema` once at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and compile/cache function-valued `ToolDefinitionSource` schemas by resolved schema object in `src/orchestration/tools/registry.ts`.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor (`required`, declared types, `enum`; no `additionalProperties: false`, no coercion, no defaults), returning a `ToolResponse` and logging only failing property paths and constraints — never property values — while keeping `Unknown tool: <name>` as the sole throw path.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`, add unit tests in `src/orchestration/tools/registry.test.ts` (including single compilation across ten `execute` calls and `Unknown tool: <name>`) and `src/orchestration/chatOrchestrator.test.ts` with inline `([validated by: ...])` spec links, and flip `specs/hal-engine-tool-input-validation/spec.md` status to `Shipped` once all statements are linked.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `example/weather-tool.ts`, and `adrs/ADR-002-response-validation.md` (`References`), bump `package.json` + `package-lock.json` by a MINOR version, and add the `CHANGELOG.md` entry (including the migration note).

## Out of scope

- Changing `Unknown tool: <name>` from throwing to returning a `ToolResponse` (tracked separately).
- Validating tool outputs or model text responses, and ADR-002's domain sanity-check and error-classification layers.
- Per-tool authorization or caller-scoped input rules (`beforeToolCall` veto hooks are a separate issue).
- Retry, timeout, and rate limiting around tool execution, as well as concrete domain tool implementations.