# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — Call `createChatOrchestrator().processMessage` with the ticket's scripted provider and a real `ToolRegistry`, recording the public hook argument. Keep one summed usage argument: billing consumers need the turn total; a per-call breakdown would widen the API without being needed to fix the reported under-count.

## Done when these pass

- [ ] **reports turn totals across two tool rounds while preserving missing-usage and direct-answer semantics** — All three provider calls contribute; missing first, middle or final usage cannot erase other rounds; wholly unreported turns remain undefined; subsequent direct turns do not inherit earlier usage. The hook fires exactly once per turn.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum inputTokens, outputTokens and totalTokens across provider calls within each turn; preserve undefined when no call reports usage and reset accounting for each turn.
- [ ] Preserve the existing unedited no-tool test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Make the public hook signature unambiguous about summed turn usage (for example a named TurnUsage type and totalUsage parameter), without any in the public API.
- [ ] Retain the new spec semantics and citation; add a consumer-facing CHANGELOG entry explaining that existing hook consumers now record larger totals on tool-heavy turns, and make the MINOR version bump required by the ticket.
- [ ] Pass CI's build, tests, typecheck, eslint and prettier checks.

## Out of scope

- Per-provider-call breakdowns, billing or audit storage, non-provider token accounting, and changes to streamed stop-chunk usage.
- The separately recorded non-Error rejection behaviour of onError.