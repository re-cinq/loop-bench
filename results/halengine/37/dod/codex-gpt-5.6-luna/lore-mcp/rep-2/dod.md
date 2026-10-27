# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is already the real entry point used by the orchestrator, so the acceptance tests call the registry directly. No replacement seam or test double is needed.

## Done when these pass

- [ ] **returns a required-field rejection without invoking the executor, then preserves valid extra input** — malformed required input returns a `ToolResponse`, while valid unknown keys reach the executor unchanged exactly once.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field with its path and expected type, without exposing the value** — validation reports the field and expected type without returning the identifying value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema resolved for that call** — each call uses the current resolved schema rather than a stale cached definition.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws with the tool name when a static schema cannot be compiled at registration** — invalid static schemas fail at registration.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema once across repeated executions** — a static schema is compiled at registration and not recompiled for ten executions.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Reject schema-invalid input before executor invocation and return a readable tool result.
- [ ] Preserve accepted input, including unlisted properties, without coercion or defaults.
- [ ] Resolve function-valued definitions per call and compile static schemas at registration.
- [ ] Keep unknown-tool errors and tool execution behavior outside this validation slice unchanged.

## Out of scope

- Tool output validation, authorization, retries, timeouts, rate limiting, and changing the unknown-tool exception.
- Documentation, package dependency, migration-note, changelog, and end-to-end conversation-loop work from the broader issue.