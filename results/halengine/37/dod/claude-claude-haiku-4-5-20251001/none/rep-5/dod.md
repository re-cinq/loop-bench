# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies` — not a second, hand-written schema in a different format, since the schema already has to match what is handed to the providers.

**Strategy: `direct`** — The `ToolRegistry.execute` method is the seam where validation belongs. Tests can call it directly and verify that invalid input returns a `ToolResponse` without invoking the executor, and that valid input passes through unchanged. The validator will be added as a dependency and integrated into the registry's execute path.

## Done when these pass

- [ ] **returns ToolResponse when required field is missing, executor not called** — Missing required fields reject without invoking executor
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes unlisted extra property to executor unchanged** — Extra properties in input pass through to executor unmodified
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed field with field path and type, never the value** — Type mismatches reject with field path and expected type, never property values
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time for uncompilable schema** — Broken schemas fail early at register time
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles static schema once across multiple execute calls** — Static schemas compile once at registration, not per call
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates against schema current at call time for function-valued definition** — Function-valued schemas recompile per call and validate against current version
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws Unknown tool error for unregistered name** — Unknown tool names still throw (unchanged behavior)
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **never includes property values in rejection messages** — Rejected payloads with sensitive fields produce no log containing those values
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects value not in enum with constraint message** — Enum constraint violations reject with field path
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates nested properties and reports path correctly** — Nested object validation reports the full property path
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **tool validation rejection returns ToolResponse visible to provider for retry** — Tool-loop integration: rejected calls with validation errors are returned to the model as `ToolResponse` for retry, not thrown
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` dependencies
- [ ] Import and initialize `ajv` in registry.ts
- [ ] Compile static schemas at registration time
- [ ] Add schema caching for static schemas
- [ ] Cache function-valued schemas by resolved object identity
- [ ] Validate input before executor in `execute` method
- [ ] Return `ToolResponse` on validation failure (never throw)
- [ ] Ensure validation error messages never include property values
- [ ] Verify unknown tool still throws
- [ ] Add doc comment to `execute` method

## Out of scope

- Changing the `Unknown tool: <name>` throw behavior (tracked separately)
- Validating tool output
- Tool authorization checks
- Retry and timeout logic around tool execution
- Adding `additionalProperties: false` to validation
- Type coercion or injecting defaults