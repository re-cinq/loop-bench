# Definition of Done

> "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model."

**Strategy: `direct`** — the seam already exists: `ToolRegistry.execute` is the real entry point the ticket names, and every acceptance test drives it (or `chatOrchestrator.processMessage` for the tool-loop test) against a real registered tool. Each test is red today because no validation happens, not because an import or fixture is missing. No test imports `ajv`, so the red bar is observable before the implementing round adds the dependency.

## Done when these pass

- [ ] **rejects a call missing a required property before the executor runs** — `execute('weather', {})` returns a rejection `ToolResponse` naming `location` as required, and the executor was never invoked (ticket criteria 1–2)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes a valid input with an unlisted property through to the executor unchanged** — pin; green at commit by design (nothing rewrites input today either) and must stay green so validation never strips, coerces or injects (`toEqual`, exactly once)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed property naming the path and the expected type** — the message names the field path and the expected type and never the offending value
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **surfaces no property value from a rejected payload in the result or the logs** — a rejected payload carrying an identifying field leaks into neither the returned text nor any log line (console spy, the house pattern from `logger.test.ts`)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema naming the tool** — `register` throws for a schema with `{type: 'strng'}` and the message names the tool
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema once at register time and reuses it across execute calls** — a counting Proxy around the real schema records zero reads during ten `execute` calls (compilation happened at `register`) while all ten calls are rejected by validation
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — flipping the source's returned schema between calls re-points validation; the input typed for the old schema is rejected naming the new required property
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — pin of behaviour the ticket says must stay unchanged; green at commit by design
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a rejected tool call back to the provider and completes on the corrected retry** — a scripted stub provider's malformed tool call is rejected, the rejection text reaches the provider as the next round's tool result, the corrected retry runs, and `processMessage` resolves
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Red bar: seven of the nine are red at commit, each failing for the ticket's stated reason — the executor runs on malformed input, no rejection is returned, `register` accepts a broken schema. The two pins are green at commit because the behaviour they pin already exists; the ticket demands them explicitly so they survive the rewrite. Run only these two files: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`.

## Facets

- [ ] Add `ajv` to `dependencies` (not dev/peer); the build step `npm run build && node --input-type=module -e "import('./dist/index.js')"` must exit 0
- [ ] Compile a static tool's schema in `register`, throwing a message that names the tool for an uncompilable schema
- [ ] Validate in `execute` before the executor and return a rejection `ToolResponse` naming property paths and the failed constraint, never a value, in both the returned text and any log line
- [ ] Cache compiled validators by the resolved schema object; resolve function-valued `ToolDefinitionSource`s per call
- [ ] Carry a one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md` (`re-lint/max-comment-lines` rejects a longer block)
- [ ] Update `README.md`, `docs/adding-a-tool.md` (drop the cast-defensively guidance; state passthrough and rejection-as-result) and `.specify/spec.md`
- [ ] Add the `CHANGELOG.md` entry — CI runs `scripts/check-changelog.sh` against any PR touching a non-test `src/` file
- [ ] State the migration note in the PR body and bump the version MINOR
- [ ] The spec's two uncited statements (`enum` enforcement; no opt-out) either gain tests or keep the spec honestly at `In Progress`; citing everything flips it to `Shipped`
- [ ] The implementing round writes its own `src/orchestration/tools/registry.test.ts` (the ticket names it); these acceptance files are refused to this pod's hook and to later rounds' hooks, so they are never run from the implementing round

## Out of scope

- Changing the `Unknown tool: <name>` throw — tracked as "Return an unknown tool name to the model instead of throwing"
- Validating tool output; hallucination detection; an evaluation harness
- Per-tool authorization — a schema-valid call for someone else's data is still valid; that is a `ToolContext` boundary concern no issue in this epic owns
- Retry, timeout and rate limiting around tool execution
- Any concrete tool implementation