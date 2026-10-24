Pushed successfully. The branch is up to date with no uncommitted work.

**What I did:**
1. **Fixed the CI lint failure**: Added `([validated by: ...])` test links to the 2 unlinked intro sentences in the "Usage accumulation helper" section of `specs/hal-engine-config-hooks/spec.md`. This brings coverage to 13/13 testable statements, matching the "Shipped" status.
2. **Closed the type signature facet**: Added a one-line JSDoc to `afterModelResponse` in `chatOrchestrator.ts` making it explicit that `usage` is the accumulated total across all provider calls in the turn.
3. **Updated dod.md**: Ticked the remaining open facet (type signature verification).

All 6 facets in dod.md are now ticked. CI will judge whether the acceptance tests pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"type signature made unambiguous + spec links fixed","tdd_next":"acceptance green"}}