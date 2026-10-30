# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The orchestrator already accepts an `AIProvider`, a real tool registry, and lifecycle hooks, so acceptance tests can drive multiple provider rounds through `processMessage` and observe the usage delivered to `afterModelResponse`.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds** — A turn with two executed tool rounds reports the field-wise sum from all three provider calls.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`
- [ ] **counts reported rounds when some omit usage and reports nothing when all omit it** — Missing per-round usage neither erases reported rounds nor manufactures a total when no provider reports usage.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Replace last-round retention with field-wise accumulation of every reported provider usage value.
- [ ] Make the public hook type unambiguously describe turn-total usage without using `any`.
- [ ] Preserve the existing single-provider-call behavior and its unedited test.
- [ ] Document the consumer-visible change in the changelog.

## Out of scope

- Audit or billing storage, token accounting outside orchestrator provider calls, and changes to providers' stop-chunk usage shape.