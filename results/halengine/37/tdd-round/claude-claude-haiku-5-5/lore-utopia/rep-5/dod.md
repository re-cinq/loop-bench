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

- [ ] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`) and bump the package version `MINOR`.
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
  - [x] Static schema compiled at `register` and throws naming the tool (round 2: `registry.test.ts` register-time test green).
  - [x] WeakMap cache for function sources (round 4: `registry.test.ts` function-source compile-once test green, 10 compiles -> 1).
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
  - [x] Reject enum violations (round 1: `registry.test.ts` enum test green; `execute` validates via ajv and returns a `ToolResponse`).
  - [x] Required-property rejection naming the property and `required` (acceptance test 1; unit coverage in `registry.test.ts` round 5: test passed on first run, behaviour already held from the ajv validation, so no red phase was observed).
  - [x] Wrong-type rejection naming field path and expected type, with no offending value in `result` or logs (acceptance test 2). Round 6: rejection now logs `input rejected` with ajv's path/constraint text; unit test in `registry.test.ts` went red then green.
  - [ ] One-line doc comment on `execute` pointing at the spec.
- [x] Static schemas compiled once at `register` and reused in `execute` (round 3: `registry.test.ts` ten-calls compile-count test green).
- [x] Cache function-source validators in a `WeakMap` keyed by the returned schema object (round 4 unit test green; acceptance test 3 is the separate validate-against-current-schema check, not yet confirmed by CI).
- [ ] Orchestrator loop: rejection flows back as a `tool_result` on the next round (acceptance test 4, `chatOrchestrator.test.ts` tool-loop test).
- [ ] Package version bumped MINOR; `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and migration note in PR body.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.

- [ ] Round 4 CI fixes: typecheck `strict` option and `instancePath` access removed (options hoisted to a const; error text via `ajv.errorsText`); eslint findings in `registry.acceptance.test.ts` (early-return and member chain, behaviour unchanged) and `registry.test.ts` member chain fixed. Awaiting CI verdict.

- [x] Round 5 CI fix: typecheck error at `registry.ts:8` resolved by dropping `validateFormats` (not an Ajv 8 option) and constructing `new Ajv({strict: false})`.
- [x] Round 6 CI fixes: typecheck `strict` option cast to the constructor's options type; eslint duplicate of the acceptance required-property test removed from `registry.test.ts`; spec link for that statement reduced to its trailing parenthetical and the remaining `registry.test.ts` links re-anchored. Typecheck and CI verdict not verified locally.
- [x] Round 7 CI fixes: spec links for `registry.test.ts` re-anchored to lines 7, 34, 49, 67; new spec statement and link added for the warn-log test at line 86 (spec-names and require-spec-link findings). Build verdict pending.