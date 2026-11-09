# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider`, a real `ToolRegistry`, and lifecycle hooks. Exercise its real `processMessage` entry point with the ticket's scripted provider emitting known stop-chunk usage; no module mocks or stubbed orchestration are needed.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — one hook invocation includes each token field from both tool rounds and the final answer, with both tools actually executed.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and preserves absent and single-call usage** — omitted usage at the start, middle, or end preserves all reported counts; entirely absent usage stays undefined, zero stays zero, and the direct-answer path is unchanged.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate per-turn usage across every provider call, preserving undefined when no round reports; make both acceptance tests green.
- [ ] Keep `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green in CI.
- [ ] Make the public hook signature explicitly identify turn-total usage without introducing `any`; retain the single usage argument as decided in the spec.
- [ ] Add a MINOR version bump and CHANGELOG entry explaining the larger counts existing tool-turn consumers will record; retain the new spec contract and its rejection of the wider breakdown API.
- [ ] Have CI pass the required build, tests, typecheck, ESLint, and formatting gates.

## Out of scope

- Audit/billing storage, accounting outside orchestrator provider calls, and changes to provider stop-chunk usage shapes.
- Per-round breakdown API and the spec's unrelated non-Error rejection behaviour.
- Source-text assertions for signature names, changelog prose, or version bumps; those are review facets, not behavioural acceptance tests.
- Lore descriptor tooling changes: the existing list adapter emits only id/name/file, with no spec field support. Tests carry `@spec` anchors and the spec carries named validation links.