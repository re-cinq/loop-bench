# Definition of Done

> A turn driven through two tool rounds reports usage covering every provider call in that turn, asserted against a scripted provider whose rounds report known, different token counts

**Strategy: `direct`** — `createChatOrchestrator` already accepts a provider, a real tool registry, and the public hook, so the complete turn can be exercised through its real entry point.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds** — distinct usage from all three provider calls is added field by field.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **sums the rounds that report usage and reports nothing when none do** — missing round usage neither erases reported rounds nor creates a numeric value when every round omits usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported provider-call usage into turn totals without changing a direct turn's value.
- [ ] Give the hook's public usage type a name that unambiguously describes turn-wide totals, with no `any`.
- [ ] Replace the spec's under-counting statement with the summed behavior and document the consumer-visible change in the changelog.
- [ ] Keep the existing direct-turn usage test unedited and green.

## Out of scope

- Audit or billing persistence, non-provider token accounting, and changes to providers' stop-chunk usage shape.