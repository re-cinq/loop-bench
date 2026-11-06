# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and a real `ToolRegistry` already drives a multi-round turn into `afterModelResponse`; the tests observe the `usage` argument there. Both shapes the ticket weighs keep that third argument a `UsageMetadata` (the existing no-tool test pins it unedited), so the tests pin it as the turn's sum; a per-round breakdown, if chosen, is additive.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn driven through two tool rounds** — three provider calls reporting 100/20, 300/40, 500/60 tokens reach the hook as 900/120/1020, not the last round's 500/60/560
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when others did not, and reports nothing when none did** — a silent middle round is skipped (600/80/680), and an all-silent turn reports `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Existing tests that must stay green unedited: `afterModelResponse › receives collected response text and usage` (no-tool turn reports exactly what it does today) and `keeps the usage an earlier round reported when a later round reports none`, both in `src/orchestration/chatOrchestrator.test.ts`.

## Facets

- [ ] Accumulate `outcome.usage` across rounds in `chatOrchestrator.ts` instead of `lastUsage = outcome.usage ?? lastUsage`, leaving `undefined` when no round reported
- [ ] Make the hook's type say it is a turn total (e.g. a named `TurnUsage`/renamed parameter plus one-line JSDoc, or a per-round breakdown argument), and regenerate the CLAUDE.md hooks block from the declaration
- [ ] Record in the issue/PR why the other shape was rejected
- [ ] Delete the under-counting bullet under "Measured semantics — out of scope" in `specs/hal-engine-config-hooks/spec.md`
- [ ] CHANGELOG entry stating that an existing consumer now records larger usage for tool-heavy turns (MINOR bump)

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the orchestrator's provider calls
- The `stop` chunk's own `usage` shape