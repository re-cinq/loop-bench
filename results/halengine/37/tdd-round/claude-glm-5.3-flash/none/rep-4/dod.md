# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute` and `createChatOrchestrator` already expose the exact entry points this ticket changes, so the acceptance tests call them directly today and fail because schema compilation and input validation are absent.

## Done when these pass

- [x] **rejects input missing a required property with a ToolResponse and never calls the executor** — `ToolRegistry.execute` validates `input` against `inputSchema`, returns a `ToolResponse` naming the missing required property, and does not invoke the executor.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [x] **rejects a wrong-typed property naming the field and expected type without leaking the offending value to the result or logs** — `ToolRegistry.execute` rejects a property with the wrong JSON Schema type without calling the executor, names the failing field path and expected type in `result`, and omits the offending property value from both `result` and emitted log lines. (Closed by reading the failing path through both ajv's `instancePath` and the `dataPath` the older majors in the resolution range report.)
  `src/orchestration/tools/registry.acceptance.test.ts`, `src/orchestration/tools/registry.test.ts`

- [x] **throws at register time naming the tool when a static inputSchema cannot be compiled** — `ToolRegistry.register` compiles a static `ToolDefinition`'s `inputSchema` once at registration time and throws synchronously naming the tool when the schema is invalid. (Implemented last round; register-time compile now attaches the caught error as `cause` — CI's verdict on this branch is what confirms the two above.)
  `src/orchestration/tools/registry.acceptance.test.ts`

- [x] **returns a schema rejection as a tool_result in the orchestrator loop so the model can correct the call on the next round** — `createChatOrchestrator` feeds a schema-rejected tool call's `ToolResponse.result` back to the provider as a `tool_result` without invoking the executor on the invalid call, allowing the model to retry with valid arguments and complete the turn.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [x] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`) and bump the package version `MINOR`. (ajv 8.20.0, version 0.4.0)
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
- [x] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [x] Add unit tests in `src/orchestration/tools/registry.test.ts` for the statements that had none — pass-through of undeclared extra properties, wrong-typed rejection without the offending value, `Unknown tool` throw, register-time compile reused across ten `execute` calls, and function-valued source validated against the schema current at each call — and cite every one of them (plus the wrong-typed acceptance statement) from `specs/hal-engine-tool-input-validation/spec.md`. The compile-once test observes reuse by mutating the registered schema after `register`; the function-source test resolves a different schema per call.
- [x] Update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `adrs/ADR-002-response-validation.md` to the new contract: input reaching an executor has already passed the declared schema, unknown keys may still be present, a rejection is returned to the model rather than thrown, and executors no longer need to cast defensively. (The orchestrator-loop unit test the previous facet named is covered by the acceptance test of the same name; the `CHANGELOG.md` entry and the MINOR bump are already in.) (Also repaired the two eslint findings CI reported on cc47110: spec Status flipped to Shipped — all 8 statements cited — and `failingPath` moved below `describeValidationErrors`.)

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.