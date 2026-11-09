# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the
> executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute` and
`createChatOrchestrator().processMessage` are real entry points callable today, so the
acceptance suite exercises them directly and fails on the absent behaviour (the executor runs
on malformed input, no rejection text exists to name a path or type, a broken schema registers
without complaint). Run the suite with
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/toolInputValidation.acceptance.test.ts`.
Five of its seven tests are red today for the ticket's reason; the two named pins below are
green today by design and must stay green through the change. The spec
`specs/hal-engine-tool-input-validation/spec.md` is new on this branch, so
`scripts/repoint-spec-anchors.mjs` has no baseline to repair its `#Lnn` anchors from — after
touching the test file, re-check those anchors by hand against the `it(` lines.

## Done when these pass

- [ ] **rejects a call missing a required property before the executor runs** — `execute` with
      `{}` returns a `ToolResponse` naming `location` as required, executor call count `0` (red today)
  `src/orchestration/tools/toolInputValidation.acceptance.test.ts`
- [ ] **passes valid input through to the executor unchanged, extra properties included** — valid
      input with an unlisted property reaches the executor verbatim (`toEqual`), exactly once (pin: no
      injected defaults, no coercion, no `additionalProperties` rejection)
  `src/orchestration/tools/toolInputValidation.acceptance.test.ts`
- [ ] **rejects a wrong-typed value, naming the path and the expected type but not the value** —
      number-for-string is rejected, the message names path and expected type, and the offending value
      appears in no returned text and no log line (captured through the real `setLogger` seam) (red today)
  `src/orchestration/tools/toolInputValidation.acceptance.test.ts`
- [ ] **refuses at register time a tool whose schema cannot compile, naming the tool** — `register`
      throws and the thrown message names the tool (red today)
  `src/orchestration/tools/toolInputValidation.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call** — a source
      returning a different schema per call is validated against the current one, not a stale cached one (red today)
  `src/orchestration/tools/toolInputValidation.acceptance.test.ts`
- [ ] **still throws for a tool name that was never registered** — `Unknown tool: <name>` unchanged
      (the ticket pins this deliberately; deliberately out of scope to change)
  `src/orchestration/tools/toolInputValidation.acceptance.test.ts`
- [ ] **feeds a rejected call back to the provider and completes on the corrected retry** — a scripted
      provider's malformed call is rejected, the rejection text is legible on the next round, the
      corrected call reaches the executor, and `processMessage` resolves rather than rejects (red today)
  `src/orchestration/tools/toolInputValidation.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator to `dependencies` (not `peerDependencies`/`devDependencies`) in
      `package.json`; `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0.
- [ ] Validate in `ToolRegistry.execute` before the executor; compile static schemas at `register`;
      resolve-and-cache function-valued sources per call by the resolved schema object; no opt-out flag.
- [ ] A rejection returns a `ToolResponse` (`{result: '<what was wrong>'}`) naming property paths and
      constraints, never values; rejection messages and log lines stay value-free.
- [ ] Write `src/orchestration/tools/registry.test.ts` (the ticket assigns it) pinning enum rejection
      and compile-once across ten `execute` calls, and cite the two statements left uncited in
      `specs/hal-engine-tool-input-validation/spec.md` ("Validation enforces `required`, declared types
      and `enum` only..." and "A static tool's compiled schema is reused..."); keep the spec's `Status`
      row consistent with coverage (`re-lint/require-status-matches-coverage`).
- [ ] Add the ticket's tool-loop test to `chatOrchestrator.test.ts` (the acceptance suite already proves
      the behaviour at the same entry point from its own file).
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
      (`re-lint/max-comment-lines` rejects a longer block).
- [ ] Update `README.md`, `docs/adding-a-tool.md` (drop the defensive-casting guidance; state that input
      reaching an executor has passed the schema, unknown keys may remain, rejections are returned not
      thrown) and `.specify/spec.md` (rejection is a tool result, round bound stops retry cycles, extra
      properties pass through unmodified).
- [ ] `CHANGELOG.md` entry for the change (`scripts/check-changelog.sh` fails any PR touching non-test
      `src/` files without one).
- [ ] PR body states the migration note (executors no longer see malformed input); version bump is MINOR.

## Out of scope

- Returning an unknown tool name to the model instead of throwing (separate tracked issue; the throw
  stays as-is and is pinned).
- Validating tool *output*; hallucination detection and an evaluation harness.
- Per-tool authorization — a schema-valid call for someone else's data is still valid (`beforeToolCall`
  is a separate veto-seam issue); retry, timeout and rate limiting around tool execution.
- Any actual tool implementation — written against this contract later.