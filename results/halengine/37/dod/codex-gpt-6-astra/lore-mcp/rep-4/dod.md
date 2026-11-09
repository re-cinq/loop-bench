# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `register` and `execute` methods accept real schemas and executors today. Three acceptance tests exercise rejection, registration-time compilation and changing dynamic definitions without replacing the validator.

## Done when these pass

- [ ] **rejects malformed tool input privately and preserves accepted input** — Required fields, types and enum violations return private diagnostics without invoking executors; accepted extra keys survive without defaults or coercion, exactly once, and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — Invalid schemas fail at startup with the tool name; valid schemas are read at registration and not revisited during execution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates the current dynamic schema and caches each resolved schema object** — Changed definitions take effect immediately, reject malformed input and reuse a previous schema's compiled validator when its object returns.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator and reject invalid static schemas during registration with a tool-specific error.
- [ ] Validate before executor dispatch and return field-path/constraint diagnostics without input values in results or logs; preserve accepted inputs and unknown-name errors.
- [ ] Resolve dynamic definitions per call and cache validators by schema object; retain static validators across calls.
- [ ] Verify the orchestrator retry integration and five-round budget; the ticket explicitly requests a stub provider but this acceptance-writing task prohibits stubs, so that integration test remains an implementation-round obligation rather than weakening the registry tests.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md, add the one-line execute spec comment, and record the MINOR migration and changelog; CI verifies packaging and the full checklist.

## Out of scope

- Tool output validation, unknown-name response changes, authorization, execution retry/timeout/rate limiting and actual tool implementations.
- Source-text assertions for prose, dependency placement or release metadata; those remain diff and CI review obligations.