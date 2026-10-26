# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the real `afterModelResponse` hook and accepts a real provider and tool registry, so the acceptance test drives the round loop directly.

## Done when these pass

- [ ] **reports the sum of every reported provider call across tool rounds and remains undefined when none report** — the hook receives the aggregate across all provider calls, ignores missing round usage, and preserves `undefined` when no call reports usage.
      `src/orchestration/usageReporting.acceptance.test.ts`

## Facets

- [ ] Aggregate distinct usage values from every provider call in a multi-round tool turn.
- [ ] Preserve the existing no-tool result, pinned by the unedited `stops after one round when nothing asked for a tool` test in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Keep missing usage rounds out of the aggregate without producing `undefined` or `NaN`.
- [ ] Make the public hook type describe the aggregate clearly, and document the consumer-visible change in the changelog.
- [ ] Replace the old under-counting statement in `specs/hal-engine-config-hooks/spec.md` with the aggregate behavior.

## Out of scope

- Audit or billing records, non-provider token accounting, and the `stop` chunk usage shape.