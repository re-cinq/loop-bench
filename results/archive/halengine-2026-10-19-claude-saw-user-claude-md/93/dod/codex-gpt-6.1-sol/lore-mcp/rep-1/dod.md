# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider, a real tool registry, and an observing hook. Keep one summed usage argument; a per-round breakdown adds surface that turn accounting does not require.

## Done when these pass

- [ ] **reports the sum of every provider call once per turn, preserving missing usage and direct answers** — Two tool rounds count all three provider calls; missing first, middle, or last usage preserves the reported sum, all-missing stays undefined, and direct answers retain their usage. The hook fires exactly once.
      `src/orchestration/chatOrchestrator-usage.acceptance.test.ts`

## Facets

- [x] Accumulate each reported provider usage across the turn without mutating provider values or carrying totals into another turn.
- [x] Preserve absent usage and direct-answer behaviour; leave the existing `receives collected response text and usage` test unedited.
- [ ] Make the public hook signature explicitly identify turn-total usage with no `any`.
- [ ] Keep the spec's summed-usage contract, bump the MINOR version, and add a consumer-facing CHANGELOG entry explaining the larger totals for tool-heavy turns.
- [ ] Pass the repository's build, tests, typecheck, ESLint with zero warnings, and Prettier gates in CI.

## Out of scope

- Per-round breakdowns, consumer billing or audit records, accounting outside orchestrator provider calls, stop-chunk usage changes, and the unrelated non-Error rejection behaviour recorded in the spec.