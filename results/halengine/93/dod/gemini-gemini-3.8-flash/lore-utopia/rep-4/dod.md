# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam already exists on `createChatOrchestrator({hooks: {afterModelResponse}})`. Acceptance tests drive multi-round turns through the real `processMessage` entry point using a scripted provider and verify the usage reported to `afterModelResponse`.

## Done when these pass

- [ ] **reports the sum of three provider calls when a turn runs two tool rounds** — A turn driven through two tool rounds reports usage covering every provider call in that turn, asserted against a scripted provider whose rounds report known, different token counts.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — A provider that reports no usage on some rounds does not make the total undefined or NaN: the rounds that reported are still counted, and a turn where nothing reported still reports nothing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Red: the new acceptance tests assert multi-round token summing and sparse round handling; today they fail because `chatOrchestrator.ts` overwrites `lastUsage` with the final round's usage alone.
- [ ] Green: in `chatOrchestrator.ts`, accumulate `UsageMetadata` across rounds into a running sum and pass the accumulated usage to `afterModelResponse`.
- [ ] Green: ensure rounds with no usage do not corrupt the accumulator with NaN or undefined, and a turn with zero reported usage still passes undefined.
- [ ] Refactor: existing single-round test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` remains green and unedited.
- [ ] Doc: update `CHANGELOG.md` under `[Unreleased]` with a MINOR note explaining that `afterModelResponse` now receives the turn's total usage summed across all rounds instead of the last round alone.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate.