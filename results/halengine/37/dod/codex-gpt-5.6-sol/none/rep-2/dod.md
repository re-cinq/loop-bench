# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are public seams that accept real definitions, input values, and executors, so the validation boundary and its schema lifecycle are directly observable.

## Done when these pass

- [ ] **rejects missing and wrong-typed input without executing or disclosing values** — rejected input becomes a corrective, value-redacted response and never reaches the executor or logs
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles schemas at the correct lifecycle and preserves accepted input** — invalid and static schemas compile at registration, while extra properties pass through unchanged
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses each function-valued definition current at that call and keeps unknown-name errors** — dynamic definitions validate per call without changing the unknown-tool contract
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator as a runtime dependency and compile static schemas during registration.
- [ ] Validate resolved dynamic schemas per call with object-identity caching.
- [ ] Return redacted validation failures before execution while preserving accepted input and unknown-tool errors.
- [ ] Carry validation failures through the bounded orchestrator tool loop as ordinary tool results.
- [ ] Update the public documentation, changelog, package version, and one-line `execute` contract comment.

## Out of scope

- Tool output validation, authorization, retry, timeout, and rate limiting.
- Changing the existing exception for an unregistered tool name.