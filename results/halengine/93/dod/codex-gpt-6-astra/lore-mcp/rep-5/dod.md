# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already accepts a provider and real tool registry, so a scripted provider can drive two tool rounds and the final answer through the real loop. Keep the single usage argument as a turn total; a per-call breakdown adds surface without a stated consumer need.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds once per turn** — sums all three provider calls, emits one hook report, and resets accounting for the next direct-answer turn.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and leaves wholly unreported turns undefined** — covers missing first, middle and last reports, entirely absent usage, explicit zero counts, and isolation between turns.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate all three token fields per turn and pass the total once to the hook; leave provider stop chunks unchanged.
- [ ] Ignore absent reports without losing earlier counts; preserve undefined for wholly unreported turns and preserve explicit zeros.
- [ ] Make the hook signature unambiguous by naming its optional argument `totalUsage`, without `any`; retain the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited and green in CI.
- [ ] Implement the updated config-hooks spec, record the sum-versus-breakdown decision in the issue, add the consumer-facing CHANGELOG entry, and bump the MINOR version.
- [ ] Let CI prove build, tests, typecheck, ESLint and Prettier gates; this pod runs only the new acceptance file.

## Out of scope

- Audit or billing persistence, accounting outside orchestrator provider calls, provider stop-chunk usage changes, and non-Error rejection handling.
- A per-round usage API; the chosen contract retains one summed usage argument.
- Test-list tooling changes: this repository's `scripts/lore-list-tests.mjs` emits only id/name/file and has no spec descriptor support. Tests carry `@spec` stamps and statement-side links; surfacing those stamps as a descriptor field requires a separate tooling change.