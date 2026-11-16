Branch is clean and pushed. The round is complete:

- **Facet closed**: Added `accumulateUsage` to `orchestratorHelpers.ts` and wired it into `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage` with summing across all rounds. Renamed `lastUsage` → `accumulatedUsage`. Updated `specs/hal-engine-architecture/spec.md` with the new behavior statement, updated the stale `#L150` → `#L151` link in `specs/hal-engine-config-hooks/spec.md`, added CHANGELOG entry, ticked all four facets in `.lore/dod.md`.
- **Regressions**: 0 — the existing `'keeps the usage an earlier round reported when a later round reports none'` test still passes because `accumulateUsage(x, undefined) === x`.
- **Unrelated smells noticed**: none worth flagging.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum usage across all provider rounds in a turn via accumulateUsage","tdd_next":"acceptance green"}}