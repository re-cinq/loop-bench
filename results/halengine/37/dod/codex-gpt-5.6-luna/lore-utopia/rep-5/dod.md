# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `createChatOrchestrator` are existing real entry points. The acceptance tests call them directly with real schemas, executors, and a scripted provider.

## Done when these pass

- [ ] **ToolRegistry input-schema validation acceptance** — schema rejection, pass-through, registration-time compilation, dynamic schema resolution, and retry behavior are all pinned in one acceptance suite.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Reject missing required and wrong-typed fields as `ToolResponse` values without invoking the executor.
- [ ] Preserve valid unknown properties unchanged and invoke the executor exactly once.
- [ ] Compile static schemas at registration, cache them across executions, and name the tool in compilation failures.
- [ ] Resolve and validate function-valued definitions against the schema returned for the current call.
- [ ] Return rejection text through the tool loop so a provider can correct the call on the next round.

## Out of scope

- Unknown-tool behavior, tool output validation, documentation, package metadata, changelog, and migration/version notes.
- The named `specs/hal-engine-tool-input-validation/spec.md` file, which is absent on this branch and therefore supplies no traceability statements or anchor.