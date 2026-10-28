# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and real tool registry, and `processMessage` exposes the completed turn to the installed hook. A scripted provider implements the actual streaming protocol with known usage values; no framework mocks are needed.

## Done when these pass

- [ ] **reports the sum of every provider call once per turn, counting only rounds with usage** — two tool rounds plus the answer are summed, missing first/middle/last usage is ignored, all-missing stays absent, and no-tool values remain unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Sum every reported provider usage in a turn; preserve undefined when none reported and call the hook once.
- [ ] Keep the existing “receives collected response text and usage” test unedited and green in CI.
- [ ] Make the public hook signature explicitly identify summed turn usage, without any public API `any`; keep the single argument (the spec records why a breakdown was rejected).
- [ ] Add a consumer-facing CHANGELOG entry explaining larger recorded usage for tool turns and a MINOR version bump.
- [ ] Run CI’s build, tests, typecheck, zero-warning ESLint and formatting gates; confirm the updated usage spec matches implementation.

## Out of scope

- Audit/billing storage, non-provider token accounting, stop-chunk usage changes, per-round breakdown, and the unrelated non-Error rejection behaviour recorded in the hook spec.