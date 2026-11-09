# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists and is directly callable: `ToolRegistry.register`
/ `execute` are the real entry points the ticket names, and the tool-loop criterion drives
`createChatOrchestrator.processMessage` with a scripted provider exactly as
`src/orchestration/chatOrchestrator.test.ts` already does. No doubles were needed beyond the
providers and executors that interface already defines.

## Done when these pass

- [ ] **rejects input the schema refuses before the executor runs** — a tool requiring a
      `location` string, called with `{}`, returns a `ToolResponse` whose `result` names
      `location` as required, and the executor's call count is `0`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **hands valid input to the executor unchanged, unlisted properties included, exactly once** —
      `toEqual` on what the executor received, so an added default or coerced value fails; this one
      is green today and must stay green (it pins the no-injection side of the contract)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and the expected type, never the value** — a
      number where a string is required names `location` and `string`, and the message does not
      contain `4242`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **refuses an uncompilable schema at register time, naming the tool** — `register` throws and
      the message names `get_weather`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — a
      `ToolDefinitionSource` whose returned schema changes between calls is validated against the
      current one, not a stale cached one
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates ten execute calls of a static tool against the schema compiled at register** —
      observed by editing the schema object after `register` and asserting all ten calls still
      reach the executor; green today (nothing validates yet) and a pin on compile-once once it does
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a schema rejection to the model and completes the message on the corrected retry** —
      a scripted provider rejects with `{}`, retries with `{location: 'Berlin'}`, and
      `processMessage` resolves with the rejection text visible in the next round's messages
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws Unknown tool: get_weather for an unregistered name** — unchanged, pinned;
      green today by design
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps an identifying value out of the rejection text and the log lines** — a rejected
      payload carrying `Ada Lovelace` produces no log line and no returned text containing it,
      observed through the console sink `src/shared/logger.ts` writes to
      `src/orchestration/tools/registry.acceptance.test.ts`

Run them with the repo's own Jest runner, this file only:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Red at the time of writing: 6 failed, 3 passed (the three passes are the pins called out above).
Every red fails for the claimed reason: the executor runs on input the schema will refuse, no
rejection text is produced, and nothing throws at register.

## Facets

- [ ] Add a JSON Schema validator (`ajv` unless the build proves otherwise) to `dependencies` in
      `package.json` — not `peerDependencies`, not `devDependencies`.
- [ ] Compile a static tool's schema once inside `register` (throw, naming the tool, for an
      uncompilable schema); resolve a function-valued `ToolDefinitionSource` per call and cache the
      compiled validator by the resolved schema object.
- [ ] Validate in `execute` before the executor runs; on failure return
      `{result: '<what was wrong>'}` naming property paths and constraints, never values — in the
      message and in the log lines. Enforce `required`, declared types and `enum` only; no
      `additionalProperties: false`, no coercion, no defaults, no opt-out flag.
- [ ] Leave the `Unknown tool: <name>` throw exactly as it is, and give `execute` a one-line doc
      comment pointing at `specs/hal-engine-tool-input-validation/spec.md` (a `@param` block fails
      `re-lint/max-comment-lines`).
- [ ] The ticket's own tests, where it names their files: `src/orchestration/tools/registry.test.ts`
      and a tool-loop test in `src/orchestration/chatOrchestrator.test.ts` may restate these
      behaviours as the implementation round's unit tests — cite them against the statements in
      `specs/hal-engine-tool-input-validation/spec.md` (`re-lint/require-spec-link` fails an
      uncited test). The two unlinked statements under "The documented contract" are there to cite.
- [ ] Update `docs/adding-a-tool.md` (drop the cast-defensively advice), `README.md` and
      `.specify/spec.md` per the ticket, add the `CHANGELOG.md` entry (`scripts/check-changelog.sh`
      fails any PR touching non-test `src/` files without one), and keep
      `example/weather-tool.ts` compiling — the doc fence is generated from it
      (`npm run docs:check`).
- [ ] `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0; then the
      rest of CI's checklist (typecheck, eslint `--max-warnings 0`, `prettier:check`, full suite).
- [ ] PR body states the migration note (executors stop seeing malformed input; a tool that relied
      on producing its own error for malformed input stops seeing it) and the MINOR version bump.

## Out of scope

- Validating tool output; hallucination detection and an evaluation harness.
- Per-tool authorization (a `ToolContext` boundary concern owned by no issue in this epic).
- Retry, timeout and rate limiting around tool execution.
- Any actual tool implementation, written against this contract later.
- Returning an unknown tool name to the model instead of throwing (tracked as its own issue).