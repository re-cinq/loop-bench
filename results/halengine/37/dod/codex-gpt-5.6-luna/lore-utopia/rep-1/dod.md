# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies` — not a second, hand-written schema in a different format, since the schema already has to match what is handed to the providers.

**Strategy: `direct`** — `ToolRegistry.execute` is an existing real entry point, so the acceptance tests exercise registered definitions and executors without mocks or stubs.

## Done when these pass

- [ ] **returns a schema rejection for missing and wrongly typed fields without invoking the executor** — rejected input returns a readable `ToolResponse`, names the field and expected type, does not expose the offending value, and does not run the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input and unlisted properties through unchanged, and still throws for an unknown tool** — valid extra properties are preserved exactly and the existing unknown-tool error remains unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable schema at registration and compiles a static schema before later schema mutation** — invalid static schemas fail at registration with the tool name and valid static schemas are compiled once.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema resolved for each call** — each execution uses its current resolved schema rather than a stale validator.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator as a runtime dependency and compile static schemas at registration.
- [ ] Return schema rejection text from `execute` while preserving the unknown-tool exception.
- [ ] Resolve and cache function-valued schemas by resolved schema object per call.
- [ ] Update the tool documentation, README, system spec, migration note, and changelog.

## Out of scope

- Tool output validation, authorization, retry policy beyond the existing tool-round bound, and changing unknown-tool errors.