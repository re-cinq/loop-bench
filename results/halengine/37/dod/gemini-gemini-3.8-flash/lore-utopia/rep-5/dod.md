# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.execute` and `ToolRegistry.register` are public entry points that can be exercised directly with real schemas and inputs. Tests observe whether schema compilation happens at registration time and whether input validation runs before invoking the executor.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — validates that execute checks required fields against inputSchema, returns a rejection ToolResponse naming the missing field, and never invokes the executor
    `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a call whose field type is wrong, naming the field path and expected type but not the value** — validates that execute rejects a type mismatch naming the field path and expected type while redacting the offending value from the returned message
    `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time when the inputSchema is uncompilable and the message names the tool** — validates that register compiles the inputSchema synchronously and throws naming the tool when the schema is invalid
    `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] Compile static tool schema in `ToolRegistry.register` and throw naming the tool if uncompilable
- [ ] Validate input against resolved `inputSchema` in `ToolRegistry.execute` before calling the executor; return rejection `ToolResponse` on failure
- [ ] Ensure rejection messages and logs name failing property paths and constraints without leaking property values
- [ ] Support dynamic schema compilation/cache for function-valued `ToolDefinitionSource`
- [ ] Add unit test suite `src/orchestration/tools/registry.test.ts` covering extra properties, function definitions, and unknown tools
- [ ] Add orchestrator retry loop test in `src/orchestration/chatOrchestrator.test.ts`
- [ ] Add one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md`
- [ ] Add `CHANGELOG.md` entry for minor release

## Out of scope

- Validating tool output
- Returning an unknown tool name to the model instead of throwing (tracked separately)
- Hallucination detection and evaluation harness
- Per-tool authorization and beforeToolCall hook veto seam
- Retry, timeout, and rate limiting around tool execution