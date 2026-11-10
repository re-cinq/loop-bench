# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` are already exported seams that acceptance tests can invoke directly to observe schema compilation at registration, rejection `ToolResponse` values on invalid input without invoking the executor or leaking values, dynamic schema resolution, and model recovery across tool rounds.

## Done when these pass

- [ ] **rejects input missing a required field with a ToolResponse and never invokes the executor** — calling `execute` with `{}` against a tool requiring `location` returns a `ToolResponse` whose `result` names `location` and leaves the executor's call count at `0`.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field without echoing the offending value in the response or logs** — calling `execute` with a numeric `location` where a string is required returns a `ToolResponse` naming `location` and `string`, never invokes the executor, and omits the offending value from both the returned `result` and all emitted log lines.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time for an uncompilable schema and names the tool** — passing a static `ToolDefinition` with an invalid JSON Schema to `register` throws synchronously with a message naming `broken_tool`.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued tool definition against the schema returned on each call** — a function-valued `ToolDefinitionSource` whose returned `inputSchema` changes its `required` array between calls validates each `execute` call against that call's resolved schema rather than a stale cached one.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a rejected tool call back to the provider as a tool_result so the next round can recover** — in `createChatOrchestrator`, a malformed tool call on round 1 resolves `processMessage` after the provider receives the rejection `tool_result` naming `location` and retries with valid input on round 2.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` runtime `dependencies` (and lockfile) and compile static tool schemas at `ToolRegistry.register` time, throwing an error that names the tool when compilation fails.
- [ ] Validate `input` in `ToolRegistry.execute` against the compiled schema (or resolve and cache per schema object for function-valued `ToolDefinitionSource`), returning `{result: '<what was wrong>'}` and logging only failing property paths and constraints without property values.
- [ ] Add `src/orchestration/tools/registry.test.ts` (including extra-property passthrough, single compilation across ten static `execute` calls, `Unknown tool: <name>` throw, and PII value redaction in logs/responses) and the tool-loop retry test in `src/orchestration/chatOrchestrator.test.ts`, citing each in `specs/hal-engine-tool-input-validation/spec.md` and flipping its status to `Shipped`.
- [ ] Add the one-line doc comment on `ToolRegistry.execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`, update `README.md`, `docs/adding-a-tool.md`, `example/weather-tool.ts` (if needed for doc-block sync), `.specify/spec.md`, `CHANGELOG.md`, and bump `package.json` version by MINOR.

## Out of scope

- Changing the `Unknown tool: <name>` throw to a returned `ToolResponse` (tracked separately).
- Validating tool output, hallucination detection, or evaluation harnesses.
- Per-tool authorization (`ToolContext` boundary / `beforeToolCall` hook).
- Retry, timeout, and rate limiting around tool execution.