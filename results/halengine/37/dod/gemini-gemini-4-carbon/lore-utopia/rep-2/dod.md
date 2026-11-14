# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already ship as public entry points, so the acceptance tests call them directly with real tool definitions and fail today because `register` never compiles static schemas and `execute` invokes the executor without validating `input` against `inputSchema`.

## Done when these pass

- [ ] **throws at registration time naming the tool when a static inputSchema cannot be compiled** — registering a static `ToolDefinition` with an invalid JSON Schema throws synchronously at startup with an error message naming the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field naming the path and expected type without calling the executor or leaking input values** — calling `ToolRegistry.execute` with a wrong-typed property skips the executor, returns a `ToolResponse` whose `result` names the failing field path and expected type, and omits both the offending value and other input field values from `result` and all log output.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates a function-valued tool definition against the schema returned on each call** — a `() => ToolDefinition` source resolves per `execute` call and enforces the current schema (including `enum` constraints) rather than reusing a stale validator from an earlier call.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a missing-required-field rejection to the model so a retry with extra properties succeeds** — inside `ChatOrchestrator.processMessage`, a missing `required` field returns a `ToolResponse` naming the required field as a `tool_result` without throwing, and a subsequent corrected tool call carrying an unlisted extra property reaches the executor unchanged once.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to runtime `dependencies` in `package.json` (and `package-lock.json`) so JSON Schema compilation and validation ship with the published package.
- [ ] Compile static tool schemas once at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` definitions by resolved `inputSchema` object reference.
- [ ] Validate `input` in `ToolRegistry.execute` (`required`, declared types, and `enum` only — no `additionalProperties: false` injection, coercion, defaults, or opt-out flag), returning a `ToolResponse` naming failing property paths and constraints without leaking any property value in `result` or logs, plus a one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` covering required-field rejection, extra-property passthrough, wrong-type and identifying-value redaction, startup schema compile error, dynamic schema refresh, single static schema compilation across ten `execute` calls, `Unknown tool: <name>` throw, and tool-loop retry, linking all remaining statements in `specs/hal-engine-tool-input-validation/spec.md` and updating its `Status` row accordingly.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, and bump `version` (MINOR) in `package.json` and `package-lock.json` to match the shipped validation contract.

## Out of scope

- Changing `Unknown tool: <name>` from a thrown error into a model-visible `ToolResponse`.
- Validating tool output returned by an executor.
- Hallucination detection or a tool evaluation harness.
- Per-tool authorization or `beforeToolCall` hook veto handling.
- Retry, timeout, or rate-limiting policies around tool execution, and concrete domain tool implementations.