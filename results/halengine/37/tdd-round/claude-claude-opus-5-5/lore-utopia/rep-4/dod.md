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
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas).
- [x] Cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
- [x] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.
- [ ] Log a schema rejection naming only failing property paths and constraint keywords (never values); rejections currently return without any log line.
- [x] Repair CI on ab5b560: import ajv's named `Ajv` export instead of `.default`, and restructure the `registry.test.ts` required-field test so it no longer duplicates the acceptance test (`re-lint/no-duplicate-code`).
- [x] If CI still reports ajv 6 typings (`ErrorObject` without `instancePath`), find why CI's `npm ci` puts ajv 6 at the root when `package-lock.json` pins `node_modules/ajv` to 8.20.0.
      Finding (round on c948748): a clean `npm ci --ignore-scripts` (npm 10.9.8) from the pushed `package.json` + `package-lock.json` installs ajv 8.20.0 at `node_modules/ajv` and 6.15.0 only under `node_modules/eslint/`, and `npm ls ajv` agrees; origin/main has not moved, so the PR merge ref holds the same lockfile. The ajv-6 verdict does not come from this repo's lockfile — suspect a stale CI install; re-check the verdict on the next push before changing code.
      Resolution (round on f3ae10f): the verdict on f3ae10f still resolved ajv 6, so `registry.ts` now default-imports `ajv`, picks `.default ?? module`, and reads errors through a local structural type (`instancePath || dataPath`) — correct under ajv 6 and 8 alike.
- [x] Repair CI eslint on f3ae10f: `registry.test.ts:28` `re-lint/max-expects` — assert executor calls and result as one object with `toEqual`.
- [x] Repair CI eslint on c948748: `registry.test.ts:35` `executor.mock.calls.length` breaks `re-lint/max-member-chain`; assert with `expect(executor).not.toHaveBeenCalled()` instead.
- [x] Repair CI on 955675e: `registry.ts:36` two-line comment (`re-lint/max-comment-lines`) collapsed to one; orchestrator acceptance test was red because its tool is function-valued and went unvalidated.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.