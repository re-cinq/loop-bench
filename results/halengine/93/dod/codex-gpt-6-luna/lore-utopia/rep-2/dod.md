# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider, tool registry, and lifecycle hook, so scripted provider rounds can observe the hook's actual reported usage.

## Done when these pass

- [ ] **reports usage from every provider call and ignores rounds with no usage** — the hook receives accumulated usage across two tool rounds and the final provider call, missing-usage rounds do not corrupt the total, all-missing usage remains undefined, and a turn without tools retains its current usage.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Pin usage accumulation through two tool rounds with distinct scripted provider counts.
- [ ] Pin behavior when one or all provider rounds omit usage, and when a turn makes no tool calls.
- [ ] Make the hook's usage type unambiguously describe the total reported for the turn.
- [ ] Replace the spec's under-counting description with the chosen behavior and explain the consumer-visible change in the changelog.

## Out of scope

- Audit or billing records implemented by consumers.
- Token accounting beyond provider calls made by the orchestrator.
- Aggregating usage on the `stop` chunk itself.