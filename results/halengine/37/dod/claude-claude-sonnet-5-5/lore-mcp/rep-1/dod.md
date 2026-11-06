# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry` is a real entry point and needs no doubles; the tests register tools and call `register`/`execute` directly. The statements they validate live in `specs/hal-engine-tool-input-validation/spec.md`.

## Done when these pass

- [ ] **rejects input missing a required property** — result names `location`, executor never called
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with an unlisted extra property** — extra key reaches the executor unchanged, once; invalid input is still rejected
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field** — message names path and expected type; neither it nor any log line contains the value
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time** — uncompilable schema throws, message names the tool
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition** — schema current at each call is used
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; validate in `execute` and return a `ToolResponse` on rejection
- [ ] Compile static schemas in `register`, naming the tool on failure
- [ ] Resolve and compile function-valued schemas per call, cached by schema object
- [ ] Messages and logs name paths and constraints, never values
- [ ] Ticket items not pinned here: compile-once count, `chatOrchestrator.test.ts` retry loop, unknown-tool throw; docs, README, `.specify/spec.md`, CHANGELOG

## Out of scope

- Unknown tool name still throws; validating tool output; authorization; retry, timeout, rate limiting