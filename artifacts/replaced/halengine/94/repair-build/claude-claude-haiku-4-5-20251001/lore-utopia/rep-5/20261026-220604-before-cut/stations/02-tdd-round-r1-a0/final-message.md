The fix was a spec anchor line number correction. The previous round inserted tests inside a `describe()` wrapper, which shifted the `it(` calls from #L36→#L35 and #L53→#L51. The `spec-names` CI check caught the mismatch. I updated the two `#Lnn` anchors in `specs/hal-engine-config-hooks/spec.md` to match the actual test positions, committed, and pushed.

All three facets were already ticked in `.lore/dod.md`; this round fixed the only remaining CI failure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec anchor line numbers repointed to match actual test positions","tdd_next":"acceptance green"}}