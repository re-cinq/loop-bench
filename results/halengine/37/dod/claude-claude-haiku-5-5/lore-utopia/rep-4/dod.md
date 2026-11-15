# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are already the public entry points, and the tests call them with real values. No seam is missing; the behaviour is absent, so each test fails on its assertion.

The red bar is observed locally with the Jest runner on `src/orchestration/tools/registry.acceptance.test.ts`. CI's job is "Test (with coverage floor)" in the "Verify" job of `.github/workflows/ci.yml`, which runs `npm run test:coverage`.

## Done when these pass

- [ ] **refuses a call missing a required property without running the executor** — `execute` returns a result naming `location` as required, and the executor is called zero times.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **refuses a wrong-typed property, naming its path and expected type but not its value** — a number sent for a string is rejected, the result names `location` and `string`, and the value `4242` never appears in it.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for a schema that cannot be compiled, naming the tool** — `register` throws with `broken_tool` in the message.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema resolved for that call** — the schema is re-resolved per call, so a relaxed schema on the second call is not checked against a stale strict one.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate in `ToolRegistry.execute` before the executor runs, returning a `ToolResponse` on rejection (closes the first two tests).
- [ ] Compile static schemas once in `register`, throwing an error that names the tool on failure (closes the third test).
- [ ] Resolve and compile function-valued schemas per call, cached by the resolved schema object (closes the fourth test).
- [ ] Pass-through: valid input with an extra property reaches the executor unchanged, exactly once. This passes on today's code, so it is not a red test here; the implementing round writes it alongside the validator.
- [ ] Compile-once across ten `execute` calls. Observing this needs a spy on the validator, so the implementing round decides on a seam first.
- [ ] Redact rejection text and log lines to property paths and constraints (no values).
- [ ] Chat-loop test in `chatOrchestrator.test.ts`: a rejected call followed by a corrected retry resolves `processMessage`.
- [ ] Add `ajv` to `dependencies`; the build and the `dist/index.js` import must succeed.
- [ ] Docs: `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`; CHANGELOG entry; MINOR bump in the PR body with the migration note.
- [ ] Un-cited statements in `specs/hal-engine-tool-input-validation/spec.md` (pass-through, compile-once, unknown tool, redaction, bounds) each get a test or an explicit decision.

## Out of scope

- Validating tool output.
- Coercing types, applying defaults, or adding `additionalProperties: false`; there is no opt-out flag.
- Changing the `Unknown tool: <name>` throw (tracked separately as "Return an unknown tool name to the model instead of throwing").
- Per-tool authorization.
- Retry, timeout, and rate limiting around tool execution.
- Any concrete tool implementation.