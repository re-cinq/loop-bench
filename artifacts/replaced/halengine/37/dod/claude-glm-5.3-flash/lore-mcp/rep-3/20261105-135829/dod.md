# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
>
> A tool that receives unexpected input must fail in one predictable, known way before the rest
> of this epic's tool work can be built on top of it.

**Strategy: `direct`** — the seam already exists. `ToolRegistry.register`/`execute` and
`createChatOrchestrator(...).processMessage` are the real entry points and are called directly
with real registries; the only fixture is a scripted AI provider, the same pattern
`src/orchestration/chatOrchestrator.test.ts` already uses. No new module or boundary is needed.

## Done when these pass

All in `src/orchestration/tools/registry.acceptance.test.ts`. Six are red today because the
behaviour is absent; two are green today **by design** — the ticket names them as pins that
constrain the fix (pass-through must survive the change, the unknown-tool throw must stay a
throw), and there is no honest way to make existing behaviour fail.

- [ ] **rejects a call missing a required property, naming it, without invoking the executor** —
      red today (`executorCalls: 1`, result carries no mention of `location`/`required`).
      Covers acceptance criteria 1 and 2.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes accepted input through to the executor unchanged, exactly once** — green pin
      (`toEqual` on what the executor received, so a default or coercion added by the fix fails
      it). Covers acceptance criterion 3.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and expected type, never the value** — red
      today. Covers acceptance criterion 4.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a value outside an enum without leaking identifying input into result or logs** —
      red today (executor invoked, rejection text absent); also enforces the `enum` half of
      "required, types and enum" and the no-value-in-logs redaction rule via `setLogger`.
      Covers acceptance criteria "enforces enum" and 10.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **refuses an uncompilable schema at registration, naming the tool** — red today
      (`register` never throws). Covers acceptance criterion 5.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — red
      today (stale pass-through). Covers acceptance criterion 6.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — green pin, deliberately out of
      scope for change. Covers acceptance criterion 9.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the provider so the next round can correct it** — red
      today (executor called twice, no rejection text in the messages the provider sees on
      round 2). Covers acceptance criterion 8. The ticket places this test in
      `chatOrchestrator.test.ts`; it lives here instead so the acceptance suite stays one file
      the Bash hook can name.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Red: the six tests above fail for the reason stated under each.
- [ ] Green: add `ajv` to `dependencies` (not peer/dev); compile a static tool's schema at
      `register` (broken schema throws there, message naming the tool); resolve and compile a
      function-valued source per call, cached by the resolved schema object; validate in
      `execute` before the executor; return a `ToolResponse` whose `result` names failing paths
      and constraints, never values, in both result and log lines.
- [ ] Refactor: the two green pins stay green unedited; existing registry consumers
      (`chatOrchestrator.ts`) need no change — the rejection already flows back as a tool result.
- [ ] Compile-once: the spec statement "a static tool's schema is compiled once ... cost one
      compilation" is deliberately uncited — compilation is unobservable through the public API,
      so it has no honest behaviour-level red bar. Pin it in `registry.test.ts` only if that can
      be done without stubbing the validator; otherwise code review judges it.
- [ ] Doc (implementer): one-line doc comment on `execute` pointing at
      `specs/hal-engine-tool-input-validation/spec.md`; update `docs/adding-a-tool.md` (no more
      defensive casting guidance), `README.md`, `.specify/spec.md`, `CHANGELOG.md`; PR body
      carries the migration note and the MINOR version bump; flip the spec's `Status` row as the
      implementation round's own tests get cited.

## Out of scope

- Returning an unknown tool name to the model instead of throwing (separate issue, named in the
  ticket); `Unknown tool: <name>` stays a throw.
- Validating tool *output*; hallucination detection and an evaluation harness.
- Per-tool authorization — a schema-valid call for someone else's data is still valid;
  `beforeToolCall` is a veto seam, not an authorization model.
- Retry, timeout and rate limiting around tool execution.
- Any actual tool implementation, which is written against this contract later.