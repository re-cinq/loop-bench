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
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
- [x] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [x] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.
  - Started: `registry.test.ts` exists with the required-property rejection (cited at the spec's second Validation bullet), and `CHANGELOG.md` carries an Unreleased entry.
  - Round of 2026-10-20: repaired the red build — switched to ajv's named class import (`import {Ajv} from 'ajv'`; the default import is not constructable under NodeNext and crashed the schema-error path at runtime), attached `cause` on the register-time throw, split the flagged member chains in `registry.ts` and the orchestrator-loop acceptance test (structure only, assertions untouched), and added the passthrough unit test (cited at the spec's fourth Validation bullet). Remaining: the unknown-tool, compile-once, per-call-schema and no-value-leak unit tests, the `chatOrchestrator.test.ts` rejection-retry loop test, the remaining spec statement links, and the four docs (`example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`) plus ADR-002.
  - Round of 2026-10-20 (second): closed this facet — ajv now loads through `createRequire` behind local structural types (the CI build still failed on the `import {Ajv}` named export under jest ESM and on `ErrorObject` typings this checkout cannot reproduce, so the module identity and error shape no longer depend on how ajv resolves), added the unknown-tool, compile-once (post-register schema mutation, ten calls) and per-call-schema unit tests plus the `chatOrchestrator.test.ts` rejection-retry loop test, linked the three previously uncited spec statements and the new orchestrator-loop statement, and flipped the spec to `Shipped`. The no-value-leak check stays with the acceptance suite (its second test already asserts result-and-log non-leak), so no duplicate unit test was added. Docs updated: `example/weather-tool.ts` (no defensive casts or 'Unknown' default), `docs/adding-a-tool.md` (executor guidance rewritten; doc block regenerated via `check-doc-blocks --fix`), `README.md` (the registry enforces the schema), `.specify/spec.md` (rejection is a tool result, round bound stops retry spin, extras pass through), ADR-002 (tool-input half shipped with ajv; output validation stays proposed).
  - Round of 2026-10-20 (third): repaired the red CI verdict (typecheck, eslint, test, spec-names) with no behaviour change — imported `ToolDefinition` in `registry.test.ts` from `src/types/ai.js` where it is declared (the previous round imported it from `registry.js`, which only declares it), rewrote the orchestrator-loop test's `sent[1].messages.flatMap(...)` extraction as a plain loop (the flatMap could not type a union of `ToolCallContent[] | ToolResultContent[]` and the chain exceeded re-lint's two-hop max), and ran `spec:names --fix` to repoint the 29 drifted citations (the previous round's test-file edits moved every `chatOrchestrator.test.ts` anchor six lines and every `registry.test.ts` anchor one line). Both unit suites pass locally; the four acceptance tests stay with CI.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.