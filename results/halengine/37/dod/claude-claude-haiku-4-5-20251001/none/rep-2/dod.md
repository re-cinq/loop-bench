# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies` — not a second, hand-written schema in a different format, since the schema already has to match what is handed to the providers.

**Strategy: `direct`** — The `ToolRegistry.execute` method already exists with a clear seam where input validation can be inserted before calling the executor. Tests call the real entry point and can verify that validation occurs and rejects invalid input with appropriate error messages.

## Done when these pass

- [ ] **rejects input missing a required field and does not call the executor** — validates that missing required fields are caught before executor invocation
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes through valid input with unlisted extra properties unchanged** — validates that validation does not coerce or add defaults, only enforces schema constraints
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects input with wrong type and does not include the value in the error message** — validates that type violations are caught and error messages redact property values
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time for an uncompilable schema** — validates that broken schemas fail fast at registration rather than mid-conversation
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates function-valued schemas against the current call version** — validates that dynamic schemas are re-evaluated per-call, not cached to a stale version
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles a static tool schema once across multiple execute calls** — validates that static schemas are compiled once at register time for efficiency
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **still throws Unknown tool for unregistered tool names** — validates that the existing unknown tool behavior is unchanged
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **does not include property values in error messages** — validates that rejection messages never leak property values (redaction for sensitive data)
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects enum constraint violations without including the invalid value** — validates that enum validation is enforced and error messages are safe
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes a tool validation rejection to the model as a tool result on the next round** — validates end-to-end that rejected tool calls return a ToolResponse the model can see and correct
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`
- [ ] Implement validation in `ToolRegistry.register` to compile static schemas and detect uncompilable schemas
- [ ] Implement validation in `ToolRegistry.execute` to validate input before executor invocation
- [ ] Return `ToolResponse` with validation error messages that name field paths and constraint names but never include values
- [ ] Add cache for static schema validators, with per-call validation for function-valued schemas
- [ ] Add doc comment to `execute` pointing to the full contract in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Create spec file `specs/hal-engine-tool-input-validation/spec.md` with full validation contract and test citations
- [ ] Update `docs/adding-a-tool.md` to remove defensive casting and document schema validation
- [ ] Update `README.md` to state the validation guarantee
- [ ] Update `.specify/spec.md` to document rejection behavior
- [ ] Add `CHANGELOG.md` entry with migration note about version bump (MINOR)

## Out of scope

- Validating tool output (hallucination detection is a separate concern)
- Changing `Unknown tool: <name>` behavior (tracked separately as returning unknown tool names to model instead of throwing)
- Per-tool authorization (a separate `ToolContext` boundary concern)
- Retry, timeout, and rate limiting around tool execution
- Type coercion or default injection (validation enforces declared schema only)