The branch is up to date. The only work this round did was fix the CI failure: the spec anchor link in `specs/hal-engine-config-hooks/spec.md` pointed to `#L40` but the test "runs onError and afterSession when beforeSession throws" is at line 32 in the acceptance test file. Updated to `#L32`.

No regressions caused (0 regressions). No smells noticed beyond what was in scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec-names CI failure: repoint acceptance test anchor from #L40 to #L32","tdd_next":"acceptance green"}}