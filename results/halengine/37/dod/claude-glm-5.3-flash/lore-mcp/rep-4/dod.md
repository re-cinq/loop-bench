# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute` and
`createChatOrchestrator(...).processMessage` are real entry points callable today, so the
acceptance tests call them directly and fail on the absent behaviour. No replacement module
is needed; the ticket changes the registry in place and leaves its public API untouched.

## Done when these pass

- [ ] **rejects a call missing a required property and never invokes the executor** — `execute` with `{}` against a schema requiring a `location` string returns a rejection naming `location` as required, executor call count 0
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed value naming the path and expected type but not the value** — a number where a string is required is rejected naming path and type, and the message never carries the offending value
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a value outside a declared enum without invoking the executor** — enum is enforced like `required` and types, naming the property, never the value
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **hands valid input to the executor unchanged, extra properties included, exactly once** — pin: no coercion, no defaults, no injected `additionalProperties`, one executor call (green today, must stay green)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time for an uncompilable schema, naming the tool** — static schemas compile at `register`, so a broken schema fails at startup
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema once at registration and reuses it across calls** — ten `execute` calls do not re-read the schema; the test observes reads through a getter on the schema object, so any compile-once mechanism passes and per-call recompilation fails
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema it returns for that call** — a source whose schema changes between calls is validated against the schema current at each call, not a stale cached one
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — pin of deliberately unchanged behaviour (green today, must stay green)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps input values out of the rejection text and the log stream** — a rejected payload carrying an identifying value produces no returned text and no log line containing it; property names are allowed, values are not
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a schema rejection back to the model and completes on the corrected retry** — a stub provider's rejected tool call followed by a corrected one: `processMessage` resolves (not rejects), the rejection text is visible to the provider on the next round, the executor ran only for the valid call
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Eight of the ten are red today (2026-11-06) for the ticket's reason: no validation exists, so
every malformed call reaches the executor. Two are pins of behaviour that already holds and
must survive the change.

## Facets

- [ ] Add a JSON Schema validator (`ajv` unless the build proves otherwise) to `dependencies` — not `peerDependencies` or `devDependencies` — and validate in `ToolRegistry.execute` before calling the executor, returning a rejection `ToolResponse`; `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0
- [ ] Compile a static schema once at `register` (throw, naming the tool, on an uncompilable schema); resolve a function-valued source per call, caching compiled validators by the resolved schema object
- [ ] Keep `Unknown tool: <name>` throwing unchanged
- [ ] `execute` carries a one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md` — `re-lint/max-comment-lines` rejects a `@param`/`@returns` block
- [ ] Rejection messages and log lines name property paths and the failed constraint, never values
- [ ] `README.md` states the registry validates input and drops the "not enforced before your executor runs" claim; `docs/adding-a-tool.md` drops the defensive-casting/missing-input guidance, states input has already passed the declared schema, that unknown keys may still be present, and that a rejection is returned to the model rather than thrown (keep its generated blocks and `example/weather-tool.ts` in sync — `npm run docs:check` and `npm run docs:check-paths` gate them); `.specify/spec.md` records that a rejection is a tool result, that the tool-round bound stops a retry cycle, and that extra properties pass through unmodified
- [ ] `CHANGELOG.md` gains a `## [Unreleased]` entry written for a package consumer; version bump is MINOR; the PR body carries the migration note (executors now receive only schema-accepting input; a tool that relied on seeing malformed input stops seeing it)

## Out of scope

- Returning an unknown tool name to the model instead of throwing (tracked separately; the throw stays)
- Validating tool output; hallucination detection and an evaluation harness
- Per-tool authorization — a schema-valid call for someone else's data is still valid (`beforeToolCall` is a veto seam, not an authorization model)
- Retry, timeout and rate limiting around tool execution; any actual tool implementation