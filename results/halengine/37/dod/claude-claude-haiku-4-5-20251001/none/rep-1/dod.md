# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies` — not a second, hand-written schema in a different format, since the schema already has to match what is handed to the providers.

**Strategy: `direct`** — `ToolRegistry.execute` has a clear seam: it calls the executor directly at line 83. A validation step before that call is a straightforward addition with no need for parallel code or characterization.

## Done when these pass

- [ ] **missing-required-field** — Validates required fields and rejects input missing them; executor not invoked; rejection describes the missing field
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **extra-properties-pass-through** — Valid input with extra properties passes through to executor unchanged, exactly once
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **wrong-type-field-rejected** — Wrong-typed fields rejected with message naming field path and expected type, never the value
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **register-throws-on-bad-schema** — Static tool schemas compile at registration time; throws with tool name if schema is uncompilable
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **static-schema-compiled-once** — Static tool schema compiled once across ten execute calls
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **function-valued-schema-recompiles** — Function-valued schemas validate against current schema each call, not stale cache
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **unknown-tool-throws** — Unknown tool name throws `Unknown tool: <name>`, unchanged
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **no-identifying-data-in-rejection** — Rejection messages never contain property values or identifying data
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **enum-constraint-validation** — Enum constraints validated; invalid values rejected with message naming field
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **orchestrator-handles-rejected-tool** — `processMessage` handles rejected tool input, returns rejection to model within retry budget, resolves without throwing
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Add `ajv` to package.json `dependencies`
- [ ] Implement validation in `ToolRegistry.execute` using ajv
- [ ] Handle validation failure by returning `ToolResponse` instead of throwing
- [ ] Compile static schemas at `register` time; throw on uncompilable schema
- [ ] Cache compiled schemas per static tool definition
- [ ] Resolve and compile function-valued schemas per call (no caching)
- [ ] Ensure rejection messages name constraints and properties, never values
- [ ] Update rejection message text to never include identifying data or property values
- [ ] Format rejection messages in user-readable form for the model to act on

## Out of scope

- Authorization checks (separate concern tracked elsewhere)
- Validating tool output
- Changing the existing `Unknown tool: <name>` throw for unregistered tools
- Coercing or defaulting values based on schema
- Injecting `additionalProperties: false`
- Retry logic or timeout handling
- Documentation, specs, and changelog updates (these are separate acceptance criteria in the ticket)