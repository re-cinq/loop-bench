# Definition of Done

> The registry currently pushes this check onto each tool's own executor, leaving every consumer
> to implement it itself — differently each time, or not at all. A tool that receives unexpected input must fail
> in one predictable, known way before the rest of this epic's tool work can be built on top
> of it.

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are callable public seams with real schemas and executors. Three acceptance tests exercise rejection, static registration and reuse, and changing dynamic definitions without replacing registry or validator behavior.

## Done when these pass

- [ ] **rejects malformed calls privately and passes accepted input unchanged** — required, type and enum failures return useful private results without invoking the executor; rejection logs identify constraints, valid extras and omitted defaults remain unchanged, and unknown names retain their exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — broken schemas throw with the tool name at registration; static schema access occurs at registration and is not repeated during ten executions.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema** — switching schema objects changes validation immediately, including switching back.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas during registration; include the tool name in schema errors.
- [ ] Reject required, type and enum failures as ToolResponse results before executor invocation, with property paths and constraints in results and logs but no input values.
- [ ] Preserve valid inputs including unknown keys, do not coerce or apply defaults, and retain the unknown-tool exception.
- [ ] Reuse static compiled schemas and cache dynamic compiled schemas by resolved schema object while resolving definitions per execution.
- [ ] Demonstrate the orchestrator retry path with rejection text on the next provider round and a corrected call completing within the existing round bound; the ticket requests a stub provider, but these acceptance tests use no provider doubles.
- [ ] Add the one-line execute comment pointing at the spec and update README.md, docs/adding-a-tool.md and .specify/spec.md with the full contract and retry bound.
- [ ] Include the migration note in the PR description, a consumer-facing CHANGELOG.md entry and a minor version bump; CI verifies the runtime import and all build, type, lint, formatting and test gates.

## Out of scope

- Changing unknown-tool handling, output validation, authorization, timeout/rate limiting, and implementing consumer tools.
- Production changes in this acceptance-test commit; implementation and release edits remain for the implementing round.