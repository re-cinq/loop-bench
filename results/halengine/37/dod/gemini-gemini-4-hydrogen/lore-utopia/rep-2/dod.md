# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` in `src/orchestration/tools/registry.ts` (and `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts`) are already the real entry points; the acceptance tests exercise them directly against real inputs, logger hooks, and a scripted `AIProvider`.

## Done when these pass

- [ ] **rejects invalid input before calling the executor and keeps valid input unmodified** — missing required fields, wrong types (without coercion), and non-enum values return a `ToolResponse` naming the failing constraint without invoking the executor, while valid inputs with extra keys and open `{type: 'object'}` schemas pass through unchanged
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws synchronously when registering a static tool with an invalid inputSchema** — broken static schemas fail at `register()` time naming the tool rather than mid-conversation
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates per call against the schema resolved from a dynamic ToolDefinitionSource** — dynamic tool definitions resolve and validate against their current `inputSchema` on each `execute()` call
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **logs a warning on invalid input and omits raw input values from logs and rejection text** — rejected payloads log a warning identifying the tool and failing field/constraint without exposing raw argument values in logs or `ToolResponse.result`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a schema validation rejection back to the model so a corrected follow-up call succeeds** — `createChatOrchestrator` passes validation failures back as `tool_result` within `maxToolRounds` without aborting the turn
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (not `devDependencies` or `peerDependencies`) and verify `npm run build` plus importing `./dist/index.js` succeeds
- [ ] Compile static `ToolDefinition` schemas once at `ToolRegistry.register()` time (throwing an error naming the tool on invalid schema) and compile/cache dynamic `ToolDefinitionSource` schemas by resolved schema object in `ToolRegistry.execute()`
- [ ] Validate `input` in `ToolRegistry.execute()` before invoking `tool.execute`, enforcing `required`, `type`, and `enum` without coercing types, applying defaults, or adding `additionalProperties: false`, and returning `{result}` naming failing paths/constraints without raw values
- [ ] Emit a `warn` log on validation failure naming the tool and failing field paths/constraints without raw input values, while keeping the `Unknown tool: <name>` throw unchanged
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` (including single-compile check across repeated static calls, `Unknown tool: <name>` throw, and error-message value redaction) and a retry test in `src/orchestration/chatOrchestrator.test.ts`, linked in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add the one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md` and update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md`

## Out of scope

- Changing `Unknown tool: <name>` from throwing to returning a `ToolResponse`
- Validating tool output (`ToolResponse` / executor return values)
- Hallucination detection or tool-evaluation harnesses
- Per-tool authorization or `beforeToolCall` veto hooks
- Retry, timeout, or rate limiting around tool execution