# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The `createChatOrchestrator` factory provides a seam to run the full round loop against a scripted provider, verifying what reaches the installed hook.

## Done when these pass

- [ ] **A turn driven through two tool rounds reports usage covering every provider call in that turn** — validates that the hook receives a summed usage object including a `providerCalls` breakdown.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **A provider that reports no usage on some rounds does not make the total undefined or NaN** — validates that missing round usages are correctly omitted from sums and breakdown.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **A turn where nothing reported still reports nothing** — validates that a turn without any usage reported still yields `undefined`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Define a new interface extending `UsageMetadata` with an optional `providerCalls` array.
- [x] Accumulate token usage dynamically inside `chatOrchestrator.ts` loop.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new behavior.
- [x] Add a CHANGELOG entry for the change in what an existing consumer will record.
- [x] Fix acceptance test: remove vitest import, fix PromptBuilder config, deduplicate via shared scriptedProvider and runTurn helper, add spec citations for all new tests.

## Out of scope

- The audit entry or billing record itself
- Token accounting for anything other than provider calls
- The `stop` chunk's own `usage` shape