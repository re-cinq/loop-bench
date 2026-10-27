# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `afterModelResponse` hook and accepts a real provider and tool registry, so scripted provider rounds can observe the missing aggregate directly.

## Done when these pass

- [ ] **reports usage summed across every provider round in a two-tool-round turn** — the hook receives the sum of input, output, and total tokens from all provider calls in the turn.
      `src/orchestration/usageReporting.acceptance.test.ts`

- [ ] **counts reported rounds when another round is silent and reports undefined when all rounds are silent** — missing usage is ignored without producing `undefined` or `NaN`, while a turn with no reported usage remains unreported.
      `src/orchestration/usageReporting.acceptance.test.ts`

- [ ] **receives collected response text and usage** — the existing no-tool test remains unedited, preserving the current single-provider-call behavior.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate usage across provider rounds while retaining `undefined` when no round reports usage.
- [ ] Make the public hook signature and documentation unambiguous that the usage is a turn total.
- [ ] Update the spec and changelog, including the minor consumer-visible usage change.
- [ ] Keep the existing no-tool usage behavior unchanged.

## Out of scope

- Audit records, billing records, and other consumer behavior.
- Accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's existing usage shape.