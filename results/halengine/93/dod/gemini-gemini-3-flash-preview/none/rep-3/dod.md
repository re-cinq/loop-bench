# Definition of Done

> `afterModelResponse` ... assigned `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. ... A deployer billing or budgeting from this hook under-counts exactly the expensive turns.

**Strategy: `direct`** — The `afterModelResponse` hook in `OrchestratorHooks` already exists as the entry point for this behavior. The acceptance tests will verify that usage from all provider rounds is accumulated and that a per-round breakdown is also provided, ensuring the signature is unambiguous and faithful to all provider calls in a turn.

## Done when these pass

- [ ] **aggregates usage from multiple tool rounds into a single total** — The total tokens reported by the hook must be the sum of tokens across all provider rounds in the turn.
      `src/orchestration/usage-aggregation.acceptance.test.ts`

- [ ] **provides a per-round breakdown of usage for tool-heavy turns** — The hook must also receive a list containing the usage metadata for every provider round that reported it.
      `src/orchestration/usage-aggregation.acceptance.test.ts`

- [ ] **handles rounds with missing usage by excluding them from the total** — Rounds that do not report usage must not affect the sum of those that do, and must be excluded from the breakdown.
      `src/orchestration/usage-aggregation.acceptance.test.ts`

- [ ] **reports correct usage for turns with no tools** — A turn with only one provider call reports exactly what it did before, pinning the common path.
      `src/orchestration/usage-reporting.acceptance.test.ts`

## Facets

- [ ] Decide on the signature: `afterModelResponse(session, text, totalUsage?, rounds?)`.
- [ ] Accumulate usage in `chatOrchestrator.ts` loop instead of overwriting.
- [ ] Pass both the total and the rounds breakdown to the hook call site.
- [ ] Update `OrchestratorHooks` type in `src/orchestration/chatOrchestrator.ts` and `src/types/ai.ts` (if duplicated there).
- [ ] Update `specs/hal-engine-config-hooks/spec.md` with the new behavior and links to the new tests.
- [ ] Add a CHANGELOG entry for the behavior change.

## Out of scope

- Token accounting for anything other than the provider calls made by the orchestrator.
- The `stop` chunk's own `usage` shape.