Branch is pushed and up to date. 

**What was done:**
- Added `accumulateUsage(acc, round)` to `orchestratorHelpers.ts` — sums token fields when both are present, returns whichever is defined when only one is, returns `undefined` when neither is.
- Updated `chatOrchestrator.ts` to use `accumulateUsage(totalUsage, outcome.usage)` instead of the last-round-wins `outcome.usage ?? lastUsage` pattern.
- Added 4 unit tests for `accumulateUsage` covering all branches (both defined, only acc, only round, neither).
- Ticked Facets 1 and 2 in `.lore/dod.md`.

**Unrelated smell noticed:** The `extractUsage` import in `chatOrchestrator.ts` is now unused (all usage extraction is handled through `accumulateUsage` via `outcome.usage`). Not acting on it per rules — naming it here.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulateUsage replacing lastUsage retention","tdd_next":"update hooks spec and CHANGELOG with aggregate-usage behavior"}}