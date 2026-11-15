# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every
> tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but
> nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already expose the exact runtime boundaries where static schemas are registered, inputs are validated, and rejected calls re-enter the tool loop. Each acceptance test calls those entry points directly and fails today because `execute` invokes the tool executor without validating `inputSchema` and `register` stores static definitions without compiling their schemas.

## Done when these pass

- [ ] **rejects input that violates required, type, or enum constraints without calling the executor or leaking values** — `ToolRegistry.execute` rejects missing required properties, wrong types, and disallowed enum values with a `ToolResponse` naming the failing property and constraint, calls the executor zero times, and never writes offending or identifying field values into the returned `result` or any log line.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time naming the tool when a static inputSchema cannot be compiled** — `ToolRegistry.register` compiles static schemas eagerly at registration time and throws an error naming the broken tool.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates against the schema a function-valued definition returns on each call and forwards extra properties unchanged** — a function-valued `ToolDefinitionSource` resolves and validates against the schema current at each `execute` call rather than a cached registration-time schema, and valid input carrying unlisted extra properties reaches the executor unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **feeds a schema rejection back through the orchestrator tool loop so the model can correct its call on the next round** — `ChatOrchestrator.processMessage` forwards a validation rejection `ToolResponse` to the provider as `tool_result` content without invoking the executor on the malformed call, allowing the model to retry and complete the turn.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to runtime `dependencies` in `package.json` (regenerating `package-lock.json` and ensuring `npm run check:audit` stays clean) and compile static `inputSchema` definitions once in `ToolRegistry.register`, throwing an error naming the tool when compilation fails.
- [ ] Validate `input` in `ToolRegistry.execute` against the compiled static validator (or the schema resolved from a function-valued `ToolDefinitionSource` in a single invocation per call) with no `additionalProperties: false` injection, coercion, or defaults, returning `{result}` and logging `log.warn('tool', ...)` naming failing property paths and constraints without any field values.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`, add unit tests in `src/orchestration/tools/registry.test.ts` (including static single-compilation across ten calls and the unchanged `Unknown tool: <name>` throw) and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and flip its status to `Shipped`.
- [ ] Update the five documentation sites that state `inputSchema` is not enforced (`README.md`, `.specify/spec.md`, `specs/hal-engine-architecture/spec.md`, `example/weather-tool.ts`, and regenerated `docs/adding-a-tool.md` via `npm run docs:fix`), add a `CHANGELOG.md` entry, and bump `package.json` + `package-lock.json` by a MINOR version.

## Out of scope

- Changing `Unknown tool: <name>` from a thrown `Error` to a `ToolResponse`.
- Validating tool executor outputs.
- Coercing input types, injecting `additionalProperties: false`, or applying JSON Schema defaults.
- Per-caller authorization, retry, timeout, or rate limiting around tool execution.