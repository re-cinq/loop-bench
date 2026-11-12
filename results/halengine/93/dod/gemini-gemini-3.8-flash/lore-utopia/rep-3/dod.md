# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The orchestrator exposes the lifecycle hook seam via `OrchestratorHooks.afterModelResponse` in `createChatOrchestrator`; acceptance tests invoke `processMessage` against scripted provider rounds with known token counts and assert on the usage passed to the hook.

## Done when these pass

- [ ] **reports the sum of three provider calls when a turn runs two tool rounds** — asserts that a turn driving two tool rounds aggregates inputTokens, outputTokens, and totalTokens across all three provider calls into the usage reported to afterModelResponse.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — asserts that provider rounds omitting usage do not corrupt the accumulated total into undefined or NaN, while a turn where no provider call reported usage reports undefined.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` across rounds in `chatOrchestrator.ts` rather than overwriting with `outcome.usage ?? lastUsage`.
- [ ] Handle rounds where `outcome.usage` is undefined so reported token counts sum cleanly without producing `NaN`, and keep total `undefined` if no round reported.
- [ ] Clarify the `afterModelResponse` hook type signature in `src/orchestration/chatOrchestrator.ts` so the accumulated sum is unambiguous to callers.
- [ ] Add a CHANGELOG entry documenting the usage accumulation across tool rounds for existing consumers.

## Out of scope

- Consumer-side audit entries or billing records.
- Token accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's own `usage` shape populated by providers.