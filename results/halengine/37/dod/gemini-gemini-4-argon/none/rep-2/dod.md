# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already exist and expose the exact entry points this ticket specifies, so the acceptance tests call them directly today and fail because schema compilation and input validation are absent.

## Done when these pass

- [ ] **rejects input missing a required property with a ToolResponse naming the property and without invoking the executor** — `ToolRegistry.execute` validates `input` against `inputSchema.required` before calling the executor and returns a rejection `ToolResponse` naming the missing property, with `clientMessages` and `suppressAssistantResponse` unset.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed property naming the field path and expected type without leaking any input value in the result or logs** — `ToolRegistry.execute` rejects wrong-typed properties without calling the executor, names the field path and expected type in `result`, logs a `WARN` under category `'tool'` with `{tool, errors}`, and redacts all input property values from both `result` and the log stream.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time when a static tool schema cannot be compiled, naming the tool** — `ToolRegistry.register` compiles a static `ToolDefinition`'s `inputSchema` at registration time and throws an `Error` naming the tool when compilation fails.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates a function-valued tool definition against the schema resolved for each call** — `ToolRegistry.execute` resolves a function-valued `ToolDefinitionSource` on every invocation and validates `input` against the `inputSchema` returned for that call.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a schema rejection to the model in the orchestrator tool loop and forwards valid input unchanged on retry** — `createChatOrchestrator` sends a schema rejection `ToolResponse.result` back to the provider as a `tool_result` without throwing out of `processMessage`, and forwards the model's valid retry input (including unlisted extra properties) to the executor unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false, allErrors: true`, no `coerceTypes`, no `useDefaults`, no `removeAdditional`, `verbose: false`), ensuring `npm run check:audit` passes.
- [ ] Compile static `ToolDefinition.inputSchema` in `ToolRegistry.register` (throwing an `Error` naming the tool on invalid schema) and validate `input` in `ToolRegistry.execute` (resolving function-valued `ToolDefinitionSource` per call, returning a rejection `ToolResponse` and logging `WARN` under `'tool'` with `{tool: name, errors: count}` on schema failure or dynamic-schema compilation failure, without leaking input values).
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and the orchestrator loop test in `src/orchestration/chatOrchestrator.test.ts`, linking every remaining statement in `specs/hal-engine-tool-input-validation/spec.md` and flipping its status to `Shipped`.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`, update `specs/hal-engine-architecture/spec.md` § Tool Execution Loop step 3 and `docs/adding-a-tool.md` § Step 2, and bump `package.json` version (MINOR).

## Out of scope

- Validating tool output (`ToolResponse.result` is a free-form string).
- Replacing `ToolDefinition.inputSchema`'s plain-object type with Zod (ADR-002 / ADR-005).
- Per-user or per-role tool authorisation, retry, timeout, or rate limiting around tool execution.