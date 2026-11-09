# Definition of Done

> "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`)."

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute` are public
methods the acceptance tests call directly, and a JSON Schema validator (`ajv`) is resolvable from
`node_modules` today. Every test hits the real entry point and fails on the missing behaviour, not
on a missing fixture — the registry simply never rejects anything yet, so eight tests see the
executor run when it must not. Two tests pin behaviour the change must not break (undeclared keys
passing through; `Unknown tool` still throwing); the ticket itself asks for those as pins, and they
are green today by design. The spec statements they validate live in
`specs/hal-engine-tool-input-validation/spec.md`, written for this issue.

## Done when these pass

- [ ] **rejects a call missing a required property and leaves the executor uninvoked** — execute
      validates `input` against the schema before the executor runs; the rejection is a returned
      `ToolResponse` naming `location` as required, executor call count 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes an unlisted extra property through to the executor unchanged and exactly once** —
      `toEqual` pin so an injected default or coerced value fails; green today, must stay green
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and expected type, carrying no value** — number
      where string is required; message names `location` and `string`, never `4242`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a value violating a declared enum and names the property** — `units: 'kelvin'`
      against a `celsius`/`fahrenheit` enum is rejected, naming `units`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects input without naming the offending value in the result or any log line** — a
      rejected payload with an identifying field leaks it neither into the returned text nor into any
      log line (captured through the real `setLogger` seam)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema once across ten execute calls** — compile happens at `register`
      (count 1 there) and still 1 after ten executes; instruments `Ajv.prototype.compile`, so the
      registry must route schema compilation through ajv's compile path
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register naming the tool when the schema cannot compile** — an uncompilable
      schema fails at startup with `broken_tool` named
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — flipping
      the schema a `ToolDefinitionSource` returns between calls changes what the next call is validated
      against; no stale cached schema
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws an Unknown tool error for an unregistered name** — the unchanged throw, pinned;
      green today, must stay green
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the provider and resolves on the corrected retry** —
      a scripted provider round trips a rejected call then a corrected one; `processMessage` resolves,
      the executor ran once, and the rejection text is what the provider saw on the second round
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` (not `peerDependencies`/`devDependencies`); import it in the
      registry, not a hand-written second schema
- [ ] Compile a static tool's schema at `register`; an uncompilable schema throws there, message
      naming the tool
- [ ] Validate per call; a function-valued source resolves per call with compilation cached by the
      resolved schema object
- [ ] On failure return `{result: '<what was wrong>'}` — never throw; never invoke the executor;
      message names property paths and the failed constraint and carries no property values; log lines
      likewise value-free
- [ ] One-line doc comment on `execute` pointing at
      `specs/hal-engine-tool-input-validation/spec.md` (the full contract lives there)
- [ ] The ticket's own unit tests: `src/orchestration/tools/registry.test.ts` and a tool-loop test
      in `src/orchestration/chatOrchestrator.test.ts`
- [ ] `docs/adding-a-tool.md` stops telling executors to cast defensively; `README.md` states the
      registry validates (and the claim is true); `.specify/spec.md` records rejection-as-tool-result,
      the round bound, and pass-through of extra properties
- [ ] `CHANGELOG.md` entry written for an npm reader; version bump MINOR; PR body carries the
      migration note (executors now see only schema-accepting input)

## Out of scope

- Changing the `Unknown tool: <name>` throw (its own issue: _Return an unknown tool name to the
  model instead of throwing_)
- Validating tool output; hallucination detection; an evaluation harness
- Per-tool authorization (a `ToolContext` boundary concern no issue in this epic owns)
- Retry, timeout and rate limiting around tool execution
- Any actual tool implementation, which is written against this contract later