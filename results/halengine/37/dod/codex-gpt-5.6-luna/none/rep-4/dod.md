# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the real callable seam, and registered executors provide observable evidence of whether validation happened before execution. The acceptance tests exercise the registry directly without replacing production modules.

## Done when these pass

- [ ] **returns schema rejection without executing malformed input** — required and wrong-typed fields produce a `ToolResponse` naming the failing field and expected type, without exposing the offending value or invoking the executor
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **preserves valid tool input and unknown-tool behavior** — valid unknown properties reach the executor unchanged exactly once, while an unregistered name still throws the existing error
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **uses the correct schema compilation lifetime** — static schemas are compiled at registration, function-valued definitions are resolved per call, and an invalid schema is rejected at registration with the tool name
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Make malformed required and wrong-typed input return a readable `ToolResponse` before executor invocation.
- [ ] Preserve valid input, including extra properties, without coercion or defaults.
- [ ] Compile static schemas at registration and resolve function-valued schemas for each call.
- [ ] Reject uncompilable schemas during registration and retain the unknown-tool throw.
- [ ] Update the validator dependency, documentation, specification, migration note, changelog, and required production doc comment after the behavior is implemented.

## Out of scope

- Tool output validation, authorization, retry/timeout/rate limiting, and changing the unknown-tool error into a model-visible result.
- Chat-loop integration and provider behavior beyond the registry contract.