# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute` and `createChatOrchestrator` already expose the exact entry points this ticket changes, so the acceptance tests call them directly today and fail because schema compilation and input validation are absent.

## Done when these pass

- [ ] **rejects input missing a required property with a ToolResponse and never calls the executor** — `ToolRegistry.execute` validates `input` against `inputSchema`, returns a `ToolResponse` naming the missing required property, and does not invoke the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed property naming the field and expected type without leaking the offending value to the result or logs** — `ToolRegistry.execute` rejects a property with the wrong JSON Schema type without calling the executor, names the failing field path and expected type in `result`, and omits the offending property value from both `result` and emitted log lines.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time naming the tool when a static inputSchema cannot be compiled** — `ToolRegistry.register` compiles a static `ToolDefinition`'s `inputSchema` once at registration time and throws synchronously naming the tool when the schema is invalid.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a schema rejection as a tool_result in the orchestrator loop so the model can correct the call on the next round** — `createChatOrchestrator` feeds a schema-rejected tool call's `ToolResponse.result` back to the provider as a `tool_result` without invoking the executor on the invalid call, allowing the model to retry with valid arguments and complete the turn.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [x] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`).
- [ ] Bump the package version `MINOR` (split out of the `ajv` facet; release-time edit).
- [x] `ToolRegistry.execute` rejects input missing a `required` property with a `ToolResponse` naming it, without calling the executor (`registry.test.ts`; compiles per call for now, CHANGELOG entry added).
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time, throwing an error naming the tool on invalid schemas, and reuse that validator in `execute` (`registry.test.ts`).
- [x] Cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`) (`registry.test.ts`).
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [x] Pin that valid input with an undeclared extra property reaches the executor unchanged, exactly once (`registry.test.ts`, linked in the spec).
- [x] Pin in `registry.test.ts`: a static schema compiles once across ten `execute` calls (linked in the spec).
- [x] Pin in `registry.test.ts`: a function-valued schema that differs between calls is validated against the current one (linked in the spec).
- [x] Pin in `registry.test.ts`: `Unknown tool: <name>` still throws (link the spec statement that already exists).
- [x] Add a tool-loop test in `chatOrchestrator.test.ts` (rejected call, then corrected retry; linked in the spec).
- [ ] Add remaining unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.

- [x] CI resolved `ajv` 6 (eslint's transitive copy) for `import … from 'ajv'` although a clean `npm ci` from the lockfile hoists 8.20.0 — round 6 made resolution hoisting-independent by depending on `ajv8` (`npm:ajv@^8.20.0`) and importing from `'ajv8'`. If the verdict now says `Cannot find module 'ajv8'`, CI is not installing from this branch's lockfile.
- [x] CI still said `Cannot find module 'ajv8'`: CI's tree behaves like main's install, whose only top-level `ajv` is 6.15.0 (shared with eslint). Round 7 switched to `"ajv": "^6.15.0"` in `dependencies` (draft-07, `format: false`, `dataPath` in messages), which resolves the same in either tree.
- [x] `registry.acceptance.test.ts:141`/`:143` tripped `re-lint/prefer-early-return` and `re-lint/max-member-chain`; round 7 restructured the stub provider's round-2 branch for lint only (assertions unchanged).
- [x] CI brief on 4e14f4d (ajv8 typecheck, acceptance-test lint, spec status) was already addressed by 8e19c19; round 8 found nothing further to fix there.
- [x] `re-lint/require-status-matches-coverage`: spec Status set to `Shipped` (8 of 8 statements linked).

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.