# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `afterModelResponse` hook at the boundary where round usage is available. The acceptance tests drive that entry point through a real tool registry and a scripted provider.

## Done when these pass

- [ ] **reports the sum from every provider call in a two-tool-round turn** — `afterModelResponse` receives one `UsageMetadata` total covering all provider calls, including calls separated by a round with no usage.
  `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`
- [ ] **ignores rounds without usage and reports undefined when no round reports usage** — missing usage does not produce `undefined` or `NaN`, while an all-missing turn remains `undefined`.
  `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool hook test remains unedited and continues to pin the common path's current usage.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Aggregate each reported provider-call usage value without changing the no-tool result.
- [ ] Keep the hook's public type explicit about the aggregate `UsageMetadata` value and its `undefined` all-missing case.
- [ ] Replace the spec's under-counting note with the aggregate behavior and document the consumer-visible change in the changelog.

## Out of scope

- Audit entries, billing records, and other consumer behavior.
- Accounting for anything other than provider calls made by the orchestrator.
- Changing the provider `stop` chunk's usage shape.