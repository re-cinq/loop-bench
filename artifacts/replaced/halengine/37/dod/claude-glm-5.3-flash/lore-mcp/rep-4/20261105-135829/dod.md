# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists: `ToolRegistry.execute` and
`createChatOrchestrator(...).processMessage` are public entry points callable from a test today, so
each test drives the real path and fails on the absent behaviour (nothing validates tool input).
Tests live in `src/orchestration/tools/registry.acceptance.test.ts` — a new file, since the
registry has no test file today and the implementing round writes its own `registry.test.ts`
beside it. The statements the tests validate are in
`specs/hal-engine-tool-input-validation/spec.md`, created in the same commit.

Two of the eight tests pass today by design and are pins, not red bars: the extra-property
passthrough test (the registry already forwards input untouched — the test holds that line while
validation lands, so an injected default or coercion turns it red) and the `Unknown tool` throw
test (ticket criterion: pinned unchanged). The other six are red and go green with the
implementation.

Notes for the round that implements this:

- No test doubles: compilation count is pinned behaviourally — the "schema compiled once across ten
  execute calls" criterion is pinned as "the register-time schema governs validation" (the schema
  object is loosened after `register`; a per-call compile fails the test) rather than by spying on
  `Ajv.prototype.compile`.
- Log capture uses the public `setLogger` seam, not `jest.spyOn`; the test file imports no `ajv`,
  so its failures are about behaviour, never a missing module. Add `ajv` to `dependencies` when
  implementing.
- `specs/hal-engine-tool-input-validation/spec.md` reads `Status: Shipped` with red tests. That row
  is the citation-coverage tier the `re-lint/require-status-matches-coverage` gate derives (all
  testable statements carry `([validated by ...])` links), not a maturity claim — AGENTS.md § Spec
  Header Table. Do not downgrade it to Draft/In Progress; that fails CI. The spec is new on this
  branch, so `scripts/repoint-spec-anchors.mjs` has no baseline for it — if you add tests to
  `registry.acceptance.test.ts` or shift lines above an anchor, repoint the anchors by hand and
  check with `npm run spec:names`.
- eslint/typecheck/build are not runnable in the pod that wrote these tests (the pod OOMs on them);
  CI's `verify` job is the judge. The acceptance tests themselves were run: 6 red, 2 green (the
  pins).

## Done when these pass

- [ ] **returns a rejection naming what the schema rejected and skips the executor** — execute with
      `{}` against a `location`-required schema (plus an `enum` case) returns a `ToolResponse`
      naming the rejected property, executor count 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes accepted input to the executor unchanged, extra properties included** — pin (green
      today): `toEqual` on the executor's received input, called exactly once
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and expected type, redacting the value** —
      number-for-string rejected, message names path and type, neither the value nor any log line
      carries it `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register when the input schema cannot compile, naming the tool** — an
      uncompilable schema throws at `register`, message names the tool
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — swap the
      schema between two calls; each is validated against the schema current then, not a stale
      cached one `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps validating a static tool against the schema it was registered with** — the
      register-time schema governs (behavioural pin of "compiled once", see note above)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for a name that was never registered** — pin (green today),
      ticket criterion: the throw stays `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the provider so the next round can correct it** — stub
      provider drives a rejected call then a corrected retry; `processMessage` resolves, rejection
      text delivered as the next round's tool result, executor untouched
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` (or equivalent, if the build proves otherwise) to `package.json` `dependencies`
- [ ] Compile a static tool's schema at `register`; throw naming the tool when it cannot compile
- [ ] Resolve and compile a function-valued `ToolDefinitionSource` per call, cached by the resolved
      schema object
- [ ] Validate `input` in `execute` before the executor; on failure return
      `{result: <rejection>}` naming paths/constraints, never values; keep logs value-free
- [ ] Leave accepted input byte-for-byte untouched into the executor (no defaults, no coercion, no
      `additionalProperties` injection, no opt-out flag)
- [ ] `execute` carries a ONE-line doc comment pointing at
      `specs/hal-engine-tool-input-validation/spec.md` (`re-lint/max-comment-lines` forbids a
      `@param`/`@returns`/`@throws` block)
- [ ] Any test the round adds to `registry.test.ts` / `chatOrchestrator.test.ts` cites a statement
      in the spec (append its link beside the existing ones; `re-lint/require-spec-link` fails an
      uncited test)
- [ ] `README.md` states the registry validates input (truthfully), `docs/adding-a-tool.md` drops
      the cast-defensively guidance, `.specify/spec.md` records rejection-as-tool-result, the
      round bound, and extra-property passthrough
- [ ] `CHANGELOG.md` entry under `## [Unreleased]`, written for a package consumer; MINOR version
      bump in the PR, migration note in the PR body
- [ ] `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0, and the
      full verify set is green (`npm run verify`)

## Out of scope

- The `Unknown tool: <name>` throw staying as-is (tracked separately)
- Validating tool output; hallucination detection; an evaluation harness
- Per-tool authorization (`beforeToolCall` veto is a separate epic concern)
- Retry, timeout and rate limiting around tool execution
- Any concrete tool implementation — written against this contract later