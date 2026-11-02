# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are the real entry points and already exist, so the acceptance tests call them today and fail on the missing validation. No seam is missing.

## Done when these pass

- [ ] **returns a rejection naming the missing required property and never calls the executor** — a call with `{}` against a tool requiring `location` returns a `ToolResponse` naming `location` as required, and the executor is called zero times.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming its path and expected type, without echoing the value** — a number where a string is required is rejected with a result naming `location` and `string`, and the result does not contain the offending value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws, and the message names `broken-tool`, when the schema cannot be compiled.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the schema the function-valued source returns at that call** — a function-valued definition whose schema changes between calls is validated against the current schema, not a cached one.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`; compile static schemas once in `register` and reject with a `ToolResponse` from `execute` (makes the first three tests pass).
- [ ] Resolve and compile function-valued schemas per call, cached by the resolved schema object (makes the fourth test pass).
- [ ] Keep the `Unknown tool: <name>` throw unchanged (passes today; pin it when the implementation lands).
- [ ] Add the orchestrator tool-loop test in `chatOrchestrator.test.ts`: a rejected call followed by a corrected retry resolves `processMessage`.
- [ ] Add the guard that valid input with an unlisted extra property reaches the executor unchanged, exactly once (passes today, so it is a regression guard rather than a red bar).
- [ ] Add the log-redaction assertion: rejection messages and log lines name paths and constraints, never values.
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `CHANGELOG.md`, and the PR migration note (MINOR bump).

## Out of scope

- Validating tool output.
- Hallucination detection and evaluation harnesses.
- Per-tool authorization (a separate `ToolContext` boundary concern).
- Retry, timeout, and rate limiting around tool execution.
- Changing the `Unknown tool: <name>` throw (tracked separately as _Return an unknown tool name to the model instead of throwing_).
- Coercion, defaults, and `additionalProperties: false` injection.
- Any concrete tool implementation.