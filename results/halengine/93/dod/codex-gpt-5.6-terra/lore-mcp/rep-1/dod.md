# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted `AIProvider`, real `ToolRegistry`, and `afterModelResponse` hook, so the acceptance test can exercise the complete round loop without a replacement boundary.

## Done when these pass

- [ ] **reports the total from every reporting provider call in tool turns and nothing when none report** — two real tool rounds accumulate their reported token counts while an omitted round is ignored, and a no-usage turn remains `undefined`.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate each round's `UsageMetadata` before invoking `afterModelResponse`, preserving `undefined` only when no round supplied usage.
- [ ] Make the hook's public signature/documentation state that its `usage` value is the per-turn sum, rather than the final provider call.
- [ ] Add the MINOR-version changelog entry explaining that existing hook consumers record higher usage for tool-heavy turns.

## Out of scope

- Per-provider-call usage breakdowns, consumer audit or billing records, and changes to the `stop` chunk's usage shape.