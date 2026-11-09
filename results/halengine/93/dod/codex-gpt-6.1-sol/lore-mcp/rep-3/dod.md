# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and real tool registry, and exposes the reported usage through `afterModelResponse`. One scripted-provider acceptance test exercises the real loop and observes its hook across complete, partially reported, unreported and direct turns.

## Done when these pass

- [ ] **reports total usage across every provider call and preserves missing-usage and direct-turn semantics** — two tool rounds plus the answer count all three provider calls; missing reports do not erase totals, all-missing stays undefined, and direct turns stay unchanged.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum all three usage fields across provider calls without changing provider stop chunks or mutating provider usage values.
- [ ] Preserve undefined when no round reports usage and retain the existing no-tool test unedited (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`).
- [ ] Make the public hook signature explicitly identify turn-total usage without any `any`; keep the single summed argument, as decided in the spec.
- [ ] Add the MINOR version bump and consumer changelog entry explaining that tool turns now record usage from all calls; verify the updated spec describes the implementation.
- [ ] Pass the repository CI checks for build, tests, types, lint and formatting.

## Out of scope

- Per-round breakdown, billing records, budgets, non-provider accounting and changes to stop-chunk usage.
- The spec's unrelated non-Error rejection semantics.