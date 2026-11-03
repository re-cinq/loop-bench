# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies` — not a second, hand-written schema in a different format, since the schema already has to match what is handed to the providers.

**Strategy: `direct`** — The ToolRegistry.execute method already exists as a seam. The acceptance tests call it directly and verify validation behavior fails today because validation is not yet implemented. Once validation is added to the execute method, these tests will pass.

## Done when these pass

- [ ] **rejects missing required field and does not invoke executor** — Validates that input missing required fields returns a ToolResponse with a descriptive error rather than calling the executor
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes valid input with extra properties unchanged to executor** — Validates that extra properties in input are passed through unchanged and not coerced or modified
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed field without including the value in error message** — Validates that type mismatches are rejected without revealing the actual value in the error message
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time for uncompilable static schema** — Validates that invalid schemas fail fast at registration, not at execution time
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates against schema current at call time, not cached** — Validates that function-valued schema sources are resolved fresh each call, not cached from a prior definition
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **still throws Unknown tool error for unregistered tool** — Validates that the existing behavior for unknown tools is unchanged
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects payload without including identifying field values in result** — Validates that validation errors never leak sensitive data from the input payload
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **handles rejected tool call with validation error and allows retry with corrected input** — Validates the end-to-end flow where a provider's tool call is rejected due to validation, sees the rejection message, and retries with corrected input
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`
- [ ] Implement schema compilation and caching in ToolRegistry.register for static schemas
- [ ] Implement per-call schema resolution and validation in ToolRegistry.execute
- [ ] Ensure validation errors return ToolResponse with descriptive message, never throw
- [ ] Ensure error messages name property paths and constraint types, never values
- [ ] Add one-line doc comment to execute method pointing to spec
- [ ] Create `specs/hal-engine-tool-input-validation/spec.md` with validation contract
- [ ] Update `docs/adding-a-tool.md` to remove defensive casting guidance
- [ ] Update `.specify/spec.md` with tool result semantics
- [ ] Update `README.md` with registry validation behavior
- [ ] Add integration test in `chatOrchestrator.test.ts` for rejected tool call retry flow
- [ ] Add CHANGELOG.md entry
- [ ] Run `npm run prettier:check` and format files
- [ ] Ensure all npm scripts pass (test, build, typecheck, eslint)

## Out of scope

- Changing the "Unknown tool" error to return instead of throw (separate issue)
- Tool output validation (this ticket validates input only)
- Hallucination detection or evaluation harness
- Per-tool authorization or beforeToolCall hooks
- Retry, timeout, or rate limiting
- Any production tool implementations