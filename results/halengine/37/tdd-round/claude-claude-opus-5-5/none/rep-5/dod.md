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

- [x] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`) (version bump `MINOR` still open — see below).
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and reuse it on every `execute` (`registry.test.ts`).
- [ ] Cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`) — today they compile on every call.
- [x] Reject input missing a `required` property in `ToolRegistry.execute` with a `ToolResponse` before the executor runs (`registry.test.ts`).
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor (now done, compiled per call; needs register-time compile/cache) — returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.
- [x] Pin valid input with an unlisted extra property passing through to the executor unchanged, exactly once (`registry.test.ts`), and fix CI's `registry.test.ts` duplication, `preserve-caught-error` and changelog findings.
- [x] Validate a function-valued definition against the `inputSchema` it returns for that call, even when successive schemas share an `$id` (`addUsedSchema: false`; `registry.test.ts`).
- [ ] CI resolved ajv 6 typings/runtime for `import {Ajv} from 'ajv'` (TS2693, no `instancePath`, no `Ajv` export) although `package-lock.json` hoists ajv 8.20 — confirm CI's install matches the lockfile. The lockfile at 7e1ef47 already pins `node_modules/ajv` 8.20.0 (eslint keeps its own 6.15 nested) and `registry.test.ts` passes locally against it; re-read CI's verdict on the next push before changing the import.
- [ ] `registry.acceptance.test.ts` lines 141/143 fail `re-lint/prefer-early-return` and `re-lint/max-member-chain`; acceptance tests are not edited by implementation rounds, so this needs the test's author.
- [ ] Bump `package.json` version MINOR (0.3.0 → 0.4.0) and add the `CHANGELOG.md` entry.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.