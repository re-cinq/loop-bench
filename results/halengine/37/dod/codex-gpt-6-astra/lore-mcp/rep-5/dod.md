# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` already expose the real boundary. Three acceptance tests exercise real schemas and executors; schema accessors observe compilation reuse and the public logger sink captures diagnostic output without mocks.

## Done when these pass

- [ ] **rejects malformed tool inputs safely and passes accepted inputs unchanged** — required, type and enum failures return safe tool results before execution; logs name constraints without values; valid inputs keep unknown keys and omit defaults; unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten executions** — broken schemas fail at startup with the tool name; valid static schemas are read at registration and reused.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic definitions against the current schema and caches by schema identity** — switching schema objects changes validation immediately, and repeated use reuses the compiled schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator as a runtime dependency and compile static schemas during registration, naming the tool in compilation errors.
- [ ] Validate before execution; return constraint and path diagnostics without values; retain unknown-tool throws and pass accepted inputs unchanged.
- [ ] Resolve function definitions on each call and cache compiled validators by resolved schema identity.
- [ ] Verify rejection and corrected retry through the orchestrator's existing tool-result loop, retaining the five-round bound; the ticket requests a stub-provider integration test, while this acceptance-test task prohibits stubs.
- [ ] Point a one-line execute doc comment at the validation spec; update README.md, docs/adding-a-tool.md and .specify/spec.md with the enforced contract.
- [ ] Add the consumer changelog, MINOR version bump and PR migration note; let CI verify packaging, importability and the full checks.

## Out of scope

- Changing unknown-tool behavior, output validation, authorization, executor retry/timeout/rate limiting, or implementing application tools.
- Production changes in this acceptance-test commit.
- Source-text assertions for documentation, dependencies or release metadata; those remain implementation review and existing CI responsibilities.