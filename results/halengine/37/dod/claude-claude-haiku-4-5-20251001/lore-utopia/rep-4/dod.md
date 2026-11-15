# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies`.

**Strategy: `direct`** — `ToolRegistry` exposes `register()` and `execute()` as public methods that can be called directly in tests. No seam needs to be introduced; the acceptance tests call the real entry points today.

## Done when these pass

- [ ] **validates missing required field and does not invoke executor** — Input validation rejects missing required fields without calling the executor
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes valid input through to executor unchanged** — Valid input is forwarded to the executor without modification
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes extra properties through to executor unchanged** — Extra undeclared properties pass through unmodified
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed field with path and type, not value** — Type validation rejects type mismatches and reports the path and expected type, never the actual value
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects enum constraint violation** — Enum validation rejects values not in the allowed set
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time for uncompilable static schema** — Static schema compilation errors are caught at registration time
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles static schema once** — Static schemas are compiled once, not repeatedly per call
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **revalidates function-valued schema on each call** — Function-valued schemas are re-resolved and revalidated on each execute call
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **still throws Unknown tool for unregistered name** — Unknown tool names still throw, not return a rejected ToolResponse
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **never exposes values in rejection messages** — Rejection messages never contain actual property values for privacy
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects invalid tool input and allows retry within tool round budget** — Invalid tool input is rejected as a ToolResponse visible to the provider, allowing the model to retry
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **rejects invalid input does not call executor** — Invalid input never invokes the executor
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Implement JSON Schema validation in `ToolRegistry.register()` for static schemas, throwing on uncompilable schemas
- [ ] Implement JSON Schema validation in `ToolRegistry.execute()` before calling the executor
- [ ] Return `ToolResponse` with a `result` describing validation failures instead of throwing
- [ ] Add `ajv` to `package.json` `dependencies`
- [ ] Cache compiled schemas for static tool definitions
- [ ] Ensure validation error messages never contain property values
- [ ] Ensure `execute()` still throws for unknown tool names

## Out of scope

- Validating tool *output* (post-execution)
- Per-tool authorization checks
- Injecting `additionalProperties: false` into schemas
- Automatic type coercion or default value injection
- Opt-out flags for validation
- Changing the `Unknown tool` error to return a ToolResponse instead of throwing