# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model. The shipped example shows the shape of the problem: `example/weather-tool.ts` declares `location` as a required string, then casts and defaults it (`(input.location as string) || 'Unknown'`) with a comment warning the reader that `inputSchema` shapes what the model sends but does not enforce it. That is the careful version, written by the people who wrote the engine — and it still answers a malformed call with a confidently formatted forecast for `'Unknown'` rather than telling the model it got the call wrong.

**Strategy: `direct`** — The seam already exists on `ToolRegistry`: `register` and `execute` are the existing public entry points for tool registration and execution. Acceptance tests call `ToolRegistry.execute` and `ToolRegistry.register` directly to observe validation and rejection behavior.

## Done when these pass

- [ ] **returns a rejection describing missing required input without invoking the executor** — calling `execute` with input violating `inputSchema.required` returns a `ToolResponse` whose result describes the missing property and never invokes the tool executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **redacts offending property values from validation failure messages** — calling `execute` with wrong-typed input produces a rejection result naming the failing property path without containing the offending property value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time for an uncompilable inputSchema naming the tool** — calling `register` with an uncompilable JSON Schema throws an error immediately at registration time naming the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validator dependency (e.g. `ajv`) to `package.json` `dependencies`.
- [ ] Validate and compile static `inputSchema` at `ToolRegistry.register` time, throwing on invalid schemas with the tool name.
- [ ] Validate `input` in `ToolRegistry.execute` before executor invocation, returning a rejection `ToolResponse` describing failures with values redacted.
- [ ] Support dynamic schema compilation and per-call caching for function-valued `ToolDefinitionSource`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and tool-loop retry test in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Update documentation in `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and add `CHANGELOG.md` entry.

## Out of scope

- Modifying the `Unknown tool: <name>` throw behavior.
- Validating tool output.
- Hallucination detection and evaluation harnesses.
- Per-tool authorization and access control.
- Tool execution retries, timeouts, and rate limiting.