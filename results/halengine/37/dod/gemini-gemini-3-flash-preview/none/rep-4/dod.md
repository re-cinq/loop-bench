# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The `ToolRegistry` and `ChatOrchestrator` are existing public entry points. I can call `ToolRegistry.execute` and `ChatOrchestrator.processMessage` directly to observe the new validation behavior.

## Done when these pass

- [ ] **validates input against schema and returns ToolResponse on failure** — `ToolRegistry.execute` returns a `ToolResponse` with error details when input fails validation.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **never calls the executor if validation fails** — The executor is not invoked when the input is invalid.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes unlisted extra properties to the executor unchanged** — `additionalProperties` are allowed and passed through.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects wrong-typed fields with path and expected type but NOT the value** — Error messages are specific but redact input values.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time for an uncompilable schema** — Invalid JSON Schemas cause `register` to throw immediately.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves and compiles dynamic schemas per call** — Function-valued definitions are validated against their latest schema.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws Unknown tool for unregistered name** — Existing error behavior for missing tools is preserved.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **drives a retry loop through a rejected tool call** — `ChatOrchestrator` allows the model to correct a validation error.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Implement `ajv` validation in `ToolRegistry.execute`.
- [ ] Add `ajv` to `package.json` dependencies.
- [ ] Update `ToolRegistry.register` to compile schemas for static tools.
- [ ] Ensure dynamic tools resolve and compile schemas per call with caching.
- [ ] Implement value redaction in error messages.
- [ ] Update documentation files (`docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`).
- [ ] Add `CHANGELOG.md` entry.

## Out of scope

- Validating tool output.
- Changing `Unknown tool` throw to a `ToolResponse`.
- Per-tool authorization.
- Hallucination detection.