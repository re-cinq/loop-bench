# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the
> executor without ever checking the declared `inputSchema`
> (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema
> (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing
> validates what comes back from the model.

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute`
is the real entry point and the orchestrator loop test drives the real caller path
(`createChatOrchestrator` → `execute`), so every test fails on behaviour today. The
registry has no test file, so the acceptance suite is a new file beside `registry.ts`.

## Done when these pass

Run with: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`
(lore selector form: `node scripts/lore-run-test.mjs "<src/orchestration/tools/registry.acceptance.test.ts>::<full test name>"`).

- [ ] **returns a rejection to the model and never runs the executor when a required
      property is missing, while an unknown tool name still throws** — `execute('weather', {})`
      returns a `ToolResponse` whose `result` names `location` as required, the executor's call
      count is 0, and an unregistered name still throws `Unknown tool: <name>`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and expected type, and emits the
      offending value neither in the result nor the log** — a number where a string is
      required is rejected with the path and expected type; the value `48812` appears in no
      returned text and no log line
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration for a schema no validator can compile, naming the tool** —
      `register` with `type: 'strng'` throws immediately and the message names the tool
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call,
      enum included** — after the source returns a schema adding an `enum`, a value outside it
      is rejected even though it satisfied the previous schema; the executor is not called again
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a rejected call back to the model so a corrected retry succeeds, passing
      accepted input through unchanged** — a stub provider calls the tool with `{}`, is handed
      the rejection text as the tool result on the next round, retries with `{location: 'Paris',
  units: 'metric'}`, and `processMessage` resolves; the executor saw only the corrected
      input, deep-equal unchanged (the `toEqual` pass-through pin and the exactly-once count
      live here)
      `src/orchestration/tools/registry.acceptance.test.ts`

The pass-through `toEqual` pin and the `Unknown tool:` pin hold on today's code, so they
ride inside the tests above rather than standing alone as green-at-birth tests. Everything
else is red now. Statements these five do not cite (compile-once per static schema) stay
uncited in the spec for the implementing round's `registry.test.ts` to pick up — that is why
the spec reads `In Progress`.

## Facets

- [x] Spec statements written and cited (`specs/hal-engine-tool-input-validation/spec.md`)
- [x] Acceptance tests committed red (`src/orchestration/tools/registry.acceptance.test.ts`)
- [ ] Add the JSON Schema validator (`ajv` unless the build proves otherwise) to
      `package.json` `dependencies` — not `peerDependencies`, not `devDependencies`
- [ ] `registry.ts`: compile a static schema once at `register` (throw naming the tool);
      resolve a function-valued source per call, caching the compiled validator by the
      resolved schema object
- [ ] `registry.ts`: validate in `execute` before the executor runs; return a rejection
      `ToolResponse` naming the property path and the constraint that failed and never a
      property value, in the result and in the log; keep the `Unknown tool: <name>` throw;
      carry the one-line doc comment pointing at the spec
- [ ] `src/orchestration/tools/registry.test.ts`: the implementer's own unit tests,
      including the compile-once pin whose spec statement is still uncited
- [ ] Tool-loop test in `src/orchestration/chatOrchestrator.test.ts`; docs
      (`docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`); `CHANGELOG.md` entry;
      MINOR bump; PR body migration note
- [ ] CI green: `npm run build`, `npm run typecheck`, `npm test`, `npm run eslint`
      (`--max-warnings 0`), `npm run prettier:check`

## Out of scope

- Validating tool _output_; hallucination detection; an evaluation harness
- Returning an unknown tool name to the model instead of throwing (separate ticket; the
  throw stays as-is here)
- Per-tool authorization — a schema-valid call for someone else's data is still valid;
  `beforeToolCall` is a veto seam, not an authorization model
- Retry, timeout and rate limiting around tool execution
- Any actual tool implementation, which is written against this contract later