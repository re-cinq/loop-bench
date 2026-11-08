# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — The `ToolRegistry` and `ChatOrchestrator` already exist and provide clear entry points for acceptance tests. We will use the existing `ToolRegistry.execute` and `ChatOrchestrator.processMessage` to observe the absence of validation.

## Done when these pass

- [ ] **Reject missing required field** — A tool requiring `location` string returns a rejection `ToolResponse` when called with empty input, and the executor is not called.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Pass through extra properties** — Valid input with an unlisted extra property is passed to the executor unchanged.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Reject wrong type** — A number passed where a string is required is rejected with a message naming the field path and expected type, without containing the value.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Validate static tool registration** — `register` throws at registration time for an uncompilable schema, naming the tool.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Validate function-valued tool** — A dynamic tool whose schema changes between calls is validated against the current schema.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Redact values in rejection** — Rejection messages do not contain the offending input values.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **End-to-end tool loop recovery** — The orchestrator drives a provider through a validation failure followed by a successful retry.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Create `specs/hal-engine-tool-input-validation/spec.md` with draft requirements.
- [ ] Add acceptance tests for `ToolRegistry` validation logic.
- [ ] Add acceptance tests for schema compilation and caching.
- [ ] Add end-to-end acceptance test for orchestrator recovery.
- [ ] Verify rejection messages redact sensitive values.

## Out of scope

- Validating tool output.
- Hallucination detection or evaluation harness.
- Per-tool authorization.
- Retry, timeout, or rate limiting around execution.
- Changing the `Unknown tool: <name>` throw behavior.