# Definition of Done

> ToolRegistry.execute looks a tool up, logs the input's key names, and calls the executor without ever checking the declared inputSchema. Every tool declares a JSON Schema that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — The `ToolRegistry` and `ChatOrchestrator` are already implemented and have clear entry points. I can write acceptance tests that interact with these classes directly to verify the validation behavior.

## Done when these pass

- [ ] **validates input against inputSchema and rejects invalid input** — Verifies that `execute` validates input, returns a `ToolResponse` on failure, and does not call the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes through extra properties unmodified** — Verifies that properties not in the schema are allowed and not removed or changed.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects wrong-typed fields naming the path and type, but redacting the value** — Verifies that the error message is informative but secure.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time for uncompilable schemas** — Verifies that broken schemas are caught early.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves and validates function-valued definitions per call** — Verifies that dynamic schemas work correctly.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles and caches static schemas** — Verifies that static schemas are not re-compiled on every call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for unregistered names** — Verifies that the existing error behavior for missing tools is preserved.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **drives provider through a rejected tool call followed by a corrected retry** — Verifies that `ChatOrchestrator` handles validation failures by feeding them back to the model.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` dependencies.
- [ ] Implement schema compilation in `ToolRegistry.register`.
- [ ] Implement schema validation in `ToolRegistry.execute`.
- [ ] Ensure error messages redact values.
- [ ] Update documentation files (`README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`).
- [ ] Add `CHANGELOG.md` entry.

## Out of scope

- Validating tool output.
- Hallucination detection or evaluation harness.
- Per-tool authorization.
- Changing `Unknown tool` throw to a `ToolResponse`.