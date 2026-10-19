# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The `createChatOrchestrator` factory provides a seam to test the hook at runtime. I chose to pass a `TurnUsage` shape (a `UsageMetadata` that includes a `rounds` array) so the type unambiguously communicates it is a sum, meeting the requirement without changing the parameter count or breaking existing consumers reading the total.

## Done when these pass

- [ ] **reports usage covering every provider call in a turn with multiple tool rounds** — asserts the reported usage matches the sum of all rounds, and that a breakdown of rounds is included.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **keeps counting rounds that reported usage even if some rounds report none** — asserts the sum does not become NaN when some providers omit usage.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **reports undefined if no rounds reported usage at all** — asserts that a turn where nothing reported still reports nothing.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing test pinning that a turn with no tools reports exactly what it reports today.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Define the `TurnUsage` shape extending `UsageMetadata` in `src/types/ai.ts` or `src/orchestration/chatOrchestrator.ts`.
- [x] Update `chatOrchestrator.ts` to accumulate usages and pass the sum with the rounds breakdown.
- [x] Update `specs/hal-engine-config-hooks/spec.md` with the new behaviour.
- [x] Add a minor bump changelog entry stating the change.

## Out of scope

- The audit entry or billing record itself
- Token accounting for anything other than provider calls
- The `stop` chunk's own `usage` shape