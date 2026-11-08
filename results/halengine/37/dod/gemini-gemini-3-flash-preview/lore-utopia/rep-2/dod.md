# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — The `ToolRegistry` provides a clear entry point (`execute`) where validation logic can be inserted and observed. We will also test the `ChatOrchestrator` tool loop to ensure validation failures are correctly returned to the model for recovery.

## Done when these pass

- [ ] **ToolRegistry validates input against schema** — `execute` returns a `ToolResponse` result describing the failure and does not call the executor when input is invalid.
  `src/orchestration/tools/toolValidation.acceptance.test.ts`
- [ ] **Extra properties are passed through** — Unlisted properties in the input are passed to the executor unmodified.
  `src/orchestration/tools/toolValidation.acceptance.test.ts`
- [ ] **Rejection messages redacted and descriptive** — Error messages name the failing field path and expected type, but never the value.
  `src/orchestration/tools/toolValidation.acceptance.test.ts`
- [ ] **Schema compilation and caching** — Static schemas are compiled once at registration; dynamic schemas are re-compiled per call. `register` throws for invalid schemas.
  `src/orchestration/tools/toolValidation.acceptance.test.ts`
- [ ] **No sensitive value leakage in logs** — Log lines produced during rejected calls do not contain the rejected property values.
  `src/orchestration/tools/toolValidation.acceptance.test.ts`
- [ ] **Tool loop handles rejected call and corrected retry** — The orchestrator returns validation errors to the model, which can then successfully retry.
  `src/orchestration/chatValidation.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to dependencies.
- [ ] Implement `inputSchema` validation in `ToolRegistry.execute`.
- [ ] Implement schema compilation and caching in `ToolRegistry`.
- [ ] Ensure `ToolRegistry` redacts values in log lines and return messages.
- [ ] Update documentation (`README.md`, `docs/adding-a-tool.md`) and specs.

## Out of scope

- Validating tool output.
- Hallucination detection.
- Per-tool authorization.
- Retry, timeout and rate limiting around tool execution.