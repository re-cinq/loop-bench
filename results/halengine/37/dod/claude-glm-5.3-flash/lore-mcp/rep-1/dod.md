# Definition of Done

> "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the
> executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`)."

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute` is the real
entry point the ticket names, and the orchestrator loop is reachable through
`createChatOrchestrator(...).processMessage` with a scripted provider. Both acceptance files call
those entry points directly and fail today on behaviour — no validation happens, so the executor
runs on malformed input and no rejection `ToolResponse` is ever returned.

## Done when these pass

- [ ] **rejects input missing a required property with a ToolResponse naming it, and never calls the executor** — `execute` with `{}` against a `location`-required schema returns a rejection naming `location` as required, executor call count `0`
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes schema-valid input through to the executor unchanged, extra keys included, exactly once** — GREEN TODAY by design: this is existing behaviour the ticket pins as unchanged (`toEqual`, so a default or coercion fails it)
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed value naming the property path and expected type without the offending value** — number where string required → message names path + expected type, never the value
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time for a schema that does not compile, naming the tool** — `register` throws for an uncompilable schema, message names the tool
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call, not a stale one** — factory returns schema v1 then v2; each call validated against the schema current at that call
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static tool schema once across ten execute calls** — exactly one compile across `register` + ten `execute` calls
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws Unknown tool, naming the tool, for an unregistered name** — GREEN TODAY by design: pins the `Unknown tool: <name>` throw the ticket says stays unchanged
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps an identifying input value out of the rejection text and every log line** — rejected payload with an identifying value: no log line (captured through the real `setLogger` seam) and no returned text carries the value
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the model as a tool result and lets a corrected retry complete** — tool loop: malformed call rejected, corrected retry runs the executor once, `processMessage` resolves with the rejection text visible to the provider on the retry round
  `src/orchestration/chatOrchestrator.inputValidation.acceptance.test.ts`

Run:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath \
  src/orchestration/tools/registry.acceptance.test.ts \
  src/orchestration/chatOrchestrator.inputValidation.acceptance.test.ts
```

Red today: 7 failed, 2 passed (the two greens are the ticket's own "unchanged" pins). CI shows the
green bar after the implementation lands.

## Facets

- [ ] Add the validator (`ajv` unless the build proves otherwise) to `dependencies` — not `peerDependencies`, not `devDependencies` — so `import Ajv from 'ajv'` resolves a declared dependency
- [ ] Compile a static tool's schema once at `register` time; uncompilable schema → throw naming the tool; function-valued `ToolDefinitionSource` → resolve + compile per call, cached by the resolved schema object
- [ ] Validate `input` in `execute` before the executor; on failure return `{result: '<what was wrong>'}` naming property paths and the failed constraint, never a value; keep log lines value-free; validation enforces `required`, types, `enum` only — no `additionalProperties` injection, no coercion, no defaults, no opt-out flag
- [ ] Give `execute` its one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md` (statements already exist there; `re-lint/max-comment-lines` rejects a `@param` block)
- [ ] Write the ticket's own `src/orchestration/tools/registry.test.ts` and the tool-loop test in `chatOrchestrator.test.ts`, running only those — the two acceptance files above are refused by name for this pod
- [ ] Docs: `README.md` states what the registry now does (and the claim is true); `docs/adding-a-tool.md` drops the cast-defensively guidance; `.specify/spec.md` records rejection-as-tool-result, round bound, extra-key pass-through; `CHANGELOG.md` entry under `## [Unreleased]`
- [ ] PR body carries the migration note (executors now receive only schema-accepting input); version bump is MINOR; `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0; coverage floors for `src/orchestration/tools/` ratchet up with the new tests

Coupling to know about: the compile-once test counts calls to the hoisted ajv's public `compile`
entry point (reached via `Object.getPrototypeOf(new Ajv())` so either ajv major resolves). If the
implementation validates without calling that method — a different schema-compiler package — the
spy target in `registry.acceptance.test.ts` moves to the new entry point rather than the test being
deleted; the count assertion (one compile, not ten) is the contract.

## Out of scope

- Returning `Unknown tool: <name>` to the model instead of throwing (its own issue; the throw stays)
- Validating tool *output*; hallucination detection and an evaluation harness
- Per-tool authorization — a schema-valid call for someone else's data is still valid (`beforeToolCall` veto seam is a separate epic concern)
- Retry, timeout and rate limiting around tool execution
- Any actual tool implementation (e.g. rewriting `example/weather-tool.ts`'s defensive casts)