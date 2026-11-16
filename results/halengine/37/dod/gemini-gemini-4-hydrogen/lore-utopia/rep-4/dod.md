# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register` / `ToolRegistry.execute` (`src/orchestration/tools/registry.ts`) and `createChatOrchestrator` (`src/orchestration/chatOrchestrator.ts`) already expose the public entry points, so the acceptance tests call them directly with real `ToolDefinition`s, `setLogger`, and a scripted `AIProvider` and fail today because no schema compilation or input validation runs.

## Done when these pass

- [ ] **rejects malformed tool input with a ToolResponse naming the failing path and constraint without invoking the executor or leaking values** — missing `required` fields, wrong primitive types (including numeric strings for `number` fields, proving no coercion), and invalid `enum` values return a `ToolResponse` naming path and constraint with `0` executor calls and zero offending values in the result or logs.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws synchronously at register time when a static inputSchema is uncompilable and names the tool** — `ToolRegistry.register` compiles static schemas eagerly and fails fast with the tool's name on invalid schemas.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued ToolDefinitionSource against the schema current at each execute call** — changing the `inputSchema` returned by a dynamic `ToolDefinitionSource` updates validation on the next `execute` call rather than reusing a stale validator.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **drives a rejected tool call through chatOrchestrator to a corrected retry without stripping extra properties or applying defaults** — a malformed `tool_use` produces a rejection `tool_result` fed back to the provider on the next round, and the corrected call reaches the executor with unlisted properties intact and omitted optional defaults absent.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` (and update `package-lock.json`); configure it with no `additionalProperties: false` injection, no `coerceTypes`, and no `useDefaults`.
- [ ] Compile static tool `inputSchema`s synchronously inside `ToolRegistry.register` (throwing an error naming the tool on compilation failure), and resolve/cache compiled validators per resolved schema object for function-valued `ToolDefinitionSource`s.
- [ ] Validate `input` against the compiled schema inside `ToolRegistry.execute` before invoking `tool.execute`, returning `{result}` naming failing property paths and constraints (never offending property values in `result` or `log` calls) while leaving `Unknown tool: <name>` throwing as before.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`, update `.specify/spec.md` (`Tool System` bullet) to reflect `inputSchema` enforcement, and add a `CHANGELOG.md` entry under `## [Unreleased]`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` covering `Unknown tool: <name>` throw, static compile-once caching across repeated calls, and dynamic schema caching by object reference; link the remaining unlinked statements in `specs/hal-engine-tool-input-validation/spec.md` and set its `| Status |` to `Shipped`.

## Out of scope

- Content-level validation or prompt-injection filtering of tool inputs (covered by separate issues in the epic).
- `beforeToolCall` veto hooks, authorization/permission checks, retry/timeout/rate-limiting wrappers around tool execution, and new concrete tool implementations.
- Enforcing schemas on `ToolResponse` outputs or mutating tool inputs via `useDefaults` / `coerceTypes` / `removeAdditional`.