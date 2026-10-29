# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are public entry points, and the orchestrator passes tool results back to a provider on the next round. The tests use those entry points and fail on the missing validation behavior.

## Done when these pass

- [ ] **returns a missing-location error to the model and lets it retry within the tool loop** — A rejected call reaches the provider as a tool result, then a corrected call completes the conversation without running the first call's executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects wrong types and enum values with path-only messages and logs** — Rejections identify paths and constraints without leaking field values or invoking the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses one registered static schema across ten calls while passing valid extra keys unchanged** — Registration freezes the static validation contract, valid extra fields pass through, and missing required input is rejected.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **fails registration for an invalid schema and keeps unknown-tool errors as throws** — Invalid schemas fail at registration with the tool name; unknown names preserve their existing exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each function-valued definition against the schema returned for that call** — A changed dynamic definition changes validation on the next call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas at registration.
- [ ] Validate resolved dynamic schemas per call, cache by schema object, and return path-only `ToolResponse` rejections without calling executors.
- [ ] Preserve valid input exactly, including unknown properties; do not coerce, default, or add an opt-out.
- [ ] Keep unknown-tool throws and add the one-line `execute` comment pointing to the spec.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and the minor-version migration note.
- [ ] Run the named acceptance file until green, then complete CI build, typecheck, lint, formatting, and the remaining repository gates.

## Out of scope

- Validating tool output, authorizing calls, retries outside the existing tool-round bound, and changing unknown-tool handling.