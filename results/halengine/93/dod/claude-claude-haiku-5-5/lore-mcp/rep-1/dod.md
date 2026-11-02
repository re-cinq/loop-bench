# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam exists. `createChatOrchestrator` takes a real `AIProvider` and an `afterModelResponse` hook, and a scripted provider can report known per-round usage without any mock framework.

## Done when these pass

- [ ] **reports the sum of usage over every provider call in a turn that ran two tool rounds** — three scripted provider calls report 14, 26 and 38 total tokens; the hook must receive their sum (60 / 18 / 78), not the last round's (30 / 8 / 38)
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when an intermediate round reports none, and reports nothing when none reported** — a silent middle round is skipped, not allowed to make the total `undefined` or `NaN`; a turn where no round reported still passes `undefined`
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate `outcome.usage` across rounds in `chatOrchestrator.ts` in place of `lastUsage = outcome.usage ?? lastUsage`, keeping `undefined` when no round reported
- [ ] Make the hook's usage type say it is a turn total (`UsageMetadata` in `src/types/ai.ts`, `OrchestratorHooks.afterModelResponse`), or add a per-round argument if that shape is chosen
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` with the new behaviour and link the tests above
- [ ] CHANGELOG entry stating the change in what an existing consumer records (MINOR bump)

## Out of scope

- The audit entry or billing record itself; that is the consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape; this ticket only aggregates it
- The `onError` `instanceof Error` gate, recorded as the other measured-semantics line in the same spec section
- Coverage floors in `jest.config.js` and the CI job `Verify` (`.github/workflows/ci.yml`), step "Test (with coverage floor)", which runs `npm run test:coverage` on every push