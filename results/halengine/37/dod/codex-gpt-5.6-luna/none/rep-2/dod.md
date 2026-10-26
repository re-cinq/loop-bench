# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is an existing public seam, so the acceptance tests call the registry directly with real tool definitions and executors.

## Done when these pass

- [ ] **rejects missing required input before invoking the executor** — a required property violation returns a descriptive `ToolResponse` and leaves the executor untouched
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects wrong-typed input without leaking its value** — a type violation names the field and expected type without returning identifying input values
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable schema at registration time** — invalid static schemas fail at registration and identify the tool
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates function-valued definitions against the current schema** — each call uses the currently resolved definition rather than a stale schema
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Reject missing required properties before executor invocation.
- [ ] Reject wrong types with redacted, path-aware validation text.
- [ ] Preserve valid unknown properties and invoke the executor once; the current implementation already demonstrates this behavior and the new rejection tests protect the validation boundary around it.
- [ ] Compile static schemas at registration and resolve dynamic definitions per call.

## Out of scope

- Tool output validation, authorization, retries, timeouts, rate limiting, and changing the unknown-tool exception.
- Documentation, dependency, build, changelog, migration-note, and pull-request metadata updates beyond the runtime contract tested here.