# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage` exposes the real round loop and installed hook. The ticket explicitly requests a scripted provider: the test supplies known protocol chunks and executes arithmetic through the real ToolRegistry, with no mocked engine components.

## Done when these pass

- [ ] **reports turn usage across every provider call, preserving absent usage and direct answers** — one hook invocation sums three distinct provider usages, ignores missing rounds, preserves wholly absent usage and direct answers.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Sum all reported input, output and total token counts for each turn; keep absence when no provider reports usage.
- [ ] Keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Give the hook's summed usage a public type that identifies turn totals, with no public API `any`; keep the single usage argument as selected in the spec.
- [ ] Match the updated spec contract and record why the per-round breakdown was rejected.
- [ ] Add the consumer-facing changelog entry and MINOR version bump for larger tool-turn totals.
- [ ] Pass the repository CI checks, including build, typecheck, eslint and formatting.

## Out of scope

- Billing or audit storage, non-provider accounting, changes to stop-chunk usage, and unrelated onError handling.
- Per-round breakdown API; the selected contract preserves the single summed usage argument.