# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider, real tool registry, and lifecycle hooks. A scripted provider supplies the ticket's known usage counts while the real round loop and tool executors run; the chosen contract sums the existing usage argument.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — one hook invocation reports all three token totals after two executed tool rounds.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and preserves absent and single-call usage** — missing first, middle, or final usage cannot erase other rounds; entirely absent usage stays undefined, and direct responses retain their counts.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum each reported provider call inside the turn, without mutating provider usage records; keep one hook call after the loop.
- [ ] Ignore missing records, preserve undefined when none reported, and preserve single-call and zero usage.
- [ ] Make the public hook signature explicitly identify total turn usage, without any; retain the existing `receives collected response text and usage` test unedited.
- [ ] Carry the spec's sum-only decision and rejection of a breakdown into the issue/release notes; add a MINOR version bump and changelog explaining larger recorded totals for tool-heavy turns.
- [ ] Pass CI's build, tests, typecheck, ESLint, and formatting checks.

## Out of scope

- Audit or billing persistence, accounting outside orchestrator provider calls, and changes to provider stop-chunk usage.
- The spec's separate non-Error rejection behavior and a per-round breakdown API.
- Lore descriptor tooling changes: this repository's list command emits only id/name/file, not a spec field; test comments stamp the statement anchors and the spec links name both tests.