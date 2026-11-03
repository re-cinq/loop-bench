# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are already the real entry points, so the acceptance tests call them today and fail on behaviour: the executor runs on input the schema rejects. No seam is missing.

## Done when these pass

- [ ] **answers a call missing a required property with a rejection naming it, and never runs the executor** — a call `{}` to a tool requiring `location` returns a `ToolResponse` naming `location` as required, and the executor is called zero times
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **answers a wrong-typed property with its path and expected type, without echoing the offending value** — `{location: 4242}` returns a `ToolResponse` naming `location` and `string`, does not contain `4242`, and the executor is called zero times
      `src/orchestration/tools/registry.acceptance.test.ts`

Red bar: both fail when run with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`. Each fails with the executor's `forecast` returned where a rejection naming `location` is owed. CI runs them on every push as the **HAL Engine Jest suite** (`hal-engine-jest`, `.lore/test-commands.yml`), the `Test` step of `.github/workflows/ci.yml`.

## Facets

- [ ] Validate `input` against the resolved `inputSchema` in `execute` with `ajv` in `dependencies`; rejection returns a `ToolResponse`, executor not called
- [ ] Compile a static schema once at `register`; a non-compiling schema makes `register` throw naming the tool
- [ ] Function-valued definitions are resolved and compiled per call, cached by the resolved schema object
- [ ] Valid input with an extra property reaches the executor unchanged (`toEqual`), exactly once
- [ ] Log lines and rejection text name paths and constraints, never values
- [ ] Chat orchestrator tool-loop test: a rejected call followed by a corrected retry resolves `processMessage`
- [ ] `Unknown tool: <name>` throw stays, pinned by a test
- [ ] `execute` one-line doc comment pointing at the spec; `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` updated
- [ ] `CHANGELOG.md` entry; PR body migration note; MINOR bump

## Out of scope

- Output validation of tool results
- Coercion, defaults, or `additionalProperties: false` injection
- An opt-out flag for validation
- `Unknown tool` throw becoming a returned response (tracked separately)
- Per-tool authorization
- Retry, timeout, or rate limiting around tool execution
- Any concrete tool implementation