# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — The `ToolRegistry` and `ChatOrchestrator` already exist. I've found existing acceptance tests that correctly characterize the missing behavior and fail as expected.

## Done when these pass

- [ ] **validates input against inputSchema** — `ToolRegistry.execute` validates the `input` object against the tool's `inputSchema` before calling the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **accepts valid input with extra properties** — Validation does not inject `additionalProperties: false`, meaning extra properties are passed through to the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejection names field path and expected type but redacts value** — Error messages and logs must never contain the actual values from the input.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration for invalid schema** — An invalid schema causes `register` to throw immediately.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic tools against the current schema** — For tools defined by a function, the schema is resolved and compiled on each call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static tools once** — The schema is compiled once at `register` time.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws for unknown tools** — Calling `execute` with a name not in the registry still throws an `Unknown tool` error.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **recovers from a validation error in a subsequent round** — When a tool call is rejected by the registry, the orchestrator receives the error as a `tool_result`. This allows the AI model to see the error and attempt to correct the call in a subsequent round.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` dependencies.
- [ ] Implement schema compilation in `ToolRegistry.register`.
- [ ] Implement validation in `ToolRegistry.execute`.
- [ ] Ensure `ChatOrchestrator` handles `ToolResponse` from the registry correctly (it should already, but needs verification).
- [ ] Update documentation (`README.md`, `docs/adding-a-tool.md`) and spec files (`.specify/spec.md`, `specs/hal-engine-tool-input-validation/spec.md`).

## Out of scope

- Validating tool output.
- Hallucination detection.
- Per-tool authorization.
- Retry, timeout, and rate limiting around tool execution.
- Changing `Unknown tool` throw to a `ToolResponse`.