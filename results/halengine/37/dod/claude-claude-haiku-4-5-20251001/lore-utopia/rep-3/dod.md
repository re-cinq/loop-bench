# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies` — not a second, hand-written schema in a different format, since the schema already has to match what is handed to the providers.

**Strategy: `direct`** — The `ToolRegistry.execute` method already exists as a seam that can be called directly. The acceptance tests call the real entry point and verify that validation is performed before the executor runs, and that rejections are returned as `ToolResponse` objects rather than thrown.

## Done when these pass

- [ ] **rejects missing required field and returns ToolResponse with error message naming the field** — validates that `execute` returns a `ToolResponse` with `result` describing the failure when required fields are missing, and the executor is never called
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes input with unlisted extra properties unchanged to executor exactly once** — validates that extra properties are passed through without modification, coercion, or default injection
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed field with message naming field path and expected type, not the value** — validates that type mismatches are rejected with error messages naming the field and expected type, but never containing the actual value
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects non-enum value with message naming field and allowed values** — validates that enum constraint violations are rejected with appropriate error messages
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **still throws Unknown tool error for unregistered name unchanged** — validates that unregistered tools still throw `Unknown tool: <name>` as before, not returning a `ToolResponse`
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes valid input to executor** — validates that valid input passes through to the executor unchanged
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes valid input with context to executor** — validates that context is properly forwarded to executors
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles static tool schema once across multiple execute calls** — validates that static schemas are compiled once at registration time and reused
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates against schema current at call time when definition source is a function** — validates that function-valued schemas are resolved per call
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **does not include property values in error messages when rejecting invalid input** — validates that identifying data and sensitive values never appear in rejection messages
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time for an uncompilable schema, naming the tool** — validates that invalid schemas fail fast at registration time, before any execution
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`
- [ ] Implement schema compilation in `ToolRegistry.register` for static schemas
- [ ] Implement validation in `ToolRegistry.execute` before executor invocation
- [ ] Return `ToolResponse` with error description on validation failure (never throw)
- [ ] Ensure error messages never contain property values
- [ ] Support function-valued schema definitions that are re-validated per call

## Out of scope

- Validating tool output (only input is validated)
- Changing the `Unknown tool: <name>` throw behavior (stays as-is per ticket notes)
- Per-tool authorization (separate concern)
- Type coercion or default injection (validation is strict)
- `additionalProperties: false` injection (extra properties pass through)
- Documentation updates (listed in ticket but not part of acceptance test definition)
- PR integration tests (integration with orchestrator's tool loop is tested separately)
- CHANGELOG or spec link updates (not observable through tests)