# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry` is exported and `execute` is already the real entry point, so the acceptance tests call it today and fail on behaviour. No production code was written.

The red bar was run in this pod: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts` fails 4 of 4, each on the missing validation (the executor runs and returns `forecast` for rejected input, and an uncompilable schema does not throw at `register`). CI's job "Verify", step "Test (with coverage floor)" (`npm run test:coverage`, `.github/workflows/ci.yml`), runs the same suite on every push.

## Done when these pass

- [ ] **rejects input missing a required property before the executor runs** — a required `location` absent from `{}` gets a `ToolResponse` naming `location` as required, and the executor is called zero times
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming its path and expected type, never echoing the value** — a number where a string is required is rejected with `location` and `string` in the message, and the value does not appear
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws with the tool name in the message
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — a schema that changes between calls is applied per call, not a stale cached one
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate in `ToolRegistry.execute` before the executor, returning a `ToolResponse` on rejection (makes the first two tests pass)
- [ ] Compile static schemas once in `register`; throw naming the tool on an uncompilable schema (third test)
- [ ] Resolve and compile function-valued sources per call, cached by resolved schema object (fourth test)
- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] Pin with a test (passes today, so it is a regression guard, not a red bar): valid input with an extra property reaches the executor unchanged, exactly once
- [ ] Pin with a test (passes today): an unregistered name still throws `Unknown tool: <name>`
- [ ] Pin with a test: a rejected payload produces no log line and no returned text containing the value
- [ ] Tool-loop test in `chatOrchestrator.test.ts`: a rejected call then a corrected retry resolves `processMessage` with the rejection visible to the provider
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `CHANGELOG.md`, and the spec's statements to cite their tests

## Out of scope

- Validating tool output
- Changing the `Unknown tool` throw into a returned response (tracked separately)
- Coercing types, applying defaults, or injecting `additionalProperties: false`
- Per-tool authorization
- Retry, timeout or rate limiting around tool execution
- Any concrete tool implementation