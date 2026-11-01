# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — Call `createChatOrchestrator(...).processMessage` with the ticket's scripted provider and a real `ToolRegistry`, observing the installed hook. Keep one summed usage argument; the existing no-tool test remains unedited.

## Done when these pass

- [ ] **reports the sum of every provider call after two tool rounds** — Three distinct provider usages become one total after two actual tool executions.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds across missing usage and preserves an entirely unreported turn** — Missing first, middle, or final usage cannot erase counted rounds; all-missing remains undefined.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum all three numeric usage fields locally per turn and invoke the hook once; preserve the existing no-tool test `receives collected response text and usage` unedited.
- [ ] Ignore missing usage at every position, leaving an entirely unreported turn undefined.
- [ ] Make the public hook signature unambiguously describe total usage, retaining the existing numeric shape and no public `any`.
- [ ] Record the sum-versus-breakdown decision on #93, add the consumer-facing CHANGELOG entry and MINOR version bump, and reconcile documentation with the implemented contract.
- [ ] Let CI validate build, typecheck, lint, formatting and the existing suite; only the new acceptance file runs in this pod.

## Out of scope

- Audit/billing storage, usage outside orchestrator provider calls, and changing provider stop-chunk usage.
- The spec's unrelated non-Error rejection behavior.
- Extending Lore's test discovery script: it currently emits only id/name/file, with no spec-field support. Test comments stamp the spec anchors and the spec has named validation links; descriptor enrichment requires separate tooling work.