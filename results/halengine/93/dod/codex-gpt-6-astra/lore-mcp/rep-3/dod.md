# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` accepts a scripted provider and a real tool registry, and exposes usage through the installed hook. Choose the summed argument with the existing object shape; a breakdown unnecessarily widens the surface for the stated billing and budget use case.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — a single hook invocation reports all three token-field sums after two actual tool executions.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **sums reported rounds around missing usage and leaves wholly unreported turns undefined** — absent first, middle or final usage preserves all known counts; all-absent turns report nothing and no-tool values remain unchanged.
      `src/orchestration/usage.acceptance.test.ts`

## Facets

- [ ] Accumulate usage within each user turn, summing each reported field and preserving undefined when nothing reports.
- [ ] Make the public hook signature explicitly identify turn-total usage without introducing any; preserve the existing no-tool test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited.
- [ ] Keep the linked spec contract and decision accurate; record the larger tool-turn totals for existing consumers in CHANGELOG and bump the MINOR version.
- [ ] Pass the repository CI checks, including the unchanged no-tool test. The current Lore list adapter emits only id/name/file, so exposing the stamped @spec anchors in descriptor.spec requires tooling support; do not change production code for that here.

## Out of scope

- Billing or audit persistence, non-orchestrator token accounting, and provider stop-chunk usage shapes.
- Per-round breakdown APIs and the unrelated non-Error rejection behavior recorded in the spec.