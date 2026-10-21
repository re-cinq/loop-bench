# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.execute` is the real registry entry point and can be exercised without doubles. The current implementation calls registered executors without schema validation, so these tests fail at the reported boundary.

## Done when these pass

- [ ] **Registry input schema validation** — rejects missing required fields and wrong types as `ToolResponse`s before execution, preserves valid input including extra keys unchanged, resolves function-valued schemas for each call, and rejects invalid static schemas at registration.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validation to `ToolRegistry.execute` and return safe, constraint-specific rejection text without invoking the executor.
- [ ] Compile static schemas during registration and resolve/cache function-valued schemas by resolved schema object.
- [ ] Document the validation and retry contract in the tool guide, README, and project spec.
- [ ] Add the input-validation spec statement and cite it from the acceptance test.
- [ ] Record the release migration note and add a user-facing changelog entry.

## Out of scope

- Changing the `Unknown tool: <name>` error behavior.
- Tool output validation, authorization, retry policies, timeouts, rate limiting, and tool implementations.