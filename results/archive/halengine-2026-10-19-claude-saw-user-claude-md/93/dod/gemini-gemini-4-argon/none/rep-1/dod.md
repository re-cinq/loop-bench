# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts `hooks.afterModelResponse` and calls it at the end of `processMessageStream` / `processMessage`. Acceptance tests can drive `processMessage` with a scripted `AIProvider` and a registered tool across multiple tool rounds, and observe the `usage` passed to `afterModelResponse`.

## Done when these pass

- [ ] **sums usage across every provider call when a turn runs two tool rounds** — a turn driven through two tool rounds (three provider calls) with known, distinct token counts passes `afterModelResponse` the sum of `inputTokens`, `outputTokens`, and `totalTokens` across all three provider calls rather than only the final round's usage.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **sums the rounds that reported usage when another round in the turn omits it, and reports undefined when no round reported** — when a provider reports usage on some rounds and omits it on others, the rounds that reported are summed without producing `undefined` or `NaN`, and a turn where no round reported usage still passes `undefined` to `afterModelResponse`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Accumulate `UsageMetadata` (`inputTokens`, `outputTokens`, `totalTokens`) across every provider call in `processMessageStream` in `src/orchestration/chatOrchestrator.ts` so `afterModelResponse` receives the summed turn total (or `undefined` when no round reported usage), while keeping a single-round turn and the existing tests (`receives collected response text and usage`, `keeps the usage an earlier round reported when a later round reports none`) green without editing those existing tests.
- [x] Make the type/documentation of `afterModelResponse` in `src/orchestration/chatOrchestrator.ts` (and synced doc-blocks such as `specs/hal-engine-architecture/spec.md` via `npm run docs:fix`) unambiguous about receiving summed turn usage across all provider calls in the turn, and record in the PR/spec why accumulating into `UsageMetadata` was chosen over a separate breakdown parameter.
- [x] Update `specs/hal-engine-config-hooks/spec.md` and add a `CHANGELOG.md` entry under `## [Unreleased]` stating the behaviour change in what an existing consumer's `afterModelResponse` hook will record on multi-round tool turns, plus any version bump if required.

## Out of scope

- The audit entry or billing record itself (consumer's concern).
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape emitted by providers during streaming.