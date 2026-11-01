# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` accepts a provider and real tool registry, and exposes the resulting usage through `afterModelResponse`. Use the ticket's explicitly requested scripted provider with distinct real token counts; no orchestrator or tool execution is mocked.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — one hook report sums all three token fields from both tool rounds and the final provider response.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **sums reported rounds around missing usage and leaves wholly unreported turns undefined** — omitted first, middle, or last usage preserves the sum; a later wholly unreported turn remains undefined.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Sum usage locally within each turn and pass the total once after the loop; make the public argument/type unambiguously a turn total without public `any`.
- [ ] Ignore missing usage without introducing undefined/NaN totals, preserve undefined for a wholly unreported turn, and reset accounting between turns.
- [ ] Keep the existing no-tool test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green in CI.
- [ ] Implement the spec's single summed argument decision; retain the documented rejection of a wider per-round breakdown surface.
- [ ] Add a MINOR version bump and CHANGELOG entry explaining the increased usage existing hook consumers record for tool turns; complete CI checks.

## Out of scope

- Audit/billing storage, accounting outside orchestrator provider calls, and changes to provider stop chunk usage.
- The independently recorded non-Error rejection behaviour in the hooks spec.
- Per-round breakdown API; the existing argument shape is retained for consumer compatibility.
- Descriptor infrastructure: `.lore/test-commands.yml` uses a list script emitting only id/name/file, with no spec field support. Tests carry spec anchor comments and the spec carries named validation links; adding descriptor support requires a separate tooling change.