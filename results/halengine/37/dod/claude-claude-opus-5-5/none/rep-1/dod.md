# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are the real entry points and already exist; the tests call them (and `createChatOrchestrator(...).processMessage` for the tool loop) with real executors and fail today because no validation happens.

## Done when these pass

- [ ] **returns a rejection naming the missing required location and never runs the executor** — `execute(name, {})` against a schema requiring `location` returns a `ToolResponse` naming `location` as required; executor call count 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed identifying field by path and expected type without echoing its value anywhere** — a number where a string is required: result names the path and `string`, and neither the result nor any log line contains the value
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for a schema that cannot compile, naming the tool** — static schemas compile at `register`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call, not a stale one**
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves after a rejected call and its corrected retry, with the rejection visible to the provider** — the orchestrator tool loop survives a rejection; the provider sees the rejection text next round
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`; validate in `execute` before the executor, returning `{result: <paths + failed constraint>}` on failure
- [ ] Rejection text and log lines carry property paths and constraint keywords only, never values
- [ ] Compile static schemas once at `register`, naming the tool in the thrown error
- [ ] Function-valued definitions resolve and compile per call, cached by the resolved schema object
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Remaining ticket criteria owed by the implementation rounds, each with its own round test: extra properties pass through unchanged exactly once (`toEqual`), static schema compiled once across ten calls, `Unknown tool: <name>` throw pinned
- [ ] Docs: `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`; `CHANGELOG.md` entry; MINOR bump and migration note in the PR body
- [ ] `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0

## Out of scope

- Changing the `Unknown tool: <name>` throw (tracked separately as returning an unknown tool name to the model)
- Validating tool output; hallucination detection; evaluation harness
- Per-tool authorization; retry, timeout and rate limiting around tool execution
- Any concrete tool implementation