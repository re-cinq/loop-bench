# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the real registry entry point and can be exercised directly. The suite covers rejection before execution, pass-through of valid input, current function-valued schemas, and static schema registration failure.

## Done when these pass

- [ ] **Rejects invalid input before the executor** — required and type violations return descriptive results without invoking the executor; valid extra properties pass through unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Uses the current dynamic schema** — each function-valued definition's schema is used for that call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Rejects an uncompilable static schema at registration** — registration throws synchronously and identifies the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return validation failures as tool results before calling the executor.
- [ ] Preserve valid input, including undeclared properties, exactly as received.
- [ ] Resolve function-valued definitions and validate each call against its current schema.
- [ ] Compile static schemas during registration and reject invalid schemas with the tool name.

## Out of scope

- Changing the existing throw for an unregistered tool name.
- Tool output validation, authorization, retries, timeouts, and rate limiting.