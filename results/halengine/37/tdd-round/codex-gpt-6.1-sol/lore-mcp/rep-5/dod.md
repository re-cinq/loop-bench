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

- [x] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`) and bump the package version `MINOR`.
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time, throwing an error naming the tool on invalid schemas.
- [x] Retain static compiled validators for reuse and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.

- [x] Return a required-property schema rejection before invoking a static tool executor, and use the Ajv CommonJS default constructor for NodeNext compatibility.
- [x] Repair CI lint findings in the acceptance provider fixture without changing its assertions or round sequence.
- [ ] Diagnose the providerFactory.test.ts VertexAI failure from a complete CI exception (the supplied tail omits the exception message; Lore CI lookup returned branch not found).
- [ ] Pin static validator reuse and dynamic schema-object caching with focused unit coverage; complete privacy/type/enum coverage and rejection logging.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.

- [x] Repair the CI-reported Ajv constructor import and required-input test assertion count; pin static and repeated dynamic schema validator reuse.
- [ ] Pin distinct dynamic schemas enforcing current per-call rules and complete privacy/type/enum coverage and rejection logging.

Latest round: the supplied CI verdict names the Ajv import, required-input assertion count, and constructor failures in existing config tests. The older providerFactory diagnostic remains unconfirmed by this verdict.

- [x] Repair the latest CI Ajv named-export failures, validator narrowing errors and nested-if/member-chain lint findings.
- [x] Pin distinct dynamic schemas enforcing the current location type on each call.

Latest round: the new dynamic-schema test was green immediately in this pod, so no local RED was established. Repaired all findings in the supplied CI verdict; CI must confirm typecheck, lint and existing suites. Next: privacy/type/enum coverage and rejection logging.

- [x] Repair the CI-reported Ajv default-property imports in the registry and reuse test using the typed named constructor export.
- [x] Log wrong-type input rejections with the field path and constraint without identifying values, pinned by a focused privacy test.
- [ ] Pin valid input pass-through, enum rejection, unknown-tool behavior and orchestrator recovery; finish consumer documentation.

Latest round: one privacy test failed for the missing rejection warning, then passed after adding safe logging. CI-reported Ajv imports repaired; CI must confirm the existing failures are resolved.

- [x] Repair CI named-export constructor failures and privacy assertion-count lint finding; pin enum rejection with a default-only Ajv export.

Latest round: the new module-compatibility test reproduced the missing Ajv named export, then passed using the default constructor with explicit constructor typing. The privacy assertion retains its value-leak check in a single expect. Only this new test ran locally; CI owns the existing tests and type/lint checks. Next: valid input pass-through, unknown-tool behavior, orchestrator recovery and consumer documentation.

- [x] Repair CI option typing and normalize legacy/current Ajv enum rejection diagnostics with focused pure coverage.

Latest round: one diagnostic test failed because the formatter was absent, then passed after adding it and wiring registry rejections through it. Replaced the version-sensitive Ajv Options annotation with the constructor options actually supplied. CI owns confirmation of the previously reported typecheck and interop failures. Next: valid input pass-through, unknown-tool behavior, orchestrator recovery and consumer documentation.