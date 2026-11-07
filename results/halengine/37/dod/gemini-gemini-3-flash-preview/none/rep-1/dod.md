# Definition of Done

> Validate tool input against the registered inputSchema inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies`

**Strategy: `direct`** — The `ToolRegistry` and `ChatOrchestrator` classes provide the necessary entry points to test validation, bypass, and retry behavior. Acceptance tests drive the framework through valid and invalid tool calls to observe the contract.

## Done when these pass

- [ ] **ToolRegistry.execute validates input before executor** — Rejects missing required fields and does not invoke the executor.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute returns ToolResponse on failure** — Returns a normalized response describing the error instead of throwing.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute does not call executor on failure** — Ensures bypass logic is strictly enforced.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute passes through extra properties** — Ensures no pruning or `additionalProperties: false` injection.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute does not modify input** — Confirms no type coercion or default injection.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute enforces required fields** — Specifically tests `required` constraint.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute rejects wrong types** — Specifically tests type constraints.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute redacts values from errors** — Rejection message names the field but not the offending value.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.register throws for invalid static schema** — Validates schema compilation at registration time.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute uses latest schema for dynamic tools** — Resolves and compiles per-call for function-valued sources.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute compiles static schema once at register** — Ensures efficiency for static tools.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute caches dynamic schemas by instance** — Ensures caching works for identical schema objects.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute throws for unknown tools** — Pins existing behavior for unregistered names.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ToolRegistry.execute redacts values from logs** — Confirms logs contain paths and constraints but no values.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **ChatOrchestrator handles tool rejection and retry** — Drives a full tool loop through a rejection and corrected retry.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Implement validation in `ToolRegistry.execute` using `ajv`.
- [ ] Add `ajv` to `dependencies` in `package.json`.
- [ ] Update `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md`.
- [ ] Add one-line doc comment to `execute` pointing at spec.
- [ ] Verify `npm run build` and generic import check pass.
- [ ] Add `CHANGELOG.md` entry.

## Out of scope

- Validating tool output.
- Returning "unknown tool" as a model result (it stays a throw).
- Retries/timeouts around execution itself.