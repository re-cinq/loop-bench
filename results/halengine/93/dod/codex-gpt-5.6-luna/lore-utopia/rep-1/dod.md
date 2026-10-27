# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point and accepts a real `AIProvider`, `ToolRegistry`, and `afterModelResponse` hook. The acceptance test drives the round loop with a scripted provider and registered tool, so it fails on the current final-round-only behavior.

## Done when these pass

- [ ] **reports every provider round and preserves absence when no round reports usage** — `afterModelResponse` receives the summed usage from all reporting provider rounds, ignores missing round usage, and receives `undefined` when no round reports usage.
      `src/orchestration/usageReporting.acceptance.test.ts`

## Facets

- [ ] Add the red multi-round usage acceptance test through `createChatOrchestrator`.
- [ ] Aggregate reported usage while preserving `undefined` when no provider round reports it.
- [ ] Make the hook's usage semantics explicit in the public type/docs and changelog.

## Out of scope

- Audit entries, billing records, or budgeting consumers.
- Usage from anything other than provider calls made by the orchestrator.
- The `stop` chunk's existing usage shape.