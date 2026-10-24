Perfect! I've completed the round of fixing the spec links and documentation. Here's what was done:

## Summary of changes

1. **Fixed spec-link line numbers** by running the reanchor script to update all spec anchors across:
   - `specs/hal-engine-architecture/spec.md` 
   - `specs/hal-engine-config-hooks/spec.md`
   - `specs/hal-engine-tool-responses/spec.md`

2. **Corrected spec anchor mismatches** using `npm run spec:names -- --fix` to align line numbers with current test positions

3. **Added test citation** for the new "accumulates usage across multiple provider rounds with tools" test (L276) to validate the aggregate usage behavior

4. **Updated .lore/dod.md** to mark the final facet complete - all spec documentation and CHANGELOG entries are now in place with correct links

The code implementation from the previous round remains intact:
- `UsageMetadata` aggregates usage across all provider calls in a turn
- `afterModelResponse` hook receives summed usage (not just the last round)
- CHANGELOG documents the behavior change and migration notes for existing consumers

All previously failing CI checks (eslint spec-link and spec-names failures) are now resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"acceptance green"}}