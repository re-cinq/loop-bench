# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` is already the real entry point and is callable today; the missing piece is the validation step itself, so the tests fail on behaviour (the executor runs on input the schema rejects).

## Done when these pass

- [ ] **rejects input missing a required property and does not invoke the executor** — `{}` against a schema requiring `location` must return a rejection naming `location` as required, with the executor called zero times
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed property naming its path and expected type, never echoing the value** — `{location: 4242}` against a required string must return a rejection naming `location` and `string`, with the executor called zero times and `4242` absent from the result
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate `input` against the resolved definition's `inputSchema` in `ToolRegistry.execute` before the executor runs; return a `ToolResponse` on rejection (closes the two tests above)
- [ ] Compile static schemas once at `register` time; throw at registration naming the tool for an uncompilable schema
- [ ] Function-valued `ToolDefinitionSource`: validate against the schema resolved on each call, not a stale cached one
- [ ] Compile a static schema once across repeated `execute` calls
- [ ] Tool-loop test in `chatOrchestrator.test.ts`: rejected call, corrected retry, `processMessage` resolves with the rejection text visible to the provider
- [ ] Pin `execute` still throws `Unknown tool: <name>` for an unregistered name
- [ ] Valid input with an unlisted extra property reaches the executor unchanged (`toEqual`, exactly once). Green today, so it is not a red test here; the implementation round must keep it passing
- [ ] Rejection and log lines name property paths and constraints, never values (no log line or returned text contains a rejected identifying value)
- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] Spec statements for the contract in `specs/hal-engine-tool-input-validation/spec.md` (does not exist yet), then `([validated by ...])` links on the tests above
- [ ] `execute` one-line doc comment pointing at the spec
- [ ] Docs: `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `CHANGELOG.md`, PR migration note (MINOR bump)

## Out of scope

- Validating tool output
- Coercing types, applying defaults, or injecting `additionalProperties: false`; there is no opt-out flag
- Returning unknown tool names to the model instead of throwing (tracked separately)
- Per-tool authorization, retry, timeout, and rate limiting around tool execution
- Any concrete tool implementation

## Notes for the next round

- The red bar is shown by running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`. The CI job that runs these tests is the "Test" step of `.github/workflows/ci.yml` (`npm test`, via the `hal-engine-jest` entry in `.lore/test-commands.yml`).
- The spec `specs/hal-engine-tool-input-validation/spec.md` now holds the two statements these tests validate, each with a `([validated by ...])` link. The remaining statements from the ticket are still to be written as facets.