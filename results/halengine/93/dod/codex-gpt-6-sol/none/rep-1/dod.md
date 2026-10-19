# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a provider, tool registry, and `afterModelResponse` hook. The acceptance test drives two real tool executions and three scripted provider calls through `processMessage`.

## Done when these pass

- [x] **reports the sum of every provider call, ignoring rounds without usage** — The hook receives input, output, and total token sums across all reported rounds, skips an unreported middle round, and receives `undefined` when no round reports usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [x] Accumulate each provider call's reported token counts across the whole turn, leaving usage `undefined` only when no call reports it.
- [x] Keep the existing no-tool usage behavior pinned by `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`, without editing that test.
- [x] Make the `afterModelResponse` argument's total-turn meaning explicit in the public signature, without `any`.
- [x] Replace the recorded under-counting behavior in the config-hooks spec with the target behavior and link the acceptance test.
- [x] Add a changelog entry explaining the larger value existing consumers will receive.
- [x] Keep one summed `usage` argument in the public hook: it preserves the hook's shape for the common billing case. Reject the wider per-round breakdown because no consumer granularity requirement is stated; account for the behavior change with a MINOR version bump.
- [x] Pass the repository's build, test, typecheck, ESLint, and Prettier gates in CI.

## Out of scope

- Consumer audit or billing records, token accounting beyond orchestrator provider calls, and changes to provider `stop` chunks.