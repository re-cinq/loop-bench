# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public ToolRegistry registration and execution methods already expose the behavior. Real executors, schema getters and a recording logger observe validation, schema reuse and diagnostics without mocks.

## Done when these pass

- [ ] **rejects missing required input and passes accepted input unchanged** — Required fields reject before execution; extra keys pass through without defaults or coercion, exactly once; unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects type and enum violations without disclosing input values** — Diagnostics name paths and constraints, with no identifying values in results or logs.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — Invalid schemas fail at startup naming the tool; valid schemas are inspected at registration and not recompiled during execution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses the current dynamic schema and caches each resolved schema object** — Changing schemas affect the next call, and repeated schema objects reuse compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator and compile static definitions during registration, naming the tool on schema errors.
- [ ] Validate before executing and return model-readable ToolResponse rejections; preserve extra keys and do not coerce or default values.
- [ ] Resolve function-valued definitions per call and cache compiled validators by schema identity.
- [ ] Return and log failing paths and constraints without exposing input values.
- [ ] Demonstrate a rejected tool call followed by a corrected retry through the orchestrator, with rejection text visible on the next provider round and the existing five-round bound intact.
- [ ] Point the one-line execute comment at the spec and update README.md, docs/adding-a-tool.md and .specify/spec.md with the contract.
- [ ] Deliver the MINOR version, changelog and PR migration note; CI verifies runtime packaging and repository checks.

## Out of scope

- Changing unknown-tool handling, validating output, authorization, retry infrastructure, timeouts, rate limiting or tool implementations.
- Production changes in this acceptance-test commit; downstream rounds implement the contract and delivery facets.