# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `createChatOrchestrator().processMessage` are existing entry points. The acceptance tests exercise schema rejection, schema lifecycle, and a corrected tool call through those paths.

## Done when these pass

- [ ] **validates model input before execution and preserves accepted input** — Reject required, type, and enum failures without leaking values or invoking the executor; preserve accepted input and unknown-name behavior.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema at registration and reuses it** — Reject an invalid schema at registration with the tool name and keep the original compiled contract over ten calls.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses the current schema from a function-valued definition** — Validate each call against the schema returned for that call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **lets the model correct a rejected tool call** — Return a validation result to the next provider round and complete the corrected call.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Compile static schemas at registration and cache dynamic schemas by resolved object.
- [ ] Validate required, type, and enum constraints before execution; return safe property-path errors without changing accepted input.
- [ ] Preserve unknown-tool throws and return validation failures as tool results through the bounded orchestrator loop.
- [ ] Add the runtime validator dependency, update tool docs and release notes, and make the package build and importable.

## Out of scope

- Tool output validation, tool authorization, retry and timeout policy, and changing unknown-tool behavior.