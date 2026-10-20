# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies`

**Strategy: `direct`** — `ToolRegistry.execute` is a seam we can call directly. We can instantiate the registry, configure tools, pass bad input, and assert on the returned `ToolResponse`. The orchestrator's provider loop is also a direct seam we can test.

## Done when these pass

- [ ] **Tool Input Validation › validates input against inputSchema, returns ToolResponse on failure, and does not invoke executor** — `ToolRegistry.execute` returns a failure description instead of calling the executor when schema is violated
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool Input Validation › passes valid input with an unlisted extra property through to the executor unchanged exactly once** — The validator does not strip unlisted extra fields (additionalProperties: false is not injected)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool Input Validation › rejects a wrong-typed field with a message naming the field path and expected type, without offending value** — Type errors are detailed safely without reflecting untrusted input into logs/responses
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool Input Validation › throws at registration time for an uncompilable schema, and message names the tool** — Schema structure validity is checked upfront on register
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool Input Validation › validates a function-valued definition against the schema current at that call, not a stale cached one** — Function schemas resolve dynamically per execution
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool Input Validation › compiles a static tool schema once across ten execute calls** — Static schema compilation is cached effectively
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool Input Validation › still throws Unknown tool: <name> for an unregistered name, unchanged** — Unknown tool handling remains the only throwing path
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool Input Validation › produces no log line containing an identifying field value when payload is rejected** — Logs strictly do not reveal offending field values from validation
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **chatOrchestrator validation loop › drives a stub provider through a rejected tool call followed by a corrected retry, and processMessage resolves with rejection visible** — The orchestrator surfaces validation rejections to the provider driving the tool loop correctly
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Configure `ajv` inside `ToolRegistry` and add it to `package.json` `dependencies`.
- [x] Add `compileSchema` inside `register` and store it.
- [x] Evaluate input against compiled schema in `execute` early exit with `ToolResponse`.
- [x] Implement robust error message extraction per Ajv failure formatting without reflecting values.
- [x] Add JSDoc comments to `execute`.
- [x] Update `README.md`, `docs/adding-a-tool.md` and `.specify/spec.md`.

## Out of scope

- Validating tool output.
- Hallucination detection and an evaluation harness.
- Per-tool authorization.
- Retry, timeout, and rate limiting around tool execution.