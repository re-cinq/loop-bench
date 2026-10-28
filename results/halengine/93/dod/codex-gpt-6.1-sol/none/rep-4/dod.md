# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider and real tool registry, and exposes the installed `afterModelResponse` hook. One acceptance test drives complete turns and observes the hook's totals without replacing engine behaviour.

## Done when these pass

- [ ] **reports whole-turn usage across two tool rounds, preserving missing usage and the direct-answer path** — sums all three known provider reports; covers missing first, middle and last reports, entirely absent usage, and unchanged direct answers, with exactly one hook invocation per turn.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported provider usage exactly once across the real round loop; retain undefined when no call reports usage.
- [ ] Keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Keep one summed usage argument; make its whole-turn semantics explicit in the public signature without any `any`. The spec records why the wider breakdown alternative was rejected.
- [ ] Fulfil the updated config-hooks spec, add a consumer-facing changelog line about larger recorded tool-turn totals, and bump the MINOR version.
- [ ] Run the repository's required build, test, typecheck, ESLint and Prettier checks in CI.

## Out of scope

- Billing or audit record storage, accounting beyond orchestrator provider calls, and changes to streamed stop chunks' usage.
- Per-round usage breakdowns and the unrelated non-Error rejection semantics recorded in the same spec.