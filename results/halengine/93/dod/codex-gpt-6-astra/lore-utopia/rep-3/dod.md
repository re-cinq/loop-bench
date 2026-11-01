# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — Call the real createChatOrchestrator/processMessage entry point with the ticket's scripted provider and a real ToolRegistry. Sum the existing usage argument; a breakdown adds unnecessary public surface for the billing use case.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — One hook report includes every input/output/total token count after two executed tool rounds.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **counts reported rounds despite missing usage and preserves wholly absent usage** — Missing first, middle, or last usage does not discard other rounds; no reports remains undefined and zero remains zero.
      `src/orchestration/usage.acceptance.test.ts`

## Facets

- [ ] Accumulate all three token fields locally per turn and deliver the sum once after the loop.
- [ ] Preserve undefined when no round reports and retain totals across missing rounds.
- [ ] Make summed semantics explicit in the public hook type without any; preserve the existing no-tool test `receives collected response text and usage` unedited in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Ship a MINOR version bump and CHANGELOG entry explaining larger recorded usage for tool turns; retain the summed-argument decision and rejected breakdown rationale in the spec.
- [ ] Let CI run the full required build, tests, typecheck, eslint and formatting gates.

## Out of scope

- Audit/billing persistence, accounting outside orchestrator provider calls, and changing provider stop-chunk usage.
- The spec's unrelated non-Error rejection behavior remains unchanged.
- Source-text tests for signatures or release prose; review the type and release metadata alongside CI. The current Lore list adapter emits only id/name/file, so spec stamps are included in test comments and statement links without changing production tooling.