The fix is pushed. The round brief's CI failure was a stale spec anchor — the test "runs onError and afterSession when beforeSession throws" moved from line 40 to line 35, but the citation in `specs/hal-engine-config-hooks/spec.md` still pointed at `#L40`. Running `spec:names --fix` corrected it to `#L35`.

All DoD facets were already checked. This round fixed the one remaining CI failure (spec-names check).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec anchor citation L40→L35","tdd_next":"acceptance green"}}