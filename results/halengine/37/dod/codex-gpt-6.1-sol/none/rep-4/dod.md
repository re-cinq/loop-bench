# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` expose the real lifecycle without a replacement module. Tests register real executors and schema objects; schema getters observe compilation reads and the public logger sink records diagnostics without replacing registry behavior.

## Done when these pass

- [ ] **rejects malformed tool input privately and passes valid input through unchanged** — Required, type and enum failures return safe diagnostics and never reach the executor; successful input retains unknown keys, receives no defaults or coercion, and executes once with context; unknown tools still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them across ten calls** — Registration consumes the schema, subsequent executions reuse compilation, and an invalid schema throws an error naming the tool during registration.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic definitions against the current schema and caches each schema object** — Switching between string and number schemas changes validation immediately; returning to a previously compiled schema reuses it.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator as a runtime dependency and compile static schemas during registration, reporting malformed schemas with the tool name.
- [ ] Return validation failures as ToolResponse results before execution; describe required fields, paths, types and enum constraints without including input values in results or logs.
- [ ] Preserve valid input, context and extra properties; disable type coercion and default application; retain unknown-tool exceptions.
- [ ] Resolve function definitions per call and cache validators by resolved schema object identity.
- [ ] Verify rejected calls reach the next provider round and corrected retries complete within the existing tool-round budget; existing orchestrator tests already pin the tool-result round plumbing, but their scripted providers cannot be reused under this task's prohibition on stubs.
- [ ] Add the one-line execute comment pointing to the input-validation spec; align README.md, docs/adding-a-tool.md and .specify/spec.md with rejection results, pass-through extras and bounded retries.
- [ ] Add the consumer-facing CHANGELOG.md entry, MINOR version bump and PR migration note about executors no longer receiving malformed calls.
- [ ] Let CI verify build, packaged import, types, lint, formatting and the full suite; keep acceptance tests red until the behavior is implemented.

## Out of scope

- Changing unknown-tool exceptions, validating tool output, authorization, execution retry/timeout/rate limits, hallucination detection, and implementing tools.
- Production changes in this acceptance-test commit; prose and packaging obligations remain reviewable implementation facets rather than source-text assertions.