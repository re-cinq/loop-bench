# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are public and already take the tool definition and input, so the acceptance tests call the real entry point. No seam is missing.

## Done when these pass

- [ ] **returns a rejection naming a missing required property and never runs the executor** — a call omitting `location` gets a result naming `location` as required, and the executor is not invoked
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejection naming the field path and expected type, without echoing the offending value** — a number where a string is required is rejected naming `location` and `string`, the value `90210` never appears, and the executor is not invoked
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for a schema that will not compile, naming the tool** — `register` throws with the tool name for an uncompilable `inputSchema`
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate `input` in `execute` before the executor runs; return a rejection `ToolResponse` (first two tests)
- [ ] Compile a static schema at `register`; fail with the tool name (third test)
- [ ] Compile a function-valued source per call, cached by the resolved schema object; validate against the schema current at that call
- [ ] Compile a static schema once across ten `execute` calls
- [ ] Add `ajv` to `dependencies` in `package.json`; `npm run build` and the `dist/index.js` import exit 0
- [ ] Tool-loop test in `chatOrchestrator.test.ts`: a rejected call then a corrected retry resolves `processMessage`, with the rejection visible to the provider on the next round
- [ ] Rejection messages and log lines name paths and constraints, never values
- [ ] Extra properties pass through to the executor unchanged, exactly once (true today; keep it true)
- [ ] `Unknown tool: <name>` still throws, pinned by a test
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`
- [ ] `CHANGELOG.md` entry; PR body migration note; MINOR version bump

## Out of scope

- Validating tool output
- Coercion, defaults, or injected `additionalProperties: false`, and any opt-out flag
- Changing the `Unknown tool` throw (tracked as "Return an unknown tool name to the model instead of throwing")
- Per-tool authorization, retry, timeout and rate limiting around tool execution
- Any concrete tool implementation

## Red bar

Run in this pod: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts` — 3 of 3 fail (executor runs and returns its forecast; `register` does not throw).