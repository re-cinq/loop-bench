# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the existing real entry point, so the acceptance tests call the registry and chat orchestrator directly without introducing a seam or test double.

## Done when these pass

- [ ] **rejects missing and mistyped fields before execution without logging or returning their values** — invalid required and typed fields return redacted validation results and never invoke the executor.  
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema once and passes valid extra properties through exactly once** — registration compiles static input schemas once and valid input, including unknown keys, reaches the executor unchanged.  
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema resolved for that call** — dynamic definitions are checked against the current schema rather than a stale cached schema.  
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **fails fast when registration cannot compile a tool schema and names the tool** — invalid static schemas fail at registration with the tool name.  
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected call to the provider so a corrected retry can complete the tool loop** — validation failures are readable tool results, allowing the existing loop to retry and resolve.  
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add dependency-backed JSON Schema validation at the registry boundary.
- [ ] Compile static schemas at registration and cache dynamic schemas by resolved schema object.
- [ ] Preserve unknown keys and redact rejected values from logs and returned results.
- [ ] Return validation failures as tool results so the orchestrator can retry.

## Out of scope

- Unknown tool names continue to throw `Unknown tool: <name>`.
- Tool output validation, authorization, retry policy, timeout, rate limiting, and tool implementation changes.