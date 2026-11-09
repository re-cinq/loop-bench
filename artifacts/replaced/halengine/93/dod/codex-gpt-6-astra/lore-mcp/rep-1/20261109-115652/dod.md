# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider` and real `ToolRegistry`; the ticket explicitly calls for a scripted provider with known counts. The acceptance fixture feeds chunks through that public entry point, executes arithmetic tools, and observes the hook without mocking the orchestrator or registry.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — one hook report sums all three token fields across three provider calls, with two tool results actually consumed.
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **sums reported rounds across missing usage and preserves absence when none report** — missing first, middle, or final usage does not lose reported counts; all-absent usage stays undefined and reported zero remains zero.
      `src/orchestration/turnUsage.acceptance.test.ts`

## Facets

- [ ] Sum each provider round's reported token fields within the turn, keeping one hook call after the loop.
- [ ] Ignore missing usage without losing previous totals, preserve undefined when no round reports, and preserve zero counts.
- [ ] Keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited and passing.
- [ ] Make the public hook signature unambiguously name total turn usage without introducing `any`; retain one usage argument, since a breakdown widens the surface unnecessarily for billing and budgeting.
- [ ] Deliver a MINOR version bump and CHANGELOG entry explaining the larger totals existing consumers will record; keep the revised hook spec accurate.
- [ ] Pass the repository's build, test, typecheck, eslint, and formatting CI gates.

## Out of scope

- Billing records, audit storage, non-provider token accounting, and changes to streamed stop-chunk usage.
- Non-Error rejection handling, the other unlinked measured behavior in the hook spec; #93 does not change it.
- A per-round usage breakdown or a new hook invocation per provider call.