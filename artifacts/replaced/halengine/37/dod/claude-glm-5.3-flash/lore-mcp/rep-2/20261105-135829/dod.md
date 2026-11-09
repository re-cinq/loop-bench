# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register` / `execute` are public
and callable today, so the acceptance tests drive the real entry point and fail on absent
behaviour (the executor still runs on malformed input, nothing compiles a schema at
`register`). Eight of the ten tests are red now; two are regression pins the ticket explicitly
asks to stay as-is (`Unknown tool:` throw, unchanged pass-through of valid input) and are
green by design — do not "fix" them red. The tests live in `*.acceptance.test.ts` files of
their own; the ticket-mandated `src/orchestration/tools/registry.test.ts` and the tool-loop
test in `chatOrchestrator.test.ts` remain the implementation round's own files. The spec
`specs/hal-engine-tool-input-validation/spec.md` was written first and its `Status` row reads
`Shipped` because that row tracks test-citation coverage, not implementation (AGENTS.md § Spec
Header Table): every statement is cited, and the red CI `Verify` job — its **Test (with
coverage floor)** step, `npm run test:coverage` — is what shows the work still owed. The pod
ran the tests directly; CI re-runs all of it on every push.

## Done when these pass

- [ ] **rejects a missing required property before the executor runs and names it as required** — RED; `execute` validates input against the resolved `inputSchema`, returns a rejection `ToolResponse` naming the property as required, executor call count 0
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and expected type, never the value** — RED; the rejection names `/location`-style path plus `string`, and contains no `42`
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a value outside a declared enum, naming the property** — RED; `enum` is enforced, `units: 'kelvin'` is rejected before the executor
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **refuses an uncompilable schema at registration, naming the tool** — RED; `register` compiles the schema and throws a message naming the tool
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call** — RED; a source whose schema changed between calls is enforced per call, not against a stale one
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema once across ten execute calls** — RED; the schema object is read (compiled) once and the compiled schema reused
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps rejected input values out of the rejection and the log** — RED; no returned text and no log line carries a rejected payload's values
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the model as a tool result the next round can correct** — RED; the loop resolves (not rejects), the rejection reaches the provider as a tool result, the corrected retry executes once
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands valid input to the executor unchanged, extras included, exactly once** — PIN, green now and must stay green (`toEqual` on what the executor receives)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — PIN, green now and must stay green (the throw is deliberately unchanged)
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the validator (`ajv` unless the build proves otherwise) to `package.json`
      `dependencies` — not `peerDependencies`/`devDependencies` — and update the lockfile.
- [ ] Compile a static tool's schema once at `register` (throw naming the tool when it cannot
      compile); resolve and compile a function-valued `ToolDefinitionSource` per call, cached
      by the resolved schema object.
- [ ] Validate in `execute` before the executor: rejection is a returned `ToolResponse` whose
      `result` names property paths and the failed constraint and never a value; no value
      reaches the log either; enforce `required`, types, `enum` only (no
      `additionalProperties` injection, no coercion, no defaults, no opt-out); keep the
      `Unknown tool: <name>` throw; `execute` carries a one-line doc comment pointing at
      `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Write the ticket-mandated `src/orchestration/tools/registry.test.ts` (tool requiring a
      `location` string, `execute` with `{}`, result names `location`, call count 0) and the
      rejected-call-then-corrected-retry tool-loop test in `chatOrchestrator.test.ts`; cite
      the statements they validate in the spec so `re-lint/require-spec-link` stays green.
- [ ] Docs: `README.md` states what the registry now does (and the statement is true),
      `docs/adding-a-tool.md` drops the cast-defensively guidance, `.specify/spec.md` records
      rejection-as-tool-result, the tool-round bound and extra-property pass-through,
      `CHANGELOG.md` gains an npm-reader entry (`scripts/check-changelog.sh` gates it), and
      the version bump is MINOR. The PR body carries the migration note (an executor that
      used to hand-validate now sees only schema-accepted input; a tool relying on seeing
      malformed input stops seeing it).
- [ ] `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0.

## Out of scope

- Validating tool *output*; hallucination detection or an evaluation harness.
- Per-tool authorization; the `beforeToolCall` veto seam is not an authorization model.
- Retry, timeout and rate limiting around tool execution.
- Turning `Unknown tool: <name>` into a returned result (tracked as its own issue).
- Any concrete tool implementation, which is written against this contract later.