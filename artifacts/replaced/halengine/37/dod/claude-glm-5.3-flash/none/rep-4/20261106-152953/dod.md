# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists and is the one the ticket names:
`ToolRegistry.register` / `ToolRegistry.execute` are the real entry points, and the
orchestrator's tool loop is reachable through `createChatOrchestrator(...).processMessage`
with a scripted provider. Every behavioural criterion is testable today against those entry
points and fails because the behaviour is absent — no production code is owed to make the
tests runnable.

## Done when these pass

- [ ] **rejects a call the schema rejects before the executor runs, naming the missing property**
      — `execute` validates against the resolved `inputSchema` first; a `{}` call against a tool
      requiring `location` returns a `ToolResponse` naming `location` as required with the
      executor invoked 0 times. Red today: the executor runs and answers the malformed call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes a valid call with an unlisted extra property to the executor unmodified, exactly
      once** — no injected default, no coercion (`toEqual` on what the executor received). Passes
      today; it pins the boundary the implementation must not cross while adding validation.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed value naming the path and expected type, without repeating the
      value** — a number where a string is required names `location` and `string`, and the
      rejection never carries the value. Red today: no rejection exists.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — a broken
      schema fails at startup, not mid-conversation. Red today: `register` accepts anything.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-defined tool against the schema its source returns for that call**
      — per-call resolution, not a stale cached schema. Red today: no validation at all.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **holds a static tool to the schema compiled at register across ten execute calls** — the
      schema object is read once at registration (probed by editing it between calls), not
      recompiled per call. Red today: the executor answers every malformed call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — the throw stays, pinned.
      Passes today.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps an identifying value out of the rejection text and the log lines** — a rejected
      payload carrying identifying values leaks neither into the returned `result` nor into any
      log line (observed through `setLogger`, the engine's own logger seam). Red today: no
      rejection exists to redact.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a schema rejection to the model as a tool result and lets a corrected retry
      finish the turn** — through the real tool loop: `processMessage` resolves, the rejection
      text reaches the provider as a `tool_result` on the next round, and the executor sees only
      the corrected input. Red today: the malformed call executes, so no rejection is fed back.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

Current state: 7 of 9 red for the absent behaviour, the two pins green. Run them with
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`.

## Facets

- [x] Spec `specs/hal-engine-tool-input-validation/spec.md` written with the statements above,
      each carrying its `([validated by ...])` link; all three spec gates pass
      (`check-spec-anchor-names`, `check-spec-links`, `check-spec-status --coverage` — full
      coverage, hence `Shipped`). Statements exist before the tests are made to pass.
- [x] Acceptance tests committed red in two new files beside their subjects
      (`registry.acceptance.test.ts`, `chatOrchestrator.acceptance.test.ts`).
- [ ] `ajv` into `dependencies` (not peer/dev); `ToolRegistry.execute` validates before the
      executor, returning the rejection `ToolResponse`; static schemas compiled at `register`,
      function-valued sources resolved per call and cached by the resolved schema object; the
      rejection log names paths and constraints only.
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
      (`re-lint/max-comment-lines` forbids a JSDoc block there).
- [ ] Docs owed by the ticket: `docs/adding-a-tool.md` (input reaching an executor has already
      passed the schema; unknown keys may be present; a rejection is returned, not thrown),
      `README.md`, `.specify/spec.md`, a CHANGELOG entry for the npm reader, MINOR version bump,
      and the migration note in the PR body.

## Out of scope

- The `Unknown tool: <name>` throw changing shape — pinned as unchanged here; its own issue
  owns returning it to the model instead.
- Validating tool output, hallucination detection, an evaluation harness, per-tool
  authorization (`ToolContext` veto is a separate seam), retry/timeout/rate limiting around
  tool execution, and any real tool implementation.
- Non-behavioural criteria the pod cannot run (workspace build, typecheck, eslint) — CI's
  build, Test and lint jobs on this branch judge those; the doc edits in Facets close them.