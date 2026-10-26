# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` takes a provider and hooks, and `processMessage` drives the real round loop, so the hook's third argument can be observed through the public entry point with a scripted provider. Nothing needs to be built first.

## Done when these pass

- [ ] **reports the summed usage of every provider call when a turn runs two tool rounds** — a scripted provider reports 100/300/500 input tokens across three provider calls; the hook must receive 900 input, 120 output, 1020 total, not the final call's 500/60/560.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **leaves a round that reports no usage out of the total, and reports nothing when no round does** — a silent middle round must not zero or NaN the total, so the hook receives the sum of the rounds that reported (30 input, 15 output, 45 total); a turn where no round reports still delivers `undefined`.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [x] Decide the shape. Recommended: keep one `usage` argument carrying the sum of every provider call in the turn (the first option in the ticket). The tests pin the sum in the third argument, so an implementation that also passes a per-round breakdown as a fourth argument keeps them green.
- [x] Sum usage across rounds in `chatOrchestrator.ts`, skipping rounds that report none; a turn where no round reports still passes `undefined`.
- [x] Make the hook's type say what the value is (`UsageMetadata` in `src/types/ai.ts` and the `OrchestratorHooks.afterModelResponse` declaration), with no `any` in the public API.
- [x] A turn with no tool calls reports exactly what it reports today; the existing test `afterModelResponse receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` stays unedited and green.
- [x] Replace the under-counting bullet in `specs/hal-engine-config-hooks/spec.md` with the new behaviour, and state the change for existing consumers in the `CHANGELOG.md` entry (a MINOR bump).

## Out of scope

- The audit entry or billing record itself; that is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape; providers already populate it and this ticket only aggregates it.
- Spec and changelog wording. Those are facets for the implementing round, not tests.
- The spec's `Status` row. It is not edited here.