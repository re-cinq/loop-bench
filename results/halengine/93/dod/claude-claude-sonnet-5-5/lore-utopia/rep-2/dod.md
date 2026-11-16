# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is a real seam today. The tests pin the accumulate-and-sum shape (one `usage` argument, summed), the simpler option the ticket offers; the rejected per-round breakdown shape must be recorded in the issue/CHANGELOG.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn with two tool rounds** — three rounds with different token counts; the hook receives their sum.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when others reported none, never NaN or undefined** — a round without usage is skipped, the others still summed.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Sum usage across rounds in chatOrchestrator.ts, skipping rounds with none; undefined when none reported.
- [ ] Document the type on `afterModelResponse` (TSDoc says it is a turn total); keep existing no-tool tests unedited and green.
- [ ] CHANGELOG entry and MINOR bump stating consumers will record larger numbers for tool turns.

## Out of scope

- The audit/billing record itself, token accounting beyond the orchestrator's provider calls, the `stop` chunk's `usage` shape.
- Not testable as behaviour: the type-clarity criterion and CHANGELOG wording (review judges them).