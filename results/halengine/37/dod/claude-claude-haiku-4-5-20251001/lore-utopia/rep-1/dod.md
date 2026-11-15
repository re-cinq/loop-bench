# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator added to `dependencies`

**Strategy: `direct`** — `ToolRegistry.execute` and `register` methods exist as seams. The acceptance tests call the real entry points directly and assert validation behavior that must be added to these methods.

## Done when these pass

- [ ] **missing required field is rejected** — `ToolRegistry.execute` validates `input` against the tool's `inputSchema` before calling the executor; when a required field is absent, it returns a `ToolResponse` with a rejection message, and the executor is never invoked
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **valid input with extra properties passes through unchanged** — extra properties in the input that are not in the schema are passed through to the executor without modification or coercion
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **wrong-typed field is rejected without leaking value** — when a field has the wrong type, the rejection message names the field path and the expected type, but never includes the offending value
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **register throws for uncompilable schema** — `ToolRegistry.register` validates the schema at registration time; an invalid schema causes a throw that names the tool
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **function-valued schema validates against current call schema** — when a tool definition is a function that returns different schemas on different calls, each `execute` call validates against the schema that function returns at that moment, not a stale cached version
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **static schema compiled once** — a static tool's schema is compiled once at registration time and reused across multiple `execute` calls without recompilation errors
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **unknown tool still throws** — `ToolRegistry.execute` still throws `Unknown tool: <name>` for unregistered tool names
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejection does not leak property value** — rejection messages and logs name the property that failed and the constraint, but never include the property's value (which may be sensitive data)
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **tool loop with validation and retry** — when a tool call fails validation, `processMessage` resolves (does not reject) and the rejection text is visible to the provider on the next round, allowing it to retry within the tool-call budget
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validator (`ajv`) to `package.json` `dependencies`
- [ ] Compile schemas in `ToolRegistry.register` (static schemas compiled once at register time)
- [ ] Add validation logic in `ToolRegistry.execute` before executor is called
- [ ] Validation returns `ToolResponse` on failure, never throws (except for unknown tools and schema compilation errors)
- [ ] Validation enforces `required`, declared types, and `enum` only — no type coercion, no `additionalProperties: false` injection, no defaults
- [ ] Update `execute` method with one-line doc comment pointing to spec
- [ ] Add spec file `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add inline `([validated by ...])` links in spec to each test
- [ ] Update `README.md` to state what the registry now does
- [ ] Update `docs/adding-a-tool.md` to reflect validation behavior
- [ ] Update `.specify/spec.md` to document tool input validation contract
- [ ] Add CHANGELOG.md entry for this change
- [ ] Ensure all checks pass: typecheck, eslint, tests, build

## Out of scope

- Changing the `Unknown tool: <name>` throw to return a `ToolResponse` (tracked separately)
- Validating tool output or hallucination detection
- Per-tool authorization checks
- Retry, timeout, or rate limiting logic
- Opt-out flags for validation