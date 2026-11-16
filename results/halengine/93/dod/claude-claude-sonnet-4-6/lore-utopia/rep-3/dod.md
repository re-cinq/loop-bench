# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `afterModelResponse` is a live seam; the acceptance test drives `processMessage` through the real orchestrator with a scripted provider whose two rounds emit known, different token counts, and asserts the hook receives the sum.

## Done when these pass

- [ ] **afterModelResponse receives summed usage across all tool rounds, not only the last round** — `afterModelResponse` is passed the accumulated usage across every provider call in the turn, not only the last round's value; asserted with a two-round turn where each round reports distinct known token counts and the hook must receive the total.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` to accumulate across rounds (sum `inputTokens`, `outputTokens`, `totalTokens`; skip rounds where `outcome.usage` is undefined so a turn where nothing reported still reports `undefined`).
- [ ] Update the `afterModelResponse` signature or its `usage` argument type so the name or shape makes it unambiguous that the value is a turn total, not a single-round value (ticket AC4).
- [ ] Replace the under-counting note in `specs/hal-engine-config-hooks/spec.md` with the new behaviour statement — done in the DoD commit; the validated-by link will resolve once the test goes green.
- [ ] Add a CHANGELOG entry under `[Unreleased] > Changed` noting that `afterModelResponse` now receives summed usage; existing consumers will see larger numbers on tool-heavy turns (MINOR bump).
- [ ] Confirm `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint --max-warnings 0`, and `npm run prettier:check` all pass.

## Out of scope

- The audit entry or billing record itself — a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape — providers already populate it.
- The `catch` gates `onError` on `error instanceof Error` behaviour — still out of scope, unchanged.