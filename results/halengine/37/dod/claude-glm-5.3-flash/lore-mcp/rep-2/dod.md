# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam exists: `ToolRegistry.register`/`execute` and
`createChatOrchestrator(...).processMessage` are public entry points a test can drive directly
with real values. No doubles: the only collaborator swapped is the process logger, through the
shipped `setLogger` seam. The validator itself (`ajv` per the ticket, unless the build proves
otherwise) is chosen by the implementation round; these tests pin behaviour through the
registry's real surface, never the validator's API.

Run only these two files (a bare `npm test` is refused here):

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath \
  src/orchestration/tools/registry.acceptance.test.ts \
  src/orchestration/chatOrchestrator.acceptance.test.ts
```

Expected before implementation: **7 failed, 3 passed**. The three passes are guards the ticket
orders pinned, green now by design: passthrough (today's registry never mangles input; it must
stay that way once a validator exists), compile-once (only observable once something compiles —
the test mutates the registered schema into an uncompilable one after `register`, so a
recompile-per-call implementation throws), and `Unknown tool` (unchanged behaviour). The seven
red tests each fail for the reported reason: no validation happens, so the executor runs on
malformed input, no rejection text exists, and `register` accepts a broken schema.

Repo lint constraint for any test added here: `re-lint/max-expects` is `error` at its default of
one `expect()` per `it` — combine assertions into one object, as these files do.

## Done when these pass

- [ ] **rejects input missing a required property, names it, and never calls the executor** — `execute` validates before the executor runs; a rejected call returns a `ToolResponse` naming the constraint, executor count 0 (ticket criteria 1-2)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes accepted input through to the executor unchanged, extra properties included, exactly once** — `toEqual` on what the executor received, so an added default or coerced value fails (ticket criterion 3; guard, green now)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and expected type but not the value** — message carries `/location` and `string`, never `1234567` (ticket criterion 4)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **enforces a declared enum constraint and names the property it failed** — `units: 'kelvin'` against `enum: [celsius, fahrenheit]` is rejected (ticket "What to do": required, types and enum only)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for a schema that cannot compile, naming the tool** — `type: 'strng'` fails at `register`, message names `broken_tool` (ticket criterion 5)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — rejected under the first returned schema, accepted after the source returns a different one; a stale cache fails the second half (ticket criterion 6)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema once at register and reuses it across ten execute calls** — mutating the registered schema into an uncompilable one after `register` must not throw on any of ten calls (ticket criterion 7; guard, green now, load-bearing once a validator lands)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — unchanged failure class, deliberately out of scope (ticket criterion 9; guard, green now)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps property values out of rejection messages and log lines** — `ALICE-4242-SECRET` appears in neither the returned text nor any captured log line (ticket criterion 10)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the provider and resolves through the corrected retry** — `processMessage` resolves (not rejects), executor runs only for the corrected call, and the round-2 request the provider receives contains the rejection naming `location` (ticket criterion 8)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add the validator to `package.json` `dependencies` (not peer/dev), per ticket: `ajv` unless the build proves otherwise
- [ ] Compile a static tool's schema at `register` (uncompilable schema throws, message names the tool); a function-valued `ToolDefinitionSource` resolves per call with the compiled validator cached by the resolved schema object
- [ ] Validate in `execute` before the executor; on failure return the rejection `ToolResponse` naming property paths and constraints, never values, in both the message and any log line; no opt-out flag, no coercion, no defaults, no `additionalProperties` injection; keep the `Unknown tool` throw
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md` (`re-lint/max-comment-lines` rejects a `@param`/`@returns`/`@throws` block)
- [ ] Mirror the tool-loop test into `chatOrchestrator.test.ts` and write the round's own `src/orchestration/tools/registry.test.ts` (the ticket names both files); the two `.acceptance.test.ts` files above stay the gate
- [ ] Update `docs/adding-a-tool.md` (drop the defensive-casting advice; input reaching an executor already passed the schema; unknown keys may still appear; a rejection is returned, not thrown), `README.md`, `.specify/spec.md` (rejection is a tool result; the tool-round bound stops a retry spin; extras pass through unmodified), and add a `CHANGELOG.md` entry
- [ ] MINOR version bump; migration note in the PR body (executors now receive only schema-accepted input; tools that relied on seeing malformed input stop seeing it)
- [ ] Turn the seven red tests green; keep the three guards green

## Out of scope

- Changing the `Unknown tool: <name>` throw into a return (tracked as its own issue: *Return an unknown tool name to the model instead of throwing*)
- Validating tool *output*; hallucination detection or an evaluation harness
- Per-tool authorization (a schema-valid call for someone else's data is still valid; a `beforeToolCall` veto seam is a separate issue)
- Retry, timeout and rate limiting around tool execution
- Any actual tool implementation — written against this contract later