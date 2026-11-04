# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies` — not a second, hand-written schema in a different format, since the schema already has to match what is handed to the providers.

**Strategy: `direct`** — The `ToolRegistry.execute` method already exists and is the seam where validation must occur. Tests call this real entry point and will fail on behaviour until validation is implemented.

## Done when these pass

- [ ] **Rejects required field missing** — input missing a required field is rejected before executor runs
  `src/orchestration/tools/registry.acceptance.test.ts:L24`

- [ ] **Passes valid input unchanged** — input matching schema reaches executor with no modification
  `src/orchestration/tools/registry.acceptance.test.ts:L37`

- [ ] **Rejects wrong type with field path** — type mismatch rejected with field name and type, not value
  `src/orchestration/tools/registry.acceptance.test.ts:L65`

- [ ] **No value leak in errors** — rejection messages and logs contain no property values
  `src/orchestration/tools/registry.acceptance.test.ts:L95`

- [ ] **Schema compiled once** — static schema compiled at register time, reused across calls
  `src/orchestration/tools/registry.acceptance.test.ts:L122`

- [ ] **Function schema re-validated** — function-valued schema re-resolved and validated per call
  `src/orchestration/tools/registry.acceptance.test.ts:L151`

- [ ] **Rejects invalid enum** — value not in enum list rejected with field name, not value
  `src/orchestration/tools/registry.acceptance.test.ts:L202`

- [ ] **Breaks at register time** — static schema uncompilable throws at registration, names tool
  `src/orchestration/tools/registry.acceptance.test.ts:L229`

- [ ] **Tool loop resolves on rejection** — invalid tool call rejection sent to model, conversation continues
  `src/orchestration/chatOrchestrator.test.ts:L524`

## Facets

- [ ] Schema validation at execute time, before executor call
- [ ] Rejection returns ToolResponse (not throw) for invalid input
- [ ] Static schemas compiled once at register time
- [ ] Function schemas compiled per call
- [ ] Schema compilation errors throw at register time
- [ ] Error messages name fields and types, never values
- [ ] Only required, types, enum enforced (no coercion, no additionalProperties)
- [ ] Unknown tool name still throws (unchanged)

## Out of scope

- Validating tool output
- Per-tool authorization
- Changing the "Unknown tool" error to a ToolResponse
- Retry, timeout, or rate limiting
- Actual tool implementations