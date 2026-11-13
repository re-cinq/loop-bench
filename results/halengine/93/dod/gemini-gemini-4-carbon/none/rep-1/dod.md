# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` and invokes `afterModelResponse` at the end of `processMessageStream`, so acceptance tests can drive multi-round tool turns through `processMessage` with a scripted `AIProvider` and observe the reported usage directly.

## Done when these pass

- [ ] **sums usage across every provider call in a multi-round tool turn** — drives two tool rounds (three provider calls with distinct `inputTokens`, `outputTokens`, and `totalTokens`) through `processMessage` and asserts `afterModelResponse` receives `{inputTokens: 75, outputTokens: 20, totalTokens: 95}`; fails today because only the final call's `{inputTokens: 40, outputTokens: 9, totalTokens: 49}` is passed.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **sums the rounds that report usage when some omit it, or undefined when none do** — drives a multi-round turn where two rounds report usage and two (including the final round) omit it, plus a multi-round turn where no round reports usage, asserting `{inputTokens: 42, outputTokens: 13, totalTokens: 55}` and `undefined` respectively; fails today because `lastUsage` overwrites the earlier round's usage with the later reported round (`{inputTokens: 30, outputTokens: 8, totalTokens: 38}`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every provider round in `src/orchestration/chatOrchestrator.ts` that reports `usage`, leaving the turn total `undefined` when no round reported usage.
- [ ] Keep the single-round (no tool calls) behaviour unchanged so the unedited `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` stays green.
- [ ] Decide between the ticket's two signature shapes (summed usage argument vs summed total plus per-round breakdown), make the hook's parameter/type name unambiguous that the value is turn-summed usage (re-exported from `src/index.ts` if a new public type is introduced, with no `any`), and record why the other shape was rejected.
- [ ] Expand `specs/hal-engine-config-hooks/spec.md` if the chosen signature adds surface beyond the summed `usage` argument, and run `npm run docs:fix` if `OrchestratorHooks` in `src/orchestration/chatOrchestrator.ts` changes (synced into `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`).
- [ ] Add a `CHANGELOG.md` entry (and MINOR version bump if applicable) stating how what an existing `afterModelResponse` consumer records changes on multi-round tool turns.

## Out of scope

- Audit entries, billing records, or `UsageStore` persistence (consumer concerns outside the orchestrator hook).
- Token accounting for anything other than the provider calls `chatOrchestrator` makes.
- Changing how providers populate the `stop` chunk's per-round `usage` field.
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.