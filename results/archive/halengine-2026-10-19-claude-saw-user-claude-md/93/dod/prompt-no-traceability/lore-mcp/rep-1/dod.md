# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The `afterModelResponse` hook is an existing seam, and tests can directly observe the reported usage totals for scripted provider rounds.

## Done when these pass

- [ ] **A turn driven through two tool rounds reports usage covering every provider call in that turn** — validates that usage across multiple rounds is accumulated into the final total.
      `src/orchestration/chatOrchestrator-usage.acceptance.test.ts`
- [ ] **A provider that reports no usage on some rounds does not make the total undefined or NaN** — validates robust addition where rounds with absent usage are correctly skipped.
      `src/orchestration/chatOrchestrator-usage.acceptance.test.ts`
- [ ] **a turn where nothing reported still reports nothing** — pins existing behaviour that a turn completely missing usage metadata gracefully reports undefined.
      `src/orchestration/chatOrchestrator-usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — pins that a turn with no tool calls reports exactly what it reports today.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Introduce a `TurnUsageTotals` type alias for `UsageMetadata` (or an interface extending it) so the `afterModelResponse` signature explicitly labels its argument as an aggregate
- [x] Accumulate usage values in `chatOrchestrator.ts` on each iteration of `processMessageStream` instead of overwriting `lastUsage`
- [x] Change the `afterModelResponse` signature to use the new unambiguous type
- [x] Update `specs/hal-engine-config-hooks/spec.md` to document the new behavior instead of the under-counting warning
- [x] Add CHANGELOG entry for the behavior change

## Out of scope

- the audit entry or billing record itself, which is a consumer's concern
- token accounting for anything other than the provider calls the orchestrator makes
- the `stop` chunk's own `usage` shape