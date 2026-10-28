# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage` drives a scripted provider through the real tool registry and observes `afterModelResponse`. Keep one summed usage argument; expose its turn-total meaning in the public type rather than expanding the hook with a per-call breakdown.

## Done when these pass

- [ ] **reports the sum of every provider call once per turn, preserving missing usage and the direct-answer path** — three distinct provider counts across two tool rounds are summed; missing first, middle or last usage is ignored; all-missing stays undefined; zero and direct-answer usage stay intact; one hook invocation per turn.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Sum reported input, output and total tokens across every provider call, retaining undefined only when nothing reported.
- [ ] Keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited and passing in CI.
- [ ] Give the hook's usage parameter an explicit public turn-total type with no `any`, retaining the existing token fields and optionality.
- [ ] Implement the new spec semantics; retain the recorded decision to reject a per-round breakdown.
- [ ] Add the consumer-facing changelog line explaining larger recorded totals on tool-heavy turns and apply the MINOR version bump.
- [ ] Pass the repository's required build, test, typecheck, ESLint and Prettier CI checks.

## Out of scope

- Consumer billing or audit storage, accounting outside orchestrator provider calls, and changes to streamed stop-chunk usage.
- The separately recorded non-Error rejection behaviour and a new per-round breakdown API.