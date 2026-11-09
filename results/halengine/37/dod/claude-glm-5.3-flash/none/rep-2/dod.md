# Definition of Done

> "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without
> ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`)."

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute` and
`createChatOrchestrator().processMessage` are the real entry points the ticket names, callable as-is
from a test. Every new-behaviour test below is red today because the behaviour (validation,
register-time compilation, rejection-as-`ToolResponse`) is absent, and each failure names the ticket's
claim: the executor runs and answers a malformed call with a confidently formatted forecast instead of
a rejection.

## Done when these pass

- [ ] **rejects input missing a required property, names the requirement, and never calls the executor**
      — `execute` with `{}` against a `location`-string-required schema returns a `ToolResponse` naming
      `location` as required, executor call count `0` (currently: executor runs, returns the forecast)
- [ ] **passes input the schema accepts through to the executor unchanged, extra properties included,
      exactly once** — `toEqual` on what the executor received, so a default or coercion fails. Green
      today by construction: it pins the invariant validation must not break
- [ ] **rejects a wrong-typed field by path and expected type, and carries no field value in the message
      or the logs** — number where string is required; message names path + type, and neither message
      nor any log line contains the value `90210`
- [ ] **throws at register time for a schema the validator cannot compile, naming the tool** —
      `required: 'location'` (string, must be array) throws from `register` with the tool name in the
      message (currently: register accepts it silently)
- [ ] **validates a function-valued definition against the schema current at each call** — a
      definition source whose schema gains a required `bookingReference` between calls rejects the
      second call; executor called exactly once
- [ ] **compiles a static tool schema once, at register time** — a counting getter on the schema shows
      the schema consumed at `register` and never again across ten `execute` calls (currently: never
      consumed at all). No black-box way to count validator compiles exists, so the schema object
      itself carries the probe — the only non-source-text observable for this criterion
- [ ] **feeds a rejected tool call back to the provider as text the model can correct** — stub provider
      drives `processMessage` through a rejected call then a corrected retry: it resolves (not
      rejects), final text is the model's answer, executor ran twice, and the retry round's request
      carried the rejection text (currently: no rejection text exists anywhere)
- [ ] **still throws Unknown tool for an unregistered name** — pin of behaviour the ticket declares
      unchanged; green today and must stay green

`src/orchestration/tools/registry.acceptance.test.ts` — run with
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator (`ajv` unless the build proves otherwise) to `package.json`
      `dependencies`; the red bar is CI's to show for that half — the `verify` job's `npm test` /
      `npm run verify` (`.github/workflows/ci.yml`) runs this file on every push
- [ ] Compile a static tool's schema at `register`; validate inside `execute` before the executor;
      return the rejection as a `ToolResponse`, never throw, never log or return a property value
- [ ] Resolve function-valued definitions per call, cache the compiled validator by the resolved
      schema object
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Documentation statements in that spec's `Documentation` section (validator in `dependencies`;
      `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`; `CHANGELOG.md` entry) — ticked by
      editing the docs, then cite them or delete them so the spec can reach `Shipped`
- [ ] Flip the spec's `Status` row only as citations allow (`re-lint/require-status-matches-coverage`)
- [ ] PR body: migration note (executors stop seeing malformed input; tools that hand-validate stop
      seeing what they keyed on) and MINOR version bump

## Out of scope

- Returning an unknown tool name to the model instead of throwing (tracked issue; the throw is pinned,
  not changed)
- Validating tool output; hallucination detection or an evaluation harness
- Per-tool authorization (`ToolContext` boundary concern); `beforeToolCall` veto seam
- Retry, timeout and rate limiting around tool execution; any real tool implementation