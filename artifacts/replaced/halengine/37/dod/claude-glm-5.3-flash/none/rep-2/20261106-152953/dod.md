# Definition of Done

> "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`)."

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute` are the public
entry point, and `createChatOrchestrator` with a scripted provider drives the tool loop exactly as
`src/orchestration/chatOrchestrator.test.ts` does today. Every test calls the real code and fails
only because the validation is absent. Run them with
`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry-input-validation.acceptance.test.ts`.

## Done when these pass

- [ ] **rejects input missing a required property before the executor runs** — `execute` with `{}` against a schema requiring a `location` string returns a `ToolResponse` whose result names `location` and `required`, executor calls `0`
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **passes unknown extra properties through to the executor unchanged, exactly once** — valid input plus an unlisted key reaches the executor `toEqual` the input, once (green today: a regression pin against injected defaults, coercion or `additionalProperties: false`)
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and expected type, without the value** — a number where a string is required is rejected; the result names the path and `string` and does not contain the value
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **rejects a value outside a declared enum before the executor runs** — `units: 'kelvin'` against the `celsius`/`fahrenheit` enum is rejected; the result names `units`, executor calls `0`
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws and the message contains the tool name; nothing mid-conversation
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **compiles a static schema once, at register, and not again across ten execute calls** — the schema object is read while compiling at `register` and never re-read during executes (observed through a counting getter on the schema's `properties`, so no validator import or mock is needed)
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — the same input is accepted, then rejected after the function-valued source's schema changes; executor runs exactly once
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **keeps identifying input values out of rejection text and log lines** — a rejected payload carrying an identifying field leaves the value in neither the returned result nor any log line, with `LOG_LEVEL=debug` and a recording logger installed through the real `setLogger` seam
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **returns a rejected tool call to the model as a tool result within the same conversation** — through `chatOrchestrator.processMessage`, a rejected tool call followed by a corrected retry resolves (today the executor's throw propagates and `processMessage` rejects), with the rejection text visible to the provider on the next round
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`
- [ ] **still throws Unknown tool for an unregistered name** — unchanged throw, pinned (green today)
  `src/orchestration/tools/registry-input-validation.acceptance.test.ts`

## Facets

- [ ] Add the validator (`ajv` unless the build proves otherwise) to `package.json` `dependencies`
- [ ] Compile a static tool's schema at `register`; an uncompilable schema throws there, message naming the tool
- [ ] Resolve function-valued sources per call and cache the compile by the resolved schema object
- [ ] Validate in `execute` before the executor; a rejection returns a `ToolResponse` (`{result: '<what was wrong>'}`), never throws, and the message names property paths and constraints, never values
- [ ] Enforce `required`, declared types and `enum` only — no `additionalProperties: false`, no coercion, no defaults, no opt-out flag
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md` (the full contract lives there; `re-lint/max-comment-lines` rejects a longer block)
- [ ] Docs: `docs/adding-a-tool.md` drops the cast-defensively advice; `README.md` states what the registry now does; `.specify/spec.md` records rejection-as-tool-result, the round bound, and extra-property pass-through
- [ ] `CHANGELOG.md` entry (npm-reader voice) — CI runs `scripts/check-changelog.sh` on any PR touching non-test `src/` files
- [ ] MINOR version bump; PR body carries the migration note (executors stop seeing malformed input)
- [ ] The acceptance file above goes green, then the full `npm test` suite stays green

## Out of scope

- The `Unknown tool: <name>` throw stays a throw (*Return an unknown tool name to the model instead of throwing*)
- Validating tool *output*
- Hallucination detection and an evaluation harness
- Per-tool authorization — a schema-valid call for someone else's data is still valid (`beforeToolCall` veto seam is a separate issue)
- Retry, timeout and rate limiting around tool execution
- Any actual tool implementation