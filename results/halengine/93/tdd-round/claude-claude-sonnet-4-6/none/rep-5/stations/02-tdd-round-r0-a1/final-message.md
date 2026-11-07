All the work is complete. The DoD has all 4 facets checked, the implementation is in place, the acceptance tests exist, and the branch is already pushed and up to date with origin.

The `accumulateUsage` function correctly:
- Returns `accumulated` when `round` is undefined (skips missing rounds)
- Returns `round` when `accumulated` is undefined (first reported round)
- Sums all three token fields otherwise

This satisfies both acceptance test cases. No work remains for this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}