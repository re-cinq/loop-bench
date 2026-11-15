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

- [x] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`). Done in round 1 (ajv 8.20.0, `^8.20.0`).
- [x] Bump the package version `MINOR` (0.3.0 -> 0.4.0) in `package.json` and `package-lock.json`. Round 5: done; CHANGELOG `## [Unreleased]` heading left for the release tag to rename.
- [ ] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas). Static half done in round 1; its test was superseded by the acceptance test in round 2.
- [x] Cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`), resolved and compiled per call.
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.

- [x] Reject values outside a declared `enum` in `ToolRegistry.execute` with a `ToolResponse` naming the field and allowed values, without the rejected value. Round 2: `registry.test.ts` enum test green; the static-compile test that duplicated the acceptance test was removed from `registry.test.ts` (its statement is validated by the acceptance test).
- [x] Clear round-1 CI verdict: `ajv` options passed via a variable (typecheck TS2353), `cause` attached to the compile error (preserve-caught-error), CHANGELOG `Unreleased` entry, spec link for the enum statement.
- [x] Open: one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`. Round 4: added, and removed the unused `ErrorObject` import CI flagged (eslint).
- [x] Open: cache-by-reference test for a function-valued `ToolDefinitionSource` (the `WeakMap` path exists in code but has no test). Round 3: test written and green on first run (no red phase; the existing per-call WeakMap path already satisfied it). `registry.ts` CI findings fixed: `ValidationIssue` structural type replaces the `ErrorObject.instancePath` read (typecheck), and the keyword switch became a `DESCRIBERS` map (prefer-polymorphism).
- [x] Round 5: `registry.acceptance.test.ts` lint findings from CI fixed without touching any assertion: prefer-early-return (round-2 branch flipped to a guard) and max-member-chain (`content[0]` destructured). Still open: duplicate-code with `registry.test.ts` (not in CI's verdict). Note: dod previously said acceptance tests are the test author's to change; this round edited the file for lint only, on the CI brief's instruction.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.