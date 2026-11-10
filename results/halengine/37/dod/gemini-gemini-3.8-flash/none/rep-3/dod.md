# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — A seam already exists at ToolRegistry.execute. Acceptance tests can register a tool with an inputSchema, invoke execute with invalid input, and assert on the returned ToolResponse and executor invocation without any intermediate abstractions.

## Done when these pass

- [ ] **returns a rejection ToolResponse describing the missing required property without invoking the executor** — Asserts execute returns a rejection ToolResponse naming the missing required property and leaves the executor uncalled when required input is missing.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed input with a message naming the field and expected type without leaking the offending value** — Asserts execute returns a rejection ToolResponse naming the field path and expected type without leaking the offending value when a field has the wrong type, and leaves the executor uncalled.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validator dependency (`ajv`) to `dependencies` in `package.json`
- [ ] Compile static schemas at `register` time and throw an error naming the tool on uncompilable schema
- [ ] Resolve and compile function-valued tool definitions per call, caching by schema object
- [ ] Validate input in `ToolRegistry.execute` before executor invocation, returning rejection `ToolResponse` on failure without calling the executor
- [ ] Ensure rejection messages and logs name property paths and failed constraints without leaking offending property values
- [ ] Ensure valid input with extra unlisted properties passes through unchanged to the executor
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` covering static schema caching, function schema dynamism, valid input passthrough, unknown tool throw, and value redaction
- [ ] Add tool-loop retry test in `src/orchestration/chatOrchestrator.test.ts`
- [ ] Add one-line doc comment to `execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`

## Out of scope

- Changing the `Unknown tool: <name>` throw to return a `ToolResponse` (tracked separately)
- Validating tool output
- Hallucination detection and evaluation harness
- Per-tool authorization and beforeToolCall hooks
- Retry, timeout, and rate limiting around tool execution