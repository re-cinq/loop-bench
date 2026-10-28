# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and real tool registry, so a scripted provider drives the actual round loop and hook. Keep a single summed usage argument; a breakdown adds public surface beyond the turn total consumers need.

## Done when these pass

- [ ] **reports the sum of every provider call once per turn, counting only rounds that report usage** — two tool executions and three provider calls contribute all three token fields; missing first, middle, or final usage is ignored, all missing remains undefined, and direct answers retain their usage.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum every reported provider usage without mutating provider values; preserve undefined when no call reports usage.
- [ ] Keep afterModelResponse once per turn and preserve the unedited existing test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Name the public hook argument `totalUsage` so the signature communicates the summed meaning without adding any to the API.
- [ ] Add a consumer-facing CHANGELOG entry explaining larger recorded usage for tool turns, and bump the MINOR version; the spec records why a breakdown was rejected.
- [ ] Pass the acceptance test and CI's existing build, test, typecheck, eslint, and formatting gates.

## Out of scope

- Audit and billing storage, usage outside orchestrator provider calls, per-round breakdowns, and changes to streamed stop usage.
- The spec's unrelated non-Error rejection behaviour remains unchanged.