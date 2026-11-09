# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists. `ToolRegistry.execute` and `register` are the
real entry points and are callable from a test today, so every criterion in the issue is observed
through them. The tests fail on the absent behaviour, not on a missing path into it: today the
executor runs for input any schema would reject, the forecast comes back for `{}`, and no schema
is ever compiled.

## Done when these pass

- [ ] **answers input the schema rejects with a rejection naming the required field, leaving the
      executor unrun** — a tool requiring a `location` string, executed with `{}`, returns a
      `ToolResponse` whose `result` names `location` as required, with executor call count `0`.
      Issue criterion 1 and 2. `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **hands valid input to the executor exactly as the model sent it, unlisted properties
      included** — `toEqual` on the received input plus call count `1`, so an added default or a
      coerced value fails it. Already green (a pin): it guards the implementation against coercion.
      Issue criterion 3. `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrongly typed field naming its path and expected type, without echoing the
      value** — a number where a string is required is rejected with a message naming the path and
      the expected type and carrying no `12345`. Issue criterion 4.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **refuses to register a schema no validator can compile, naming the tool at registration**
      — `register` throws for `{location: {type: 'strng'}}` with the tool named. Issue criterion 5.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema it returns at that call** — a
      source whose schema grows a `units` requirement mid-life is enforced on the next call, so the
      cache key is the resolved schema, not the name. Issue criterion 6.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static tool schema once and reuses the compiled validator across ten
      executes** — `Ajv.prototype.compile` observed through a spy: once after register and ten
      executes, not once per call. Issue criterion 7.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a schema-rejected tool call back to the provider and finishes the turn on the
      corrected retry** — a stubbed provider calls the tool with `{}` then corrects;
      `processMessage` resolves, and round two's messages carry the rejection as the failed call's
      `tool_result`. Issue criterion 8.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — already green (a pin): the throw
      is unchanged, and it catches the plausible mistake of converting every failure in `execute`
      into a `ToolResponse`. Issue criterion 9.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **answers a rejected call without copying its input into the result or any log line** — a
      rejected payload carrying `742 Evergreen Terrace, Springfield` (wrong type, so it is rejected)
      leaves that value out of the returned text and out of every captured log line. Issue
      criterion 10. `src/orchestration/tools/registry.acceptance.test.ts`

Nine tests, not one, because they are the issue's own criteria list, one for one. Two of them
(the pins) are green from the start and stay green; the other seven are red today.

## Facets

- [x] Red: committed in this round — seven failing tests plus two pins, each failing for the
      reason the issue reports (executor runs for rejected input, forecast returned for `{}`, no
      schema compiled, throw reaches the orchestrator boundary as rejection text that never exists).
- [ ] Green: validate inside `ToolRegistry.execute` with a JSON Schema validator (`ajv` unless
      the build proves otherwise) added to `dependencies` — not `peerDependencies`/`devDependencies`.
      Compile at `register` for a static source; resolve per call for a function source, cached by
      the resolved schema object. Rejection is a returned `ToolResponse`; only `Unknown tool: <name>`
      still throws. Messages and log lines name property paths and constraints, never values.
- [ ] The implementer's own suite: the issue asks for `src/orchestration/tools/registry.test.ts`
      and a tool-loop test in `chatOrchestrator.test.ts`. Those are the implementer's files to write;
      the acceptance files above are this round's DoD gate and are refused by name to the pod's Bash
      hook, so mirror the cases there rather than importing them.
- [ ] `execute` gets a one-line doc comment (no `@param`/`@returns`/`@throws` —
      `re-lint/max-comment-lines`) pointing at
      `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Docs that must match the behaviour: `README.md` (what the registry now does, and true),
      `docs/adding-a-tool.md` (no more cast-defensively advice; schema already enforced, unknown
      keys may remain, rejection is returned not thrown), `.specify/spec.md` (rejection is a tool
      result, the tool-round bound stops a retry cycle, extra properties pass through unmodified).
- [ ] `CHANGELOG.md` entry written for a reader on npm; `scripts/check-changelog.sh` gates the
      PR. Version bump is MINOR, and the PR body carries the migration note: executors that
      hand-validated now receive only schema-accepted input, and a tool that relied on seeing
      malformed input stops seeing it.
- [ ] Status flip owed when green: the spec is fully cited, so
      `re-lint/require-status-matches-coverage` computes `Shipped` against the current `Draft` row
      and will report it as an eslint error until the row is flipped. Flip it when the tests pass —
      that is the point at which the row becomes true.
- [ ] If the acceptance files move, repoint the spec's `#Lnn` anchors:
      `node scripts/check-spec-anchor-names.mjs --fix`.

## Out of scope

- Changing the `Unknown tool: <name>` throw into a returned result (_Return an unknown tool name
  to the model instead of throwing_ — an intentional split, tracked separately).
- Validating tool output; hallucination detection and an evaluation harness.
- Per-tool authorization — a schema-valid call for someone else's data is still valid
  (_Let a consumer decline a tool call through a `beforeToolCall` hook_ is a veto seam).
- Retry, timeout and rate limiting around tool execution.
- Any actual tool implementation, which is written against this contract later.