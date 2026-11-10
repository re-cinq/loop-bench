# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` is already callable today and invokes the installed `afterModelResponse` hook at the end of `processMessageStream` / `processMessage`. Acceptance tests can drive multi-round tool turns through `processMessage` and observe that `afterModelResponse` receives only the final round's `UsageMetadata` instead of the accumulated usage across all rounds.

## Done when these pass

- [ ] **sums usage across every provider call when a turn runs two tool rounds** — in a turn with two tool rounds and a final synthesis round where all three provider calls report usage, `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens` across all three calls (`750`, `105`, `855`). Fails today because `lastUsage` overwrites each round and reports only round 3 (`400`, `50`, `450`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **sums the rounds that reported usage when another round in the turn reports none, and reports undefined when no round reports usage** — in a three-round turn where rounds 1 and 3 report usage and round 2 omits `usage`, `afterModelResponse` receives the sum of rounds 1 and 3 (`200`, `40`, `240`) with no `NaN` or `undefined` fields, and in a turn where no round reports usage it receives `undefined`. Fails today because round 3 overwrites `lastUsage` in the partial turn and reports only round 3 (`120`, `25`, `145`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` (`inputTokens`, `outputTokens`, `totalTokens`) across every provider call in `src/orchestration/chatOrchestrator.ts` (or a helper in `src/orchestration/orchestratorHelpers.ts`), keeping `undefined` when no round reports usage and omitting no numeric field (`NaN` / `undefined`) when a subset of rounds reports usage.
- [ ] Update `specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-architecture/spec.md`, and `docs/getting-started.md` / `README.md` if hook usage semantics are described there, and add a `CHANGELOG.md` entry under `[Unreleased]`.
- [ ] Run `node scripts/repoint-spec-anchors.mjs` if any edits shift line numbers in cited files.

## Out of scope

- Automatically wiring `UsageStore.record` inside the orchestrator (remains consumer-wired via hooks).
- Adding a new per-round hook or changing the `afterModelResponse` call signature.
- Adding new fields to `UsageMetadata` (`cacheReadInputTokens`, `cacheWriteInputTokens`, latency, cost).