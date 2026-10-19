Branch is up to date. The round is complete:

- **RED**: Added `addUsage` to the test import — failed because the function didn't exist
- **GREEN**: Implemented `addUsage(acc, next)` in `orchestratorHelpers.ts`; wired into `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = addUsage(lastUsage, outcome.usage)`
- **Refactor**: Updated `specs/hal-engine-config-hooks/spec.md` (replaced the under-counting note with the new summing behavior), added `CHANGELOG.md` entry under `[Unreleased] > Changed`, ticked all three facets in `.lore/dod.md`

No regressions caused (0 tests mine that failed; 0 pre-existing tests broken). Unrelated smells noticed but not touched: the `ToolRegistry` import in `orchestratorHelpers.ts` was already present before this round — it appears to have been there from the file's original form.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"addUsage helper and usage accumulation across tool rounds","tdd_next":"acceptance green"}}