# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — the seam exists: `ToolRegistry.execute` and `ToolRegistry.register` are public methods, so the tests drive a real `ToolRegistry` and a real orchestrator and observe the behaviour. Every validation test fails today because the check is absent (`ajv` is not in `dependencies`, nothing compiles a schema, `execute` calls the executor unconditionally), not because of an import or fixture problem.

## Done when these pass

- [ ] **answers a missing required property with a rejection naming it and never calls the executor** — `execute` validates `input` against the resolved `inputSchema` before the executor runs; the failure comes back as a `ToolResponse` naming the property, and the executor's call count is 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming the path and expected type, never the value** — a number where a string is required is rejected with a message naming the field path and the expected type, and the offending value appears nowhere in it
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps the rejected payload values out of the returned text and every log line** — a rejected payload carrying an identifying value leaves that value out of the returned result and out of every log line the call produces; lines are captured through the public `setLogger` seam, not a spy
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes a schema-valid call carrying an unlisted extra property through to the executor unchanged, exactly once** — `toEqual` on what the executor received, so an added default or coerced value fails; the leading rejected call is what makes this red today rather than trivially green
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — a static schema that cannot compile (`{type: 'banana'}`) makes `register` throw synchronously with the tool's name in the message
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **serves ten execute calls from the schema compiled at register without reading the schema again** — the schema is a read-counting `Proxy` around a real schema object: registration must read it (compile at register), and ten executes must read it no further (no per-call recompile); red today because register never touches the schema at all
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call** — a `ToolDefinitionSource` whose schema changes between calls is validated against the schema current at each call, not a stale cached one
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a value outside a declared enum, naming the property and the constraint** — `enum` is enforced like `required` and types, the message names the property and the constraint, and the value stays out
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **carries a rejected tool call back to the model as a tool result and resolves on the corrected retry** — a scripted provider makes a malformed tool call, then a corrected one: `processMessage` resolves (not rejects), `onError` never fires, the rejection text naming path and type reaches the provider on the next round, and only the corrected call reaches the executor
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **still throws Unknown tool for an unregistered name** — green today by design: the ticket pins this unchanged behaviour so the new rejection path cannot quietly swallow it
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (not peer/dev)
- [ ] Compile a static tool's schema at `register`; throw naming the tool when it cannot compile
- [ ] In `execute`, validate `input` against the resolved schema; on failure return a `ToolResponse` naming the failing path and constraint, with no property values in the text or the logs
- [ ] Resolve function-valued sources per call, caching compiled validators by the resolved schema object
- [ ] Add the one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md` (drop the cast-defensively guidance), `README.md`, `.specify/spec.md`
- [ ] Add the `CHANGELOG.md` entry and the MINOR version bump
- [ ] Cite any statement the implementation adds or rewords, and repoint `#Lnn` anchors if lines shift (`node scripts/repoint-spec-anchors.mjs`; the new spec's own anchors were hand-placed, since a spec absent from the base ref has no baseline to translate from)

## Out of scope

- The `Unknown tool: <name>` throw becoming a tool result (tracked as *Return an unknown tool name to the model instead of throwing*)
- Validating tool output; hallucination detection and an evaluation harness
- Per-tool authorization; retry, timeout and rate limiting around tool execution
- Any actual tool implementation, which is written against this contract later

## Notes for the next pod

- The acceptance tests live in `.acceptance.test.ts` files by pod contract. The ticket's named `src/orchestration/tools/registry.test.ts` is still yours to write for your own round tests — these files are the definition of done, run them with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`.
- The ten-execute test counts schema reads through a `Proxy`; a correct implementation reads the schema during `register` (compiling it) and never again during `execute`. Re-serializing the schema per call to detect changes will fail it — cache by the resolved schema object's identity.
- `ajv` 6.x resolves today as a transitive dependency; the enum message must name the constraint ("allowed"/"enum"/"one of"), which ajv's default messages do, but a custom formatter must keep it.
- Spec status reads `In Progress` because one testable statement (the negative-space "configures those constraints only" bullet) is deliberately uncited; flip the row to `Shipped` when you land, or move that bullet under *Out of scope*.