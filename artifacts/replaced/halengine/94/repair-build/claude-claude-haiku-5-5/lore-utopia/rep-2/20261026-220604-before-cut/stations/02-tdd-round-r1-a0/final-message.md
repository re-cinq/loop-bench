Fixed the CI failure: the spec anchor in `specs/hal-engine-config-hooks/spec.md` for the test "runs onError and afterSession when beforeSession throws" pointed at `#L40` but the `it(...)` call is at line 35. Updated the link to `#L35` and pushed.

All three DoD facets were already ticked; this round's only work was repairing the broken spec-names check. 0 regressions introduced, 0 new red tests written (mechanical repair, no new test needed).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec anchor #L40 → #L35 for acceptance test link","tdd_next":"acceptance green"}}