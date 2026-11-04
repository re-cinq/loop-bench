# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies`.

**Strategy: `direct`** — `ToolRegistry.execute` has a clear seam: the input parameter exists, the definition is available, and the only change needed is to add validation before calling the executor. The acceptance tests call the public `execute` method directly and assert that validation rejects or accepts input according to the schema.

## Done when these pass

- [ ] **rejects input missing a required field and returns ToolResponse without calling executor** — validates required properties and returns rejection instead of calling executor
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes valid input with all required fields through to executor unchanged** — executor receives input that passes schema validation
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes through extra properties that are not in the schema** — validation enforces required and types only, does not strip additionalProperties
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed field with message naming field and type, not the value** — type validation fails with descriptive message, no data values in response
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time for an uncompilable schema** — schema is compiled at register time for static definitions
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates function-valued tool definitions against the schema at call time** — function-defined schemas are resolved and validated per call
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles a static tool schema once across multiple execute calls** — static schema validation is cached across calls
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **still throws Unknown tool for unregistered tool name** — existing behavior preserved
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **does not include field values in rejection messages for security** — no identifying data in rejection messages
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **tool-loop test drives validation rejection followed by corrected retry** — orchestrator handles validation rejection as tool result and includes it in next round
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Add ajv to dependencies
- [ ] Compile schemas at register time for static definitions; cache resolution and compilation
- [ ] Add validation to execute() that calls the validator before the executor
- [ ] Return ToolResponse with descriptive error message on validation failure
- [ ] Never include field values in error messages
- [ ] Update specs/hal-engine-tool-input-validation/spec.md with testable statements
- [ ] Add one-line doc comment to execute() pointing to spec
- [ ] Update README.md, docs/adding-a-tool.md, .specify/spec.md
- [ ] Update CHANGELOG.md
- [ ] Ensure all tests cite spec statements with ([validated by ...]) links

## Out of scope

- Validating tool output
- Changing the "Unknown tool: <name>" throw to a rejection
- Tool authorization or beforeToolCall hook veto behavior
- Retry, timeout, or rate limiting around tool execution