# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam exists and the behaviour does not. `ToolRegistry.execute` is a
real entry point callable today, so each acceptance test registers a tool and calls it, and every
one that pins the new contract fails now because the malformed call still reaches the executor.
One test (`passes schema-valid input through to the executor unchanged, exactly once`) is green
today by characterization: it guards the boundary of the change (no injected defaults, no
coercion, no `additionalProperties: false`) and must stay green through it. The spec
`specs/hal-engine-tool-input-validation/spec.md` is new with this commit, so its `#Lnn` anchors
were set by hand and `node scripts/repoint-spec-anchors.mjs` must be re-run after any edit to
either test file.

## Done when these pass

- [ ] **rejects a call missing a required property before the executor runs** — a tool requiring
  a `location` string, `execute` with `{}`: the returned `result` names `location` as required
  and the executor's call count is `0`. Red now: the executor ran and answered.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the failing path and constraint, never the value, in the result and the logs** — a
  number where a string is required: the `result` names the field path and the expected type,
  contains no offending value, and no log line does either. Red now: the executor ran with the
  value.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes schema-valid input through to the executor unchanged, exactly once** — valid input
  carrying an unlisted extra property reaches the executor `toEqual`-unchanged, one call. Green
  now by characterization; it is the guard that keeps the validator from adding, coercing or
  stripping.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration when a static schema cannot compile, naming the tool** — an
  uncompilable schema (`type: 'strng'`) throws at `register`, message naming the tool. Red now:
  `register` compiles nothing.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — a
  `ToolDefinitionSource` whose schema changes between calls validates each call against the
  schema current then, cached by the resolved schema object. Red now: both calls pass through.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a rejected tool call back to the model as a tool result and completes on the
  corrected retry** — a scripted provider round-trips a rejected call then a corrected one:
  `processMessage` resolves (not rejects), the rejection text reaches the provider as a
  `tool_result` for the rejected call id, and the executor saw only the corrected input. Red
  now: the executor saw `{}` too.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Implementation round: add the JSON Schema validator (`ajv` unless the build proves
  otherwise) to `dependencies` — not peer/dev; compile a static tool's schema once at `register`
  (throw naming the tool on an uncompilable schema); resolve and compile a function-valued
  `ToolDefinitionSource` per call, validator cache keyed by the resolved schema object; validate
  in `execute` before the executor; a rejection resolves to `{result: '<what was wrong>'}`;
  messages name property paths and constraints, never values, in both the result and the log
  lines; no opt-out flag.
- [ ] The registry-level tests the ticket assigns to a new
  `src/orchestration/tools/registry.test.ts` (which this pod leaves for that round, since the
  next round runs only its own files): the `location`/`{}` case, the `toEqual` extra-property
  pass-through called exactly once, the wrong-typed rejection naming path and expected type
  without the value, `register` throwing and naming the tool, the function-valued per-call case,
  a static tool's schema compiled once across ten `execute` calls, and the unchanged
  `Unknown tool: <name>` throw pinned.
- [ ] The tool-loop test in `chatOrchestrator.test.ts` (rejected call, corrected retry,
  `processMessage` resolves with the rejection text visible to the provider next round) — the
  orchestrator itself needs no production change: it already feeds `ToolResponse.result` back as
  a `tool_result`, which is exactly why the rejection must be a return and not a throw.
- [ ] One-line doc comment on `execute` pointing at
  `specs/hal-engine-tool-input-validation/spec.md` (`re-lint/max-comment-lines` rejects a
  `@param`/`@returns`/`@throws` block).
- [ ] Cite the two statements the spec leaves uncited once the tests that pin them exist:
  validation enforces `required`/types/`enum` only, no opt-out; and the unchanged
  `Unknown tool: <name>` throw.
- [ ] `npm run build` and
  `node --input-type=module -e "import('./dist/index.js')"` exit `0` with the validator in
  `dependencies`.
- [ ] Docs owed by the ticket: `README.md` states what the registry now does (and the claim is
  true); `docs/adding-a-tool.md` stops telling executors to cast defensively and handle missing
  input and instead states that input reaching an executor has passed the declared schema,
  unknown keys may still be present, and a rejection is returned to the model rather than thrown;
  `.specify/spec.md` (line 29 says the schema "is NOT enforced before the executor runs" —
  no longer true) records that a rejection is a tool result, that the tool-round bound stops a
  retry cycle from spinning, and that extra properties pass through unmodified;
  `CHANGELOG.md` entry under `## [Unreleased]` written for a package consumer (CI's
  `scripts/check-changelog.sh` fails any PR touching non-test files under `src/` without one);
  MINOR version bump; PR body carries the migration note (executors that hand-validated their
  input now receive only input the schema accepts, and tools that relied on seeing malformed
  input to produce their own error stop seeing it).

## Seam gap worth flagging

"A static tool's schema is compiled once across ten `execute` calls" has no observable seam:
compile count is internal to the registry, and the honest ways to see it are instrumenting the
validator module (a module double, out of bounds for an acceptance test) or adding public
surface to expose the cache (a production decision owed by the implementation round). This pod
pins the contract around it instead — per-call schema resolution for function sources and
registration-time compilation for static tools — and leaves the compile-count assertion to the
implementation round's `registry.test.ts`, where the ticket places it.

## Out of scope

- Returning an unknown tool name to the model instead of throwing (`Unknown tool: <name>` stays).
- Validating tool output; hallucination detection and an evaluation harness.
- Per-tool authorization — a schema-valid call for someone else's data is still valid.
- Retry, timeout and rate limiting around tool execution.
- Any actual tool implementation; `example/weather-tool.ts` may keep its defensive cast until
  the docs facet lands, where the ticket says the comment warning readers about enforcement goes.