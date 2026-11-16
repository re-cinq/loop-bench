# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` and `register` already exist and are callable with real definitions and executors; the behaviour (validation, rejection as a `ToolResponse`) is absent.

## Done when these pass

- [ ] **Missing required property** — rejected, result names `location`, executor not called.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Extra property passthrough** — valid input with an unlisted key reaches the executor unchanged, once; invalid input never does.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Wrong type** — message names the path and expected type, not the value.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Uncompilable schema** — `register` throws naming the tool.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Function-valued definition** — validated against the schema current at that call.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **No value in logs or result** — rejected payload values appear in neither.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; compile static schemas in `register`, throwing with the tool name.
- [ ] Validate in `execute` before the executor; return a `ToolResponse` naming paths and constraints, never values.
- [ ] Cache compiled function-valued schemas by resolved schema object.
- [ ] Tool-loop test in `chatOrchestrator.test.ts`, compile-once test, unknown-tool throw pin (follow-up rounds).
- [ ] Docs, README, `.specify/spec.md`, CHANGELOG, one-line doc comment on `execute`.

## Out of scope

- Unknown-tool throw stays; output validation; authorization; retry/timeout; `additionalProperties` injection, coercion, defaults.