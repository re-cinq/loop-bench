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
  - Round 1 landed the first `registry.test.ts` unit test (missing-required rejection, cited at spec.md line 12). Still owed: pass-through of extra properties, wrong-type rejection without value leak, register-time compile throw, per-call schema for function-valued sources, static-schema compile-once, `Unknown tool` pin, and the `chatOrchestrator.test.ts` tool-loop retry test.
  - Round 2 landed all of the above, repaired the four red CI checks from round 1 (typecheck: ajv named import; eslint: helper order, guard shape, `cause`, acceptance-loop restructure; changelog entry), and set the spec to `Shipped` with every statement cited. Acceptance tests are CI's to judge on this push.
  - Round 3 repaired the round-2 CI findings (typecheck TS2693/TS2339, test step). Root cause: the build environment resolves `ajv` to the ajv **6.15.0** hoisted at `node_modules/ajv` by main's lock (this branch's lock nests it and installs 8.20.0), so both prior import forms failed somewhere — default import is TS2351 under ajv 8 NodeNext, named import is TS2693 under ajv 6 `export =`, and ajv 6 spells the error path `dataPath`. The registry now resolves the constructor through a namespace import that works under both majors, reads the error path under either spelling, and the wrong-type test accepts both ajv wordings. Verified locally against BOTH installed trees: scoped `tsc` of the two files and 30 tests across `registry.test.ts` + `chatOrchestrator.test.ts` pass under 6.15.0 and 8.20.0. Spec links re-anchored by hand (the repoint script skips specs absent from origin/main).
  - Round 4 repaired the round-3 CI finding (eslint `re-lint/max-comment-lines`, registry.test.ts:81): the two-line comment above the wrong-type assertion is compressed to the one constraint the code cannot show — ajv 6 words the mismatch "should be", ajv 8 "must be" — since the no-value-echo half is already carried by the test name and the spec statement it cites. All 7 tests in `registry.test.ts` pass locally. Acceptance tests are still CI's to judge: the eslint step failed before the test step on the last run, so they have not executed on this branch's tip yet.
  - Round 5 repaired the round-4 CI finding (spec-names, 4 citations in `specs/hal-engine-tool-input-validation/spec.md` one line past their tests): the comment compression shifted the tests up a line without re-anchoring, so `npm run spec:names -- --fix` repointed the four `registry.test.ts` anchors (89→88, 107→106, 139→138, 162→161); the check now reports 406 named citations with exit 0. Next: acceptance green — the acceptance tests have still not executed on a tip whose checks all pass.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.