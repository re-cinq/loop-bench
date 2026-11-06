Branch is pushed and up to date. The round delivered:

- **Red**: Added 4 `addUsage` unit tests to `orchestratorHelpers.test.ts` — failed because `addUsage` didn't exist.
- **Green**: Added `addUsage(acc, next)` to `orchestratorHelpers.ts`; updated `chatOrchestrator.ts` to replace `lastUsage = outcome.usage ?? lastUsage` with `totalUsage = addUsage(totalUsage, outcome.usage)`.
- **Refactor**: Renamed `lastUsage` → `totalUsage` for clarity; no structural changes needed.
- Updated CHANGELOG under `### Changed` with the behavior-change description and migration note.
- Ticked all 4 DoD facets.

Unrelated smell noticed: `extractUsage` in `orchestratorHelpers.ts` could be inlined into `streamRound` since it's only called there — left untouched per the no-unrelated-smells rule.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum usage across all tool rounds (addUsage helper + orchestrator accumulation + CHANGELOG + all facets)","tdd_next":"acceptance green"}}