# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` expose the real behavior without mocks or stubs. Three acceptance tests cover rejection and unchanged accepted input, static compilation, and dynamic schema resolution and caching.

## Done when these pass

- [ ] **rejects malformed tool input privately and passes accepted input through unchanged** — Required fields, types, and enum constraints reject before execution with property/constraint diagnostics and no input values in results or logs; extra keys survive, defaults and coercion stay off, and unknown tools still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them across ten executions** — Invalid schemas fail at registration with the tool name; valid static schemas are read at registration and reused without rereading across ten calls.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches only by resolved schema identity** — Each execution resolves its current definition, rejects against a changed schema, and reuses a previously compiled schema object.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add Ajv (unless the build proves otherwise) as a runtime dependency and compile static schemas during registration with tool-named compilation errors.
- [ ] Return private, property-specific validation diagnostics as ToolResponse before execution, with no opt-out, coercion, defaults, or implicit additionalProperties restriction.
- [ ] Resolve dynamic definitions per call and cache compilation by schema object identity.
- [ ] Keep the existing tool-loop forwarding and retry bound; add the ticket's rejected-call/corrected-retry integration coverage in a separate round-owned test file.
- [ ] Point execute's one-line contract comment to the validation spec; update README.md, docs/adding-a-tool.md, and .specify/spec.md to describe rejection results and unchanged extra properties.
- [ ] Add the npm-facing changelog entry, MINOR version bump, and PR migration note about executors no longer seeing malformed input.
- [ ] Let CI verify the runtime import, build, typecheck, full suite, lint, and formatting; no workspace build is needed to run these source tests.

## Out of scope

- Changing unknown-tool errors, validating tool output, authorization, hallucination detection, execution timeouts, rate limits, or implementing tools.
- Production implementation in this acceptance-test commit.
- Test doubles: the shipped mock provider cannot issue tool calls, and the existing orchestrator tests use scripted provider stubs; this commit exercises the registry boundary directly.
- Changing Lore's descriptor adapter: it currently emits only id/name/file; spec ordinals are stamped in test comments and linked inline from the new spec.