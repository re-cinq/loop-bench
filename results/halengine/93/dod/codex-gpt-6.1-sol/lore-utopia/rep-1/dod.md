# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and real tool registry, so a scripted provider can drive two tool rounds through the actual loop. Choose the single summed usage argument: it preserves the callback shape and fixes billing totals; a per-round breakdown adds public surface without being necessary for this report.

## Done when these pass

- [ ] **reports the sum of every provider call once per turn, ignoring absent usage without inventing usage** — checks all token fields across three calls, gaps at every position, entirely absent usage, one callback per turn and unchanged direct-answer usage; spec anchor `specs/hal-engine-config-hooks/spec.md#9`.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum each reported round's input, output and total tokens; leave entirely absent usage undefined.
- [ ] Keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited.
- [ ] Make the public hook signature unambiguously describe summed turn usage, with no public `any`.
- [ ] Retain the updated spec semantics and citation; document the consumer-visible increase in CHANGELOG and apply a MINOR version bump.
- [ ] Pass CI build, tests, typecheck, eslint and formatting checks.

## Out of scope

- Consumer billing/audit storage, non-provider accounting, per-round stop chunk shape and non-Error rejection handling.
- Public per-round breakdown; the summed argument is the chosen contract.