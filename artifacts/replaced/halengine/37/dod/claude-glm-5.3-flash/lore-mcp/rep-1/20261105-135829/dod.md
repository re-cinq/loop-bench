# Definition of Done

> "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`)."

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute` and
`createChatOrchestrator` are real public entry points callable today, so every test below
calls them directly and fails on the absent validation behaviour, not on a missing module.
`specs/hal-engine-tool-input-validation/spec.md` was created alongside the tests (the ticket
requires the statements to exist first, and `re-lint/require-spec-link` fails an uncited test);
the statements my tests validate cite them, the doc/packaging duties stay uncited until the
implementation lands.

## Done when these pass

- [ ] **rejects a call missing a required property before the executor runs** — `execute('get_weather', {})`
      returns a `ToolResponse` naming `location` as required and the executor's call count is 0 (ticket
      criteria 1-2: validate before the executor, rejection as returned `ToolResponse`)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the property path and expected type when a field has the wrong type, without echoing the value** —
      a number where `location: string` is required is rejected with a message naming the path and the
      expected type and not containing the offending value, executor count 0 (criteria 1 and 4)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with an unlisted extra property through to the executor unchanged, exactly once** —
      `toEqual` on what the executor receives, so an injected default or coerced value fails; GREEN TODAY
      BY DESIGN: this criterion pins pass-through behaviour the change must preserve, not behaviour absent
      today (criteria 3 and the "no coercion/defaults" clause)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles the schema at register time, throwing a message that names the tool** — `register` with
      an uncompilable schema throws naming `broken_tool` and registers nothing (criterion 5, "fails at
      startup, not mid-conversation") `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — a source whose
      returned schema starts requiring only `location` and then also `units` is honoured per call; the second
      call is rejected naming `units` and the executor ran once (criterion 6) — also the observable half of
      "resolves and compiles per call" `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **holds the registered schema in force across ten execute calls** — ten calls alternating
      valid/invalid yield 5 rejections and 5 executor invocations (criterion 7's observable form: the schema
      governs every call; the raw compile count has no black-box observable without a validator-injection
      seam this ticket does not create — the register-time throw above pins the compile-once contract's
      other half) `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns the rejection to the model so a corrected retry continues the conversation** — a stub
      provider drives tool_use with `{}`, and `processMessage` resolves with a `tool_result` naming
      `location` in the next round's messages and executor count 0 (criterion 8; written here rather than in
      `chatOrchestrator.test.ts` because acceptance tests live in their own `.acceptance.test.ts` file)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — pins the unchanged throw; GREEN TODAY BY
      DESIGN (criterion 9) `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **never echoes a rejected payload value into the result or the logs** — a rejected payload carrying
      an identifying value leaves it in neither the returned `result` nor any log line; log lines are
      observed through the logger's only sink (`console.log` in `src/shared/logger.ts`), captured and
      restored around the call — the seam, not a mock (criterion 10)
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- Add the validator to `dependencies` (ajv unless the build proves otherwise) and compile a static
  tool's schema at `register`, throwing a message naming the tool for an uncompilable schema; for a
  function-valued source, resolve per call and cache the compiled validator by the resolved schema object
- Validate inside `execute` before the executor: rejection returns `{result: '<what was wrong>'}` naming
  the property path and constraint, no property values in the message or in any log line
- No orchestrator change should be needed for the loop test: `executeToolCalls` already feeds
  `response.result` back as the `tool_result`; if it fails, look at what `execute` returns, not at the loop
- One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`; full
  contract lives there (no `@param`/`@returns`/`@throws` block — `re-lint/max-comment-lines`)
- Docs the ticket owes: `README.md` claim made true, `docs/adding-a-tool.md` drops the cast-defensively
  guidance, `.specify/spec.md` records rejection-as-tool-result + round bound + extra properties pass
  through, `CHANGELOG.md` entry, MINOR version bump, PR body migration note
- The two green-by-design tests (pass-through, Unknown tool) must stay green unedited; the seven red
  tests go green with the implementation

## Out of scope

- Changing the `Unknown tool: <name>` throw into a returned tool result (own issue in this epic)
- Validating tool output, hallucination detection, an evaluation harness, per-tool authorization
  (`beforeToolCall` veto is a separate seam), retry/timeout/rate limiting around tool execution, and any
  actual tool implementation
- Proving `npm run build && node --input-type=module -e "import('./dist/index.js')"`: this pod does not
  build; CI's build step is the judge